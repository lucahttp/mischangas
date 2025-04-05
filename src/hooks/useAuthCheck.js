import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export const useAuthCheck = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Show login modal
      document.getElementById('login_required_modal').showModal();
      return false;
    }
    return true;
  };

  return checkAuth;
};