import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

//import './App.css';
import { useLoaderData, useNavigation, Link } from "react-router-dom";

import ImageUploader from './ImageUploader'




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

  async function insertOfferImage(offer_id, avatarUrl, position) {

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
        <br></br>

          {/*<div className="hero bg-base-200 h-100 w-100">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <p className="py-6">
                  Upload a photo! the first one will be the portada of your post
                </p>

                <label htmlFor="single2" className="btn btn-primary">
                  Click here to Upload
                </label>


                <input
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                  }}
                  type="file"
                  id="single2"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
              </div>
            </div>
                </div>*/}

          {images.length < 1 ?

            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading} />
              </label>
            </div>
            : <div className="carousel carousel-center pt-3 h-36 gap-4 w-full">

              {images.map((item, index) => (
                <>

                  <div key={index} id={`newImage${index}`} className=" carousel-item w-24 avatar indicator">
                    <span className=" z-100 indicator-item badge badge-secondary cursor-pointer" onClick={(event) => {
                      event.preventDefault()
                      
                      setImages(images=> images.filter((s,i)=>(i != index)))
                      console.log(images);
                    }}>X</span>
                    <div className="h-24 w-24 rounded-lg">
                      <img className='cursor-pointer' src={item} alt="Pizza" />
                    </div>
                  </div>

                </>
              ))}


              {/*
                           <div className="flex items-center justify-center w-full">
              <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading} />
              </label>
            </div>


                          <div className="carousel-item skeleton h-24 w-24 items-center justify-center	">


                <input
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                  }}
                  type="file"
                  id="single1"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />

                <label htmlFor="single1" className="btn btn-circle btn-ghost" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgba(0, 0, 0, 1)"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  ><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg></label>
              </div>
               */}
              <div className="carousel-item h-24 w-24 flex items-center justify-center">
                <label htmlFor="dropzone-file1" className="flex flex-col items-center justify-center h-24 w-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Subi una mas</span></p>
                  </div>
                  <input id="dropzone-file1" type="file" className="hidden"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading} />
                </label>
              </div>
            </div>}

          <br></br>
          <br></br>

          <div className="label">
            <span className="label-text">Tipo de publicacion</span>
            <span className="label-text-alt"></span>
          </div>
          <select className="select select-bordered">
            <option disabled defaultValue>
              Elegi la tuya
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

      <br></br>
      <br></br>
    </div>
  );
}

export default NewJobOffer;
