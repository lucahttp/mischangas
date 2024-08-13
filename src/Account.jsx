import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './Avatar'
import LocationButton from './buttons/LocationButton'
import { Link } from "react-router-dom";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [shortLocation, setShortLocation] = useState(null)
  const [location, setLocation] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url,location`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          console.log(data)
          setUsername(data.username)
          setShortLocation(data.location.shortLocation)
          setLocation(data.location.location)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(event, avatarUrl) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const updates = {
      id: user.id,
      username,
      website,
      location: {
        shortLocation: shortLocation,
        location: location,
      },
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <>
    
    <div className="navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(0, 0, 0, 1)"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </Link>
          </button>
        </div>
      </div>
      
      
    <form onSubmit={updateProfile} className="form-widget">

<br />
<br />



<div className='join  flex items-center gap-10'>

<Avatar
className="rounded-xl"
  url={avatar_url}
  size={150}
  onUpload={(event, url) => {
    updateProfile(event, url)
  }}
/>

{/**
*         <div className="join-item avatar indicator">
    <span className="indicator-item badge badge-secondary">Edit</span>
    <div className="h-20 w-20 rounded-lg">
      <img
        alt="Tailwind CSS examples"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
*/}

{/**
 * 
  <div className="join-item rating rating-lg rating-half">
    <input type="radio" name="rating-10" className="rating-hidden" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" disabled />
    <input
      type="radio"
      name="rating-10"
      className="mask mask-star-2 mask-half-1 bg-green-500"
      defaultChecked disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" disabled />
    <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" disabled />
  </div>
 */}
</div>

{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:2525471344. */}
<br />
<br />

<div className="join-vertical">

{/**
  <div className="join w-full">
    <div className="w-4/5">
      <label className="join-item input input-bordered flex items-center gap-2">

        <input type="text" className="grow " value={session.user.email} disabled />
      </label>
    </div>
    <div className="indicator">
      <span className="indicator-item badge badge-secondary">!</span>
      <button className="btn btn-primary join-item">Set Location</button>
    </div>
  </div>

*/}
  <LocationButton 
  savedLocation={shortLocation}
  onGet={(location, shortLocation) => {
    console.log("parent loc",location)
    console.log("parent sloc",shortLocation)
    setLocation(location)
    setShortLocation(shortLocation)
  }} />
  {/**
* 
  <div className="join w-full">
    <div className="w-4/5 ">
      <label className="join-item flex items-center gap-2 ">
        <input type="text" className="grow bg-gray-200 border border-gray-300 rounded px-2.5 py-2.5 cursor-not-allowed" value={session.user.email} disabled />
      </label>
    </div>
    <div className="indicator">
      <span className="indicator-item badge badge-secondary">new</span>
      <button className="btn join-item">Search</button>
    </div>
  </div>
*/}



  <br />


  <label className="input input-bordered flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70">
      <path
        d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
      <path
        d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
    </svg>
    <input type="text" className="grow" value={session.user.email} disabled />
  </label>

  <br />

  <label className="input input-bordered flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="h-4 w-4 opacity-70">
      <path
        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
    </svg>
    <input type="text" className="grow" placeholder="Username" 
      value={username || ''}
      onChange={(e) => setUsername(e.target.value)} />
  </label>
  <br />

  <label className="input input-bordered flex items-center gap-2">


    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 opacity-70">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3 13-8 2 2-8 8-2-2 8z"></path><circle cx="12" cy="12" r="2"></circle></svg>
    <input className="grow"
      type="url"
      value={website || ''}
      placeholder="Website ej: IG,FB,ML,etc" 
      onChange={(e) => setWebsite(e.target.value)} />
  </label>

  <br />


<div className='join  flex items-center gap-10'>
<button className="btn btn-primary" type="submit" disabled={loading}>

{loading ? 'Loading ...' : <><svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor">
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>Update</>}
</button>


<button className="btn btn-error" onClick={() => supabase.auth.signOut()}>Sign Out</button>


</div>

</div>




{/**
 * <br />



<div>
  <label htmlFor="email">Email</label>
  <input id="email" type="text" value={session.user.email} disabled />
</div>
<div>
  <label htmlFor="username">Name</label>
  <input
    id="username"
    type="text"
    required
    value={username || ''}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
<div>
  <label htmlFor="website">Website</label>
  <input
    id="website"
    type="url"
    value={website || ''}
    onChange={(e) => setWebsite(e.target.value)}
  />
</div>

<div>
  <button className="button block primary" type="submit" disabled={loading}>
    {loading ? 'Loading ...' : 'Update'}
  </button>
</div>
<LocationButton />
 */}

{/*
<br />

<div>
  <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
    Sign Out
  </button>
</div>
*/}

</form>
      
      </>
  )
}