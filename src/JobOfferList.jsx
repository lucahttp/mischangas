import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Imagen from "./reciclables/Imagen";

function formatToARS(number, currencySymbol = "$") {
  const formatted = number.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    currencyDisplay: "symbol",
    currencySymbol,
  });
  return formatted.replace(/\s/g, ""); // Remove all spaces
}

function JobOfferList() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const getOffers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("offers").select(`
      id, 
      offer_title,
      offer_price,
      offer_images ( id, offer_image_url )
    `);
      console.log(data);
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
    <div>
      {/**
       * removing
       *  md:grid-cols-6
       * for a future desktop version
       */}
      {isLoading ? (
        <p>Cargando ando</p>
      ) : (
        <div className="grid grid-cols-2 gap-1">
          {data.map((item, index) => (
            <Link key={index} className="w-50 h-50" to={"/offer/" + item.id}>
              <div className="card card-compact w-50 h-48 card-bordered bg-base-100  shadow-sm border-gray-200">
                <figure>
                  <Imagen
                    className="object-cover"
                    lowResSrc={
                      "https://placehold.co/150x150/png/000000/FFFFFF?text=Loading..."
                    }
                    highResSrc={item.offer_images[0].offer_image_url}
                  />
                </figure>
                <div className="card-body p-0.5	">
                  <div className="join w-full flex justify-between">
                    <p className="truncate">{item.offer_title}</p>
                    <p> </p>
                    <p className="text-primary">
                      {formatToARS(item.offer_price)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobOfferList;
