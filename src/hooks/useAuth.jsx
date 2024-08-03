// src/hooks/useAuth.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'
import { ToastContainer, toast } from 'react-toastify';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error  } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
        setIsLoading(false);
        return;
      }

      setUser(user);
      //setIsAnonymous(user.is_anonymous || false);
      setIsLoading(false);


      if (!user) {
        createAnonymousUser();
        console.log("Bienvenido Anon")
        console.log(user.id)
        toast.info('¡Bienvenido! ¿Quieres crear una cuenta para guardar tus preferencias?', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,   

        });
      }
      else if (user.is_anonymous){
        console.log("Bienvenido usuario no authenticado")
        console.log(user.id)
      }
      else{
        console.log("Bienvenido usuario authenticado")
        console.log(user.id)
      }
    };

    const userChangeListener = (event, session) => {
      setUser(session?.user);
    };

    supabase.auth.onAuthStateChange(userChangeListener);

    checkUser();

    return () => {
      // Remove the listener manually
      //supabase.auth.offAuthStateChange(userChangeListener);
    };
  }, []);

  const createAnonymousUser = async () => {
    const { data: { user }, error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error('Error creating anonymous user:', error);
      return;
    }
    setUser(user);
    // ...
  };

  return { user };
}
