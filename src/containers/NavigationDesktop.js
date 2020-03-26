import React from 'react';
import Button from '../components/Button';

const NavigationDesktop = props => {

  return (
    <div className="nav-container">
      <Button disab={false} clicked={props.onClickPrevious}>
        Previous
      </Button>

      <Button disab={props.disabled} clicked={props.onGoClick}>
        Go To Slide
      </Button>
      <input
        type="text"
        onChange={event => props.onTextEntered(event)}
        value={props.inputText}
        placeholder="#"
      />
      <Button disab={false} clicked={props.onClickNext}>
        Next
      </Button>
    </div>
  );
};

export default NavigationDesktop;
