import React from "react";

import Photo from "../components/Photo";
import images from "../assets/data/data";

const Slider = React.memo(props => {
  const imagesLength = images.length;
  return (
    <div className="photo-slider">
      <div
        className="photos-slider-wrapper"
        style={{
          transform: `translateX(-${+props.index * (100 / imagesLength)}%)`
        }}
      >
        {images.map((image, key) => {
          const imgClasses = ["photo"];
          if (props.index === key) {
            imgClasses.push("active");
          }
          return (
            <Photo
              classes={imgClasses}
              index={key}
              key={key}
              myImg={image.src}
              onClickHandler={() => props.onImageClickHandler(key)}
              onTouchStart={event => props.onTouchStartHandler(event)}
              onTouchMove={event => props.onTouchMoveHandler(event)}
              onTouchEnd={() => props.onTouchEndHandler()}
            />
          );
        })}
      </div>
    </div>
  );
});

export default Slider;
