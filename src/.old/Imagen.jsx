import React, { useState } from "react";
//import useImageOnLoad from "../hooks/useImageOnLoad";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// https://imagekit.io/blog/image-compression-techniques-in-javascript/
// https://stackoverflow.com/questions/14672746/how-to-compress-an-image-via-javascript-in-the-browser

export default function Imagen({ width = "100%", height = "100%", lowResSrc, highResSrc }){
  // https://medium.com/chili-tech-blog/lazy-loading-image-1-7667550de839

  return (
    <LazyLoadImage
      alt="imagen"
      placeholderSrc={lowResSrc}
      effect="blur"
      wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: {transitionDelay: "1s"},
      }}
      visibleByDefault={true}
      //height={height}
      src={highResSrc} // use normal <img> attributes as props
      //width={width}
       />
  );
};
