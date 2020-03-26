import React, { Component } from 'react';
import images from './assets/data/data';
import _ from 'lodash';

import Photo from './components/Photo';
import NavigationDesktop from './containers/NavigationDesktop';
import './sass/App.scss';

// https://xxxxxx.com/Stanko/react-slider/blob/gh-pages/slider.js
class App extends Component {
  constructor(props) {
    super(props);
    this.goToNextSlide = this.nextSlide.bind(this);
    this.goToPreviousSlide = this.prevSlide.bind(this);
    this.lastTouch = 0;
    // this.updateDimensions = this.updateDim.bind(this);
    this.dataLength = images.length;

    this.state = {
      enteredText: '',
      windowWidth: 0,

      index: 5,

      left: 0,
      originalOffset: 0,
      touchStartX: 0,
      prevTouchX: 0,
      beingTouched: false,
    };
  }

  componentDidMount() {
    this.setState({ windowWidth: window.innerWidth });
    window.addEventListener('resize', this.throttleHandleWindowResize);
  }

  throttleHandleWindowResize = _.debounce(e => {
    console.log('Debounced!');
    this.setState({ windowWidth: window.innerWidth });
  }, 100);

  inputChangeHandler = event => {
    const textValue = event.target.value;
    if (textValue.length <= 3) {
      this.setState({
        enteredText: textValue
      });
    }
  };

  onGoButtonClick = () => {
    let newIndex = +this.state.enteredText;

    if (isNaN(newIndex)) {
      this.setState({
        enteredText: ''
      });
      return;
    }

    if (newIndex < 1 || newIndex > this.dataLength) {
      return;
    }
    this.setState({
      index: newIndex - 1
    });
  };

  nextSlide = () => {
    let newIndex;
    if (this.state.index === this.dataLength - 1) {
      newIndex = 0;
    } else {
      newIndex = this.state.index + 1;
    }
    this.setState({
      index: newIndex
    });
  };

  prevSlide = () => {
    let newIndex;
    if (this.state.index === 0) {
      newIndex = images.length - 1;
    } else {
      newIndex = this.state.index - 1;
    }
    this.setState({
      index: newIndex
    });
  };

  onPhotoClickHandler(photoId) {
    this.setState({
      index: photoId
    });
  }

  handleTouchStart(event) {
    console.log(event.targetTouches);
    this.handleMotionStart(event.targetTouches[0].clientX);
  }

  handleMotionStart(e) {
    console.log('HANDLE MOTION START: ', e);


    this.setState({
      originalOffset: this.state.left,
      touchStartX: e,
      beingTouched: true,

    });
  }

  handleTouchMove(touchMoveEvent) {
    this.handleMove(touchMoveEvent.targetTouches[0].clientX);
  }

  handleMove(clientX) {
    if (this.state.beingTouched) {
      const touchX = clientX;
      let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
      this.setState({
        left: deltaX,
        prevTouchX: touchX
      });
    }
  }

  handleTouchEnd = () => {
    this.handleEnd();
  };

  handleEnd() {
    let moveSlides = this.state.left / 150;
    moveSlides = Math.round(moveSlides);
    if (moveSlides > 1) {
      moveSlides = 1;
    } else if (moveSlides < -1) {
      moveSlides = -1;
    }
    let newIndex = this.state.index - moveSlides;

    if (newIndex > this.dataLength - 1) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = this.dataLength - 1;
    }

    this.setState({
      velocity: this.state.velocity,
      touchStartX: 0,
      beingTouched: false,
      index: newIndex,
      left: 0
    });
  }

  render() {
    // console.log('RENDER');
    let navigationPanel = null;
    // if (this.state.windowWidth > 600) {
      if (window.innerWidth > 600) {
      navigationPanel = (
        <div className="nav">
          <NavigationDesktop
            onClickPrevious={this.goToPreviousSlide}
            onClickNext={this.goToNextSlide}
            onTextEntered={event => this.inputChangeHandler(event)}
            inputText={this.state.enteredText}
            onGoClick={() => this.onGoButtonClick()}
            disabled={this.state.enteredText.trim() === ''}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <div className="photo-slider">
          <div
            className="photos-slider-wrapper"
            style={{
              transform: `translateX(-${+this.state.index *
                (100 / images.length)}%)`
            }}
          >
            {images.map(image => {
              const imgClasses = ['photo'];
              if (this.state.index === image.id) {
                imgClasses.push('active');
              }
              return (
                <Photo
                  classes={imgClasses}
                  index={image.id}
                  key={image.id}
                  myImg={image.src}
                  onClickHandler={() => this.onPhotoClickHandler(image.id)}
                  onTouchStart={e => this.handleTouchStart(e)}
                  onTouchMove={e => this.handleTouchMove(e)}
                  onTouchEnd={() => this.handleTouchEnd()}
                />
              );
            })}
          </div>
        </div>
        {navigationPanel}
      </div>
    );
  }
}

export default App;
