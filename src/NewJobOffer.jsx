import { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function NewJobOffer() {
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

      <div className="flex justify-left border-t px-4 py-4">
        <label className="form-control w-full max-w-xs">
          <div className="hero bg-base-200 h-100 w-100">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <p className="py-6">
                  Upload a photo! the first one will be the portada of your post
                </p>
                <button className="btn btn-primary">Upload</button>
              </div>
            </div>
          </div>

          <div className="label">
            <span className="label-text">Tipo de publicacion</span>
            <span className="label-text-alt">Alt label</span>
          </div>
          <select className="select select-bordered">
            <option disabled selected>
              Eleji la tuya
            </option>
            <option>Quiero ofrecer...</option>
            <option>Estoy buscando...</option>
          </select>
          <br></br>

          <div className="label">
            <span className="label-text">Titulo de la publicacion</span>
            <span className="label-text-alt">que haces en criollo</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          {/*
                                <div className="label">
            <span className="label-text-alt">hacelo bien sencillo asi te encuentran mas facil!</span>
          </div>

             */}
          <br></br>

          <div className="label">
            <span className="label-text">Precio</span>
          </div>
          <input
            type="Number"
            placeholder="Ejemplo 20000"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt">
              Valor sugerido $$$ basandonos en publicaicones similares
            </span>
          </div>
          <br></br>

          <div className="label">
            <span className="label-text">Descripcion de la publicacion</span>
            {/**
             *             <span className="label-text-alt">algo mas detallado</span>

             */}
          </div>
          <textarea
            placeholder="Una descripcion mas en detalle"
            className="textarea textarea-bordered textarea-md w-full max-w-xs"
          ></textarea>
        </label>
      </div>
      <br></br>
    </div>
  );
}

export default NewJobOffer;
