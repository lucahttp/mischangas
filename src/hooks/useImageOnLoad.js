import { useState } from "react";

const useImageOnLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageOnLoad = () => setIsLoaded(true);

  const transitionStyles = {
    lowRes: {
      opacity: isLoaded ? 0 : 1,
      filter: "blur(2px)",
      transition: "opacity 500ms ease-out 50ms"
    },
    highRes: {
      opacity: isLoaded ? 1 : 0,
      transition: "opacity 500ms ease-in 50ms"
    }
  };


  const transitionClasses = {
    lowRes: [isLoaded ? 0 : 1,"object-cover"],
    highRes: [isLoaded ? 1 : 0,"object-cover"]
  };

  return { handleImageOnLoad, transitionStyles };
};

export default useImageOnLoad;
