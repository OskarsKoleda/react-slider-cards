import React from 'react';

const Photo = props => (
  <div onClick={props.onClickHandler} className={props.classes.join(' ')}>
    <img src={props.myImg} alt={props.myImg} />
  </div>
);

export default Photo;
