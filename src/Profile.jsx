import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import Auth2 from './Auth2'
import Account from './Account'
//import './.old/index.css'
//import './.old/app.css'
import { Link } from 'react-router-dom';

function Profile() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (

    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      
      {/**
       * if logged in
       *       show menu with profile, jobs, bids & ongoing
       * else
       *       show to login
       *       
       */}
      <Link to="/"><button className="btn">Go Home</button></Link>

      {!session ? 
      <Auth2 /> : 
      <div>
      <Account key={session.user.id} session={session} /></div>}
    </div>
  )
}

export default Profile