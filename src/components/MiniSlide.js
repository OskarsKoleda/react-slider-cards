import React from 'react';
import images from '../assets/data/data';

const MiniSlide = props => (
  <ul className="small-photo-container">
    {images.map(image => {
      return (
        <li key={image.id} className="small-photo-item">
          <img key={image.id} src={image.src} alt={image.src} />
        </li>
      );
    })}
  </ul>
);

export default MiniSlide;
