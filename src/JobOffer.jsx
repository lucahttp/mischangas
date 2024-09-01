import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient'
import Imagen from './reciclables/Imagen'

import './App.css';
import { useParams, useLoaderData, useNavigation, Link } from "react-router-dom";
function formatToARS(number, currencySymbol = '$') {
  return number.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    //minimumFractionDigits: 2,
    currencyDisplay: 'symbol',
    currencySymbol
  });
}

const goTo = (event) => {
  event.preventDefault()
  const btn = event.currentTarget;

  //Equivalent
  //const carousel = document.querySelector('.carousel')
  // const carousel = btn.parentElement!.parentElement!.parentElement!
  const carousel = document.querySelector('#imageCarousel')

  const href = btn.getAttribute('href')
  const target = carousel.querySelector(href)
  const left = target.offsetLeft
  carousel.scrollTo({ left: left })
}
/*
function getPreviousIndex(index, array) {
  if (index - 1 < 0) {
    return array.length - 1;
  } else {
    return index - 1;
  }
}

function getNextIndex(index, array) {
  if (index + 1 >= array.length) {
    return 0;
  } else {
    return index + 1;
  }
};
*/
/*
const offerTest = {
  title: 'Armado de mueble',
  price: 20000,
  price_measure: 'Total',
  photos: [
    {
      url: 'https://brdpcvomwqyfbjsxakmj.supabase.co/storage/v1/object/public/test/hq720.jpg',
    },
    {
      url: 'https://brdpcvomwqyfbjsxakmj.supabase.co/storage/v1/object/public/test/puesto_platinum.jpg',
    },
    {
      url: 'https://brdpcvomwqyfbjsxakmj.supabase.co/storage/v1/object/public/test/jnq0xu9jing61.jpeg',
    },
  ],
};
const goTo = (event) => {
  event.preventDefault()
  const btn = event.currentTarget;

  //Equivalent
  //const carousel = document.querySelector('.carousel')
  // const carousel = btn.parentElement!.parentElement!.parentElement!
  const carousel = document.querySelector('#imageCarousel')

  const href = btn.getAttribute('href')
  const target = carousel.querySelector(href)
  const left = target.offsetLeft
  carousel.scrollTo({ left: left })
}
*/



function getPreviousIndex(index, array) {
  if (index - 1 < 0) {
    return array.length - 1;
  } else {
    return index - 1;
  }
}

function getNextIndex(index, array) {
  if (index + 1 >= array.length) {
    return 0;
  } else {
    return index + 1;
  }
}


// https://github.com/shaan-alam/react-router-loaders-example
export const getOffer = async (offerId) => {
  console.log(`obteniendo la publicacion con el id ${offerId}, por favor espere`)
  //offerId = "1b112ddb-5e28-49be-8da4-48183ed14fae"
  try {
    const { data, error } = await supabase
      .from('offers')
      .select(`
    id, 
    offer_title,
    offer_price,
    offer_description,
    offer_type,
    updated_at,
    offer_owner_id,
    profiles(id,username),
    offer_images ( id, offer_image_url )`)
      .eq('id', offerId)
      .single()
    //const res = await fetch(api);
    //profiles ( offer_owner_id ),
    //profiles!inner(offer_owner_id),

    console.log(data)
    return data;
  } catch (error) {
    console.warn(error)
    //setError(error);
    return "error"
  }
};



function JobOffer() {
  const offer = useLoaderData();
  const navigation = useNavigation();

  let { offerId } = useParams();
  useEffect(() => {


    console.log(offer, offerId)
    /*
  async function fetchData() {
    // You can await here
    const res = await getOffer(offerId);
    return res
  }
  const offer = fetchData();
*/
    //const offer = await getOffer(offerId);
    console.log(offer, offerId)


  }, [])

  if (navigation.state === "loading") {
    return <h1>Loading!</h1>;
  }
  return (
    <div className="Offer">
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

      {/* src={offer.offer_images[index].offer_image_url}
      https://stackoverflow.com/questions/75271274/prevent-daisyui-carousel-from-scrolling-when-switching-slides
       */}



      {false ? <p>Carganding</p> : <><div id='imageCarousel' className="carousel w-full">

        {offer.offer_images.map((item, index) => (
          <div key={index} id={"slide" + index} className="carousel-item relative w-full">
            
            <Imagen
            className="w-full"
        //width={'100%'}
        //height={'100%'}
        lowResSrc={"https://via.placeholder.com/150"}
        highResSrc={item.offer_image_url}
      />
{/*
            <img
              src={item.offer_image_url}
              className="w-full" />
 */}
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a onClick={goTo} href={"#slide" + getPreviousIndex(index, offer.offer_images)} className="btn btn-circle">❮</a>
              <a onClick={goTo} href={"#slide" + getNextIndex(index, offer.offer_images)} className="btn btn-circle">❯</a>
            </div>

          </div>
        ))}</div>
        <div className="flex w-full justify-center gap-2 py-2">
          {offer.offer_images.map((item, index) => (
            <a key={index} onClick={goTo} href={"#slide" + index} className="btn btn-xs">{index}</a>
          ))}
        </div>
      </>}

      <div className="grid gap-x-8 pl-2 pr-2 gap-y-4 grid-cols-1">

        <div className="flex justify-between px-4 py-4">
          <h2>{offer.offer_title}</h2>
          <p className='text-primary'>{formatToARS(offer.offer_price)}</p>
        </div>
        {/**
       * 
      <p>tiempo de respuesta 6hs</p>
       */}

        <div className="flex justify-end">


          <div className="join py-8 px-4">

            <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-primary join-item">Me interesa</button>
            {/* Open the modal using document.getElementById('ID').showModal() method
<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
 */}
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <div className="grid grid-rows-1 grid-flow-col gap-1">
                  <div className='col-span-2'>

                    <h3 className="font-bold text-lg">Enviando</h3>
                    <p >Este mensaje desaparecera pronto</p>
                  </div>
                  <div className="col-span-1 radial-progress text-primary" style={{ "--value": 70 }} role="progressbar">
                    70%
                  </div>

                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>Cerrar</button>
              </form>
            </dialog>
            <div className="dropdown dropdown-end">
              {/* Suggested code may be subject to a license. Learn more: ~LicenseLog:1311696644. */}
              <div tabIndex={0} role="button" className="btn btn-primary join-item">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                <li><a onClick={() => document.getElementById('my_modal_3').showModal()} >Contra oferta</a></li>

                {/* Open the modal using document.getElementById('ID').showModal() method
<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
 */}
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <div className="grid grid-rows-1 grid-flow-col gap-1">
                      <div className='col-span-2'>

                        <h3 className="font-bold text-lg">Contra Ofrerta</h3>
                        <input type="number" placeholder="Otro monto $$$" className="input w-full max-w-xs" />                  </div>


                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="col-span-1 btn btn-primary btn-lg">

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="rgba(0, 0, 0, 1)"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                          ><path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path></svg>                      </button>
                      </form>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>Cerrar</button>
                  </form>
                </dialog>
                <li><a onClick={() => document.getElementById('my_modal_4').showModal()}>Consultar</a></li>
              </ul>
              {/* Open the modal using document.getElementById('ID').showModal() method
<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
 */}
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                  <div className="grid grid-rows-1 grid-flow-col gap-1">
                    <div className='col-span-2'>

                      <h3 className="font-bold text-lg">Consultar</h3>
                      <textarea className="textarea textarea-primary" placeholder="Me gustaria saber...."></textarea>
                    </div>


                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="col-span-1 btn btn-primary btn-lg">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="rgba(0, 0, 0, 1)"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="inline-block h-5 w-5 stroke-current"
                        ><path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path></svg>                      </button>
                    </form>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>Cerrar</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
        <p>Pilar,BA</p>
        <p>{offer.offer_description}</p>
        <h3 className='py-3'>Mas sobre el anunciante</h3>

        <div className='stats'>

          <div className="stat">
            <div className="stat-figure text-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              ><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
            </div>
            <div className="stat-title">Calificacion</div>
            <div className="stat-value text-warning">4.26</div>
            <div className="stat-desc w-36">de 21 trabajos en los ultimos meses</div>

          </div>
          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://sm.ign.com/ign_es/cover/b/bob-the-bu/bob-the-builder-the-movie_r5y4.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <br></br>
      <br></br>
    </div>
  );
}

export default JobOffer;
