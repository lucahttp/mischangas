import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient'
import Imagen from './reciclables/Imagen'
import { data } from 'autoprefixer';
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
function JobPostDummy() {


  let divs = [];
  for (let i = 0; i < 10; i++) {
    //divs.push(<div key={i}>{i}</div>);
    divs.push(
      <Link key={i} to="/offer">
        {/* https://reactrouter.com/en/main/components/link 
        <div
          className="card card-compact card-bordered bg-base-100 w-50 shadow-sm border-yellow-600"
        >
        */}

        <div
          className="card card-compact card-bordered bg-base-100 w-50 shadow-sm border-gray-200"
        >
          <figure>
            <img
              src="https://brdpcvomwqyfbjsxakmj.supabase.co/storage/v1/object/public/test/jnq0xu9jing61.jpeg"
              alt="Shoes"
              className='object-cover'
            />
          </figure>
          <div className="card-body">
            <h2>{i}Armado de placard</h2>
            {/**
             *             <p>If a dog chews shoes whose shoes does he choose?</p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
             */}
          </div>
        </div>
      </Link>
    );
  }
  return <div className="grid grid-cols-2 md:grid-cols-6">{divs}</div>;
}
function JobPost() {


  let divs = [];
  for (let i = 0; i < data.length; i++) {
    //divs.push(<div key={i}>{i}</div>);
    divs.push(
      <Link key={i} to="/offer">
        {/* https://reactrouter.com/en/main/components/link 
        <div
          className="card card-compact card-bordered bg-base-100 w-50 shadow-sm border-yellow-600"
        >
        */}

        <div
          className="card card-compact card-bordered bg-base-100 w-50 shadow-sm border-gray-200"
        >
          <figure>
            <img
              src="https://brdpcvomwqyfbjsxakmj.supabase.co/storage/v1/object/public/test/jnq0xu9jing61.jpeg"
              alt="Shoes"
              className='object-cover'
            />
          </figure>
          <div className="card-body">
            <h2>{i}Armado de placard</h2>
            {/**
             *             <p>If a dog chews shoes whose shoes does he choose?</p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
             */}
          </div>
        </div>
      </Link>
    );
  }
  return <div className="grid grid-cols-2 md:grid-cols-6">{divs}</div>;
}
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);



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

  /*
    async function getOffers() {
      const { data, error } = await supabase.from('offers').select(`
    id, 
    offer_title,
    offer_price,
    offer_images ( id, offer_image_url )
  `)
  console.log(data)
    }*/
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
      <div>
        <ul className="menu menu-sm bg-base-200 rounded-box w-100 menu-horizontal">
          <li>
            <Link to="/new">
              <p>
                Ofrecer
                {/**
              <span className="badge badge-sm badge-success">$</span>
               */}
              </p>
            </Link>
          </li>

          <li className="disabled">
            <p>|</p>
          </li>

          <li>
            <p className="active">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(242, 242, 242, 1)"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-5 w-5 "
              >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path>
              </svg>Para vos
              {/**
               *               <span className="badge badge-sm badge-warning">!</span>
               */}
            </p>
          </li>
          <li>
            <Link to="/mensajes">
              <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(0, 0, 0, 1)"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 "
              >
              <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path>
              <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"></path>
              </svg>Mensajes
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <br />
      <div>


{/**
 * removing
 *  md:grid-cols-6
 * for a future desktop version
 */}
        {isLoading ? <p>Cargando ando</p> : <div className="grid grid-cols-2 gap-1">

          {data.map((item, index) => (
            <Link key={index} className='w-50 h-50' to={"/offer/"+item.id}>

              <div
                className="card card-compact w-50 h-48 card-bordered bg-base-100  shadow-sm border-gray-200"
              >
                <figure>

                <Imagen
                    className='object-cover'
                    //width={300}
                    //height={300}
                    lowResSrc={"https://placehold.co/150x150/png/000000/FFFFFF?text=Loading..."}
                    highResSrc={item.offer_images[0].offer_image_url}
                    />

                  {/*item.offer_images[0] ?

                    <img
                      src={item.offer_images[0].offer_image_url}
                      alt="Shoes"
                      className='object-cover'
                    />
                    :
                    <div className="skeleton h-32 w-full"></div>
          */}

                </figure>
                <div className="card-body p-0.5	">
                  <div className="join w-full flex justify-between">
                    {/**
             * https://daisyui.com/components/join/
             */}
                    <p className='truncate'>{item.offer_title}</p>
                    <p> </p>
                    <p className='text-primary'>{formatToARS(item.offer_price)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}</div>}
      </div>
    </div>
  );
}

export default App;