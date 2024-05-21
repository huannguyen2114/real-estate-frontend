import { useState } from "react";
import "./slider.scss";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
        setStartIndex(Math.max(images.length - 4, 0));
      } else {
        setImageIndex(imageIndex - 1);
        if (imageIndex === startIndex) {
          setStartIndex(Math.max(startIndex - 1, 0));
        }
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
        setStartIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
        if (imageIndex === startIndex + 2) {
          setStartIndex(Math.min(startIndex + 1, images.length - 3));
        }
      }
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" className="right" alt="" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(startIndex, startIndex + 3).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(startIndex + index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;