import React from 'react';

const Photo = props => {
  return (
    <div className={props.classes.join(' ')}>
      {/* <img src={props.myImg} alt={props.myImg} /> */}
      <h2>{props.index}</h2>
    </div>
  );
};

export default Photo;
