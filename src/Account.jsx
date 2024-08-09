import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './Avatar'
import WeatherApp from './buttons/ButtonGetLocation'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
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
    <form onSubmit={updateProfile} className="form-widget">
      <div className="bg-base-100 ">
  <figure className="px-10 pt-10">

  <Avatar
  className="rounded-xl"
        url={avatar_url}
        size={150}
        onUpload={(event, url) => {
          updateProfile(event, url)
        }}
      />
      
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">
      <input type="text" className="input input-bordered w-full max-w-xs" value="Jane Doe" />
    </h2>

    <div className="form-control">
      <label className="label" htmlFor="email">
        <span className="label-text">Email</span>
      </label> 
      <input className="text" id="email" type="text" value={session.user.email} disabled />

    </div>
      

    <div className="form-control">
      <label className="label">
        <span className="label-text">Bio</span>
      </label> 
      <textarea className="textarea textarea-bordered h-24" placeholder="Write your bio here"></textarea>
    </div>
    <div className="card-actions">
      <button className="btn btn-primary">Save Changes</button>
    </div>
  </div>
</div>

      
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
        <WeatherApp/>
      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </form>
  )
}