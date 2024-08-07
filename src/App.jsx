import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient'
import { data } from 'autoprefixer';
function formatToARS(number, currencySymbol = '$') {
  return number.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    //minimumFractionDigits: 2,
    currencyDisplay: 'symbol',
    currencySymbol
  });
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
    return <div>Loading...</div>;
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
              Para vos
              {/**
               *               <span className="badge badge-sm badge-warning">!</span>
               */}
            </p>
          </li>
          <li>
            <p>Categorias</p>
          </li>
        </ul>
      </div>
      <div>



        {isLoading ? <p>Hola</p> : <div className="grid grid-cols-2 md:grid-cols-6">

          {data.map((item, index) => (
            <Link key={index} to={"/offer/"+item.id}>

              <div
                className="card card-compact card-bordered bg-base-100 w-50 shadow-sm border-gray-200"
              >
                <figure>
                  {item.offer_images[0] ?

                    <img
                      src={item.offer_images[0].offer_image_url}
                      alt="Shoes"
                      className='object-cover'
                    />
                    :
                    <div className="skeleton h-32 w-full"></div>
                  }

                </figure>
                <div className="card-body">
                  <div className="join">
                    {/**
             * https://daisyui.com/components/join/
             */}
                    <h2>{item.offer_title}</h2>
                    <p> </p>
                    <p className='text-primary'>{formatToARS(item.offer_price)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}</div>}


        {/**
         * className="grid grid-cols-2 md:grid-cols-6">
         *  className="grid grid-cols-1 md:grid-cols-6">
         * grid grid-cols-2 gap-2">
         * 
         *         <div className="card card-compact bg-base-100 w-96 shadow-sm">

         */}
        {/**
          * <div className="card card-bordered w-50 bg-base-100 border-yellow-600">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        <div className="card card-compact card-bordered bg-base-100 w-50 shadow-sm border-yellow-600">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2>Armado placard!</h2>

          </div>
        
          */}
        {/**
             *             <p>If a dog chews shoes whose shoes does he choose?</p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
             */}
      </div>
    </div>
  );
}

export default App;