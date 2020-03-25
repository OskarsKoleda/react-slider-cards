import React from 'react';
import Button from '../components/Button';

const NavigationMobile = props => {
  return (
    <div className="nav-container">
      <Button disab={false} clicked={props.onClickPrevious}>
        {"<"}
      </Button>

      <Button disab={false} clicked={props.onClickNext}>
      {">"}
      </Button>
    </div>
  );
};

export default NavigationMobile;
