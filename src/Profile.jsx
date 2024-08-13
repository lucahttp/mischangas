import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import Auth2 from './Auth2'
import Account from './Account'
//import './.old/index.css'
//import './.old/app.css'
import { Link } from 'react-router-dom';

function Profile() {
  const [session, setSession] = useState(null)
  //const [user, setUser] = useState(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session, user }, error }) => {
      setSession(session)
      //setUser(user)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
      {!session || session.user["is_anonymous"] ?
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
          {/**
             * if logged in
             *       show menu with profile, jobs, bids & ongoing
             * else
             *       show to login
             *       
            <p>{JSON.stringify(session)}</p>
            <p>anon {JSON.stringify(session.user)}</p>
            <p>anon {JSON.stringify(session.user["is_anonymous"])}</p>
             */}


          <Link to="/"><button className="btn">Go Home</button></Link>
          <Auth2 />
        </div>
        :
        <div>
          <Account key={session.user.id} session={session} /></div>}

    </>

  )
}

export default Profile