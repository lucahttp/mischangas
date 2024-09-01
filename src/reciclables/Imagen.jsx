import React, { useState, useEffect } from 'react';
import useImageOnLoad from "../hooks/useImageOnLoad";

function Imagen({className = "", width = "100%", height = "100%", lowResSrc, highResSrc }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { handleImageOnLoad, transitionStyles } = useImageOnLoad();

  useEffect(() => {
    const img = new Image();
    img.src = highResSrc; // Replace with your image path

    img.onload = () => {

      handleImageOnLoad(event)
      setImageLoaded(true);
    };
  }, []);

  return (
    <>
      {imageLoaded ? (
        <img className={className} src={highResSrc} width="100%" height="100%" style={transitionStyles.highRes} alt="Full Image" />
      ) : (
        <img className={className} src={lowResSrc} width="100%" height="100%" style={transitionStyles.lowRes} alt="Placeholder" />
      )}
    </>
  );
}

export default Imagen;