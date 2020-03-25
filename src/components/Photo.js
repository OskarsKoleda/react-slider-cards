import React from 'react';

const Photo = props => (
  <div
    onTouchStart={props.onTouchStart}
    onTouchMove={props.onTouchMove}
    onTouchEnd={props.onTouchEnd}
    onClick={props.onClickHandler}
    className={props.classes.join(' ')}
  >
    <img src={props.myImg} alt={props.myImg} />
  </div>
);

export default Photo;
