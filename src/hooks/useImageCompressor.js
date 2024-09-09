import { useState } from "react";
import imageCompression from "browser-image-compression";

const useImageCompressor = () => {
    const [originalImage, setOriginalImage] = useState("");
    const [originalImageReadable, setOriginalImageReadable] = useState("");
    const [compressedImage, setCompressedImage] = useState("");
    const [compressedImageReadable, setCompressedImageReadable] = useState("");
  
    const handleImageCompressor = (image) => {
        setOriginalImage(image)
        //readFile(originalImage, setOriginalImageReadable);
        handleCompression();
        return compressedImageReadable;
  }


  
  const handleFileUpload = (e) => {
    setUploaded(1);
    setOriginalImage(e.target.files[0]);

    //console.log("originalImage");
    //console.log(e.target.files[0]);
    readFile(e.target.files[0], setOriginalImageReadable);
    //console.log("originalImage");
    //console.log(originalImageReadable);
  };

  function readFile(file, saveCallback) {
    // https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file#:~:text=by%20the%20user.-,Example,-document.getElementById
    var fr = new FileReader();
    fr.onload = function () {
      //console.log(fr);
      saveCallback(fr.result);
      //return fr.result;
    };
    fr.readAsDataURL(file);
  }
  const handleCompression = (e) => {
    if (true) {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 500,
        useWebWorker: true
      };

      imageCompression(originalImage, options).then((img) => {
        setCompressedImage(img);
        readFile(img, setCompressedImageReadable);
      });
    }
  };


  return { handleImageCompressor };
};

export default useImageCompressor;
