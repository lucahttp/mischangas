import React, { useState } from "react";
import useImageOnLoad from "../hooks/useImageOnLoad";

// https://imagekit.io/blog/image-compression-techniques-in-javascript/
// https://stackoverflow.com/questions/14672746/how-to-compress-an-image-via-javascript-in-the-browser

export default function Imagen({ width = "100%", height = "100%", lowResSrc, highResSrc }){
  // https://medium.com/chili-tech-blog/lazy-loading-image-1-7667550de839
  const { handleImageOnLoad, transitionStyles } = useImageOnLoad();
  const [isLoading, setIsLoading] = useState(true);

  function loaded(event) {
    console.log("loadded the iamge")
    setIsLoading(false)
    handleImageOnLoad(event)
  }
  const styles = {
    wrapper: {
      position: "relative",
      width,
      height
    },
    image: {
      position: "absolute",
      width: "100%",
      height: "100%"
    }
  };

  const lowResStyle = { ...styles.image, ...transitionStyles.lowRes };
  const hightResStyle = { ...styles.image, ...transitionStyles.highRes };

  return (
    <div style={styles.wrapper} className="w-full"
    >
      {isLoading ? <img src={lowResSrc} style={lowResStyle} /> : null}
      
      <img src={highResSrc} style={hightResStyle} onLoad={loaded} />
    </div>
  );
};
