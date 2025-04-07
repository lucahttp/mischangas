import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient'
import Imagen from './reciclables/Imagen'
import { data } from 'autoprefixer';

import JobOfferList from './JobOfferList.jsx';
import SelectableMenu from './SelectableMenu.jsx';
import ChatMain from './ChatMain.jsx';

function formatToARS(number, currencySymbol = '$') {
  const formatted = number.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    currencyDisplay: 'symbol',
    currencySymbol
  });
  return formatted.replace(/\s/g, ''); // Remove all spaces
}


function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

 
  const [currentSelection, setCurrentSelection] = useState("paraVos");

  const handleMenuItemSelected = (selectedItemName) => {
/*     if (selectedItemName ===  'ofrecer') {
      window.location.href = "/new";
      return;      
    } */
    setCurrentSelection(selectedItemName);
    console.log(`User selected: ${selectedItemName}`);
    // Perform other actions based on the selection, e.g.,
    // - Fetch data based on the selected category
    // - Update other parts of the UI
  };



  const getOffers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('offers').select(`
      id, 
      offer_title,
      offer_price,
      offer_images ( id, offer_image_url )
    `)
      console.log(data)
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  if (isLoading) {
    return <div>Cargando ando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">MisChangas</a>
        </div>
        <div className="flex-none">
          <Link to="/account">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(0, 0, 0, 1)"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
              </svg>
            </button>
          </Link>
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="rgba(0, 0, 0, 1)"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8z"></path>
            </svg>
          </button>
        </div>
      </div>

      <SelectableMenu onItemSelected={handleMenuItemSelected} />
      {currentSelection && <p>Currently selected: {currentSelection}</p>}
      <br />
      { currentSelection === "paraVos" && <JobOfferList/>}
      { currentSelection === "mensajes" && <ChatMain/>}
      { currentSelection === "favoritos" && <h1>Favoritos</h1>}
      
    </div>
  );
}

export default App;