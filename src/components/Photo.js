import React from 'react';

const Photo = props => (
  <div onClick={props.onClickHandler} className={props.classes.join(' ')}>
    <img src={props.myImg} alt={props.myImg} />
    {/* <h2>{props.index}</h2> */}
  </div>
);

export default Photo;
