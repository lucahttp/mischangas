import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

import './App.css';
import { useLoaderData, useNavigation, Link } from "react-router-dom";

import ImageUploader from './ImageUploader'

const links = ["https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
  "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
  "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"

]
/*
<div className="carousel-item skeleton h-24 w-24 items-center justify-center	">
<a className="btn btn-circle btn-ghost" href="#">
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="rgba(0, 0, 0, 1)"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  className="inline-block h-5 w-5 stroke-current"
><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></a>
</div>


key={session.user.id} session={session}

*/

function PostImages(imageList) {
  let divs = [];
  for (let i = 0; i < imageList.lenght; i++) {
    //divs.push(<div key={i}>{i}</div>);
    divs.push(
      <>
        <div key={i} className="carousel-item object-cover w-24 h-24">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
            alt="Pizza"
            className="" />
        </div>
        <ImageUploader
          url={imageList[i]}
          size={150}
          onUpload={(event, url) => {
            console.log(event, url)

            imageList.push(url);
            //updateProfile(event, url)
          }}
        />
      </>
    );
  }

  divs.push(
    <div className="carousel-item skeleton h-24 w-24 items-center justify-center	">
      <a className="btn btn-circle btn-ghost" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="rgba(0, 0, 0, 1)"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="inline-block h-5 w-5 stroke-current"
        ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></a>
    </div>
  );

  return <div className="carousel carousel-center h-24 w-full ">{divs}</div>;
}


function NewJobOffer() {
  const [loading, setLoading] = useState(true)

  const [session, setSession] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [offerTitle, setOfferTitle] = useState(null)
  const [offerType, setOfferType] = useState(null)
  const [offerPrice, setOfferPrice] = useState(null)
  const [offerDescription, setOfferDescription] = useState(null)
  const [images, setImages] = useState([]);
  const result = useLoaderData();
  const navigation = useNavigation();
  // https://react.dev/learn/updating-arrays-in-state


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('offer_images').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('offer_images').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      //onUpload(event, filePath)
      console.log(filePath)

      images.push("https://brdpcvomwqyfbjsxakmj.supabase.co/storage/v1/object/public/offer_images/" + filePath);

    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  async function insertOfferImage(offer_id, avatarUrl,position) {

    setLoading(true)
    const { user } = session

    const newImage = {
      offer_id: offer_id,
      offer_owner_id: user.id,
      offer_image_url: avatarUrl,
      offer_image_position: position,
      updated_at: new Date(),
    }

    //const { error } = await supabase.from('offer_images').upsert(newImage)
    //const { error } = await supabase.from('offers').upsert(newOffer)
    const { data, error } = await supabase
      .from('offer_images')
      .insert(newImage)
      .select();


    if (error) {
      alert(error.message)
    } else {
      //setAvatarUrl(avatarUrl)
    }

    // Get the ID of the newly created record
    const newRecordId = data[0].id;
    // Do something with the newRecordId (e.g., update state, redirect)
    console.log('New offer image record ID:', newRecordId);

  }


  async function uploadOffer(event) {
    event.preventDefault()

    setLoading(true)
    const { user } = session

    const newOffer = {

      //id: 123,
      offer_title: offerTitle,
      offer_type: offerType,
      offer_price: offerPrice,
      offer_description: offerDescription,
      offer_owner_id: user.id,
      updated_at: new Date(),
    }

    //const { error } = await supabase.from('offers').upsert(newOffer)
    const { data, error } = await supabase
      .from('offers')
      .insert(newOffer)
      .select();


    if (error) {
      alert(error.message)
    } else {
      //setAvatarUrl(avatarUrl)
    }

    // Get the ID of the newly created record
    const newRecordId = data[0].id;
    // Do something with the newRecordId (e.g., update state, redirect)
    console.log('New record ID:', newRecordId);

    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      insertOfferImage(newRecordId, element, index)
    }

    setLoading(false)
  }

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

      <div className="flex justify-left border-t px-4 py-4">
        <label className="form-control w-full max-w-xs">

          {images.length < 1 ? <div className="hero bg-base-200 h-100 w-100">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <p className="py-6">
                  Upload a photo! the first one will be the portada of your post
                </p>

                <label htmlFor="single" className="btn btn-primary">
                  Click here to Upload
                </label>


                <input
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                  }}
                  type="file"
                  id="single"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
              </div>
            </div>
          </div>
            : <div className="carousel carousel-center  h-24 w-full">

              {images.map((item, index) => (
                <>
                  <div key={index} className="carousel-item w-24">
                    <img className='object-cover' src={item} alt="Pizza" />
                  </div>


                </>
              ))}
              {/**
               * 
              <div className="carousel-item w-24">
                <img className='object-cover' src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Pizza" />
              </div>
               */}

              <div className="carousel-item skeleton h-24 w-24 items-center justify-center	">


                <input
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                  }}
                  type="file"
                  id="single"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />

                <label htmlFor="single" className="btn btn-circle btn-ghost" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgba(0, 0, 0, 1)"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></label>
              </div>

              {/**
             * 
            <div className="carousel-item">
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                alt="Pizza" />
            </div>
             */}
            </div>}




          {/*for (let i = 0; i < imageList.lenght; i++) {
    //divs.push(<div key={i}>{i}</div>);
    divs.push(
      <>
      <div key={i} className="carousel-item object-cover w-24 h-24">
        <img
          src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
          alt="Pizza"
          className="" />
      </div>
      <ImageUploader 
        url={imageList[i]}
        size={150}
        onUpload={(event, url) => {
          console.log(event, url)

          imageList.push(url);
          //updateProfile(event, url)
        }}
        />
      </>
    );}*/}

          {/**
             * <div key={index}>{item}</div>
            <div key={index} className="carousel-item object-cover w-24 h-24">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Pizza"
                className="" />
            </div>
            <ImageUploader
              url={item}
              size={150}
              onUpload={(event, url) => {
                console.log(event, url)

                images.push(url);
                //updateProfile(event, url)
              }}
            />
             */}

          <div className="label">
            <span className="label-text">Tipo de publicacion</span>
            <span className="label-text-alt"></span>
          </div>
          <select className="select select-bordered">
            <option disabled defaultValue>
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
            placeholder="Escribi aca"
            htmlFor="title"
            id="title"
            required
            value={offerTitle || ''}
            onChange={(e) => setOfferTitle(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />


          <br></br>




          <div className="label">
            <span className="label-text">Precio</span>
          </div>
          <input
            type="Number"
            placeholder="Ejemplo 20000"
            htmlFor="price"
            id="price"
            required
            value={offerPrice || ''}
            onChange={(e) => setOfferPrice(e.target.value)}
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

          </div>
          <textarea
            value={offerDescription || ''}
            onChange={(e) => setOfferDescription(e.target.value)}
            placeholder="Una descripcion mas en detalle"
            className="textarea textarea-bordered textarea-md w-full max-w-xs"
          ></textarea>
        </label>
      </div>
      <br></br>
      <button className='btn btn-primary' onClick={uploadOffer}>Publicar</button>
    </div>
  );
}

export default NewJobOffer;
