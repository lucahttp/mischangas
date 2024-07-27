import { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

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
function PhotoGallery() {
  let divs = [];
  for (let i = 0; i < offerTest.photos.length; i++) {
    //divs.push(<div key={i}>{i}</div>);
    divs.push(
      <div className="carousel-item w-full h-50">
        {' '}
        <img src={offerTest.photos[i].url} className="rounded-box" />
      </div>
    );
  }
  return (
    /*
    <div className="carousel rounded-box w-64">
    */
    <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
      {divs}
    </div>
  );
}

function JobOffer() {
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

      <PhotoGallery />
      <div className="flex justify-left border-t px-4 py-4">
        <h2>{offerTest.title}</h2>
        <h3>$20.000</h3>
      </div>
      <br></br>
      <p>tiempo de respuesta 6hs</p>
      <p>Pilar,BA</p>
      {/**
      <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
            className="rounded-box"
          />
        </div>
      </div>
https://flowbite.com/docs/components/carousel/#indicators
 */}
    </div>
  );
}

export default JobOffer;
