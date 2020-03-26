import React from 'react';

const Button = props => {
  // change later
  const buttonClassNames = ['btn'];
  buttonClassNames.push(props.class);
  return (
    <button
      disabled={props.disab}
      className={buttonClassNames.join(' ')}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
