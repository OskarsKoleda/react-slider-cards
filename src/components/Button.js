import React from 'react';

const Button = props => (
  <button className={'btn'} onClick={props.clicked}>
    {props.children}
  </button>
);

export default Button;
