import React from 'react';
import Button from '../components/Button';

const Navigation = props => {
  //   console.log('THESE ARE PROPS: ', props);

  return (
      <div className="nav-btn-container">
        <Button clicked={props.onClickPrevious}>Previous</Button>

        <input
          type="text"
          onChange={event => props.onTextEntered(event)}
          value={props.inputText}
        />
        <Button clicked={props.onGoClick}>Go</Button>
        <Button clicked={props.onClickNext}>Next</Button>
      </div>
  );
};

export default Navigation;
