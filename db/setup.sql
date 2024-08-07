-- Create a table for public profiles
create table
  profiles (
    id uuid references auth.users not null primary key,
    updated_at timestamp with time zone,
    username text unique,
    full_name text,
    avatar_url text,
    website text,
    constraint username_length check (char_length(username) >= 3)
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/database/postgres/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy "Users can insert their own profile." on profiles for insert
with
  check (
    (select auth.uid()) = id 
    and 
    (select (auth.jwt()->>'is_anonymous')::boolean) is false);

create policy "Users can update own profile." on profiles
for update
  using (
    (
      select
        auth.uid ()
    ) = id
  );

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user () returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();

-- Set up Storage!
insert into
  storage.buckets (id, name)
values
  ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects for
select
  using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects for insert
with
  check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
for update
  using (
    (
      select
        auth.uid ()
    ) = owner
  )
with
  check (bucket_id = 'avatars');

-- made by my own
-- https://supabase.com/docs/guides/getting-started/tutorials/with-react#set-up-the-database-schema
-- Create a table for offers
create table
  offers (
    id uuid not null primary key,
    offer_owner_id uuid references auth.users not null,
    updated_at timestamp with time zone,
    created_at timestamp with time zone,
    offer_title text,
    offer_description text,
    offer_price text,
    offer_measure text,
    offer_enabled boolean,
    constraint offertitle_length check (char_length(offer_title) >= 3)
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/database/postgres/row-level-security for more details.
alter table offers enable row level security;

create policy "Offers are viewable by everyone." on offers for
select
  using (true);

create policy "Users can insert their own offers." on offers for insert
with
  check (
    (
      select
        auth.uid ()
    ) = offer_owner_id
  );

create policy "Users can update own offers." on offers
for update
  using (
    (
      select
        auth.uid ()
    ) = offer_owner_id
  );

--------------------------
-- Create a table for offer_images
create table
  offer_images (
    id uuid not null primary key,
    offer_owner_id uuid references auth.users not null,
    offer_id uuid references public.offers not null,
    updated_at timestamp with time zone,
    created_at timestamp with time zone,
    offer_image_url text,
    offer_image_position int
  );

alter table offer_images enable row level security;

create policy "Offer Images are viewable by everyone." on offer_images for
select
  using (true);

create policy "Users can insert their own Offer Images." on offer_images for insert
with
  check (
    (
      select
        auth.uid ()
    ) = offer_owner_id
  );

create policy "Users can update own Offer Images." on offer_images
for update
  using (
    (
      select
        auth.uid ()
    ) = offer_owner_id
  );

-- Set up Storage for offers iamges!
insert into
  storage.buckets (id, name)
values
  ('offer_images', 'offer_images');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
create policy "Offer images are publicly accessible." on storage.objects for
select
  using (bucket_id = 'offer_images');

create policy "Anyone can upload an Offer image." on storage.objects for insert
with
  check (bucket_id = 'offer_images');

create policy "Anyone can update their own Offer images." on storage.objects
for update
  using (
    (
      select
        auth.uid ()
    ) = owner
  )
with
  check (bucket_id = 'offer_images');
