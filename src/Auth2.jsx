import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
//const supabase = createClient('https://brdpcvomwqyfbjsxakmj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZHBjdm9td3F5ZmJqc3hha21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MzI4NjMsImV4cCI6MjAzNjIwODg2M30.MCS828htPOybQgmVG30ttceLu9SxYjcLFL6u2Va2EYY')

import { useLocalStorage } from "./hooks/useLocalStorage";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
//import './Auth2.css'
export default function Auth2() {
    const [session, setSession] = useLocalStorage("session", null);
    //const [session, setSession] = useState(null)

    const navigate = useNavigate();

    
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }