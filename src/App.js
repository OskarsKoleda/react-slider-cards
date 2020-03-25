import React, { Component } from 'react';
import images from './assets/data/data';

import Photo from './components/Photo';
import NavigationDesktop from './containers/NavigationDesktop';
import NavigationMobile from './containers/NavigationMobile';
import './sass/App.scss';

const IMG_WIDTH = 300;
const IMG_HEIGHT = 500;

// https://xxxxxx.com/Stanko/react-slider/blob/gh-pages/slider.js
class App extends Component {
  constructor(props) {
    super(props);
    this.goToNextSlide = this.nextSlide.bind(this);
    this.goToPreviousSlide = this.prevSlide.bind(this);
    this.lastTouch = 0;
    this.updateDimensions = this.updateDim.bind(this);
    this.dataLength = images.length;
    this.startCoord = 0;
    this.state = {
      currentImage: images[0],
      enteredText: '',
      activeImageIndex: 5,
      windowWidth: 0,
      currentIndex: 0,
      movement: 0
    };
  }

  componentDidMount() {
    // this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDim() {
    this.setState({ windowWidth: window.innerWidth });
  }

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
    console.log(newIndex);
    this.setState({
      activeImageIndex: newIndex
    });
  };

  nextSlide = () => {
    let newIndex;
    if (this.state.activeImageIndex === this.dataLength) {
      newIndex = 1;
    } else {
      newIndex = this.state.activeImageIndex + 1;
    }
    this.setState({
      currentImage: images[newIndex],
      activeImageIndex: newIndex
    });
  };

  prevSlide = () => {
    let newIndex;
    if (this.state.activeImageIndex === 1) {
      newIndex = images.length;
    } else {
      newIndex = this.state.activeImageIndex - 1;
    }
    this.setState({
      currentImage: images[newIndex],
      activeImageIndex: newIndex
    });
  };

  onPhotoClickhandler(photoId) {
    this.setState({
      currentImage: images[photoId],
      activeImageIndex: photoId + 1
    });
  }

  handleTouchStart(event) {
    this.startCoord = event.nativeEvent.touches[0].clientX;
  }

  handleTouchMove = event => {
    const delta = this.lastTouch - event.nativeEvent.touches[0].clientX;
    this.lastTouch = event.nativeEvent.touches[0].clientX;

    this.handleMovement(delta);

    // console.log("DELTA: ", delta);
    // console.log("LAST TOUCH: ", this.lastTouch);
  };

  handleTouchEnd = () => {
    this.handleMovementEnd();
    this.lastTouch = 0;

  };

  handleMovement = delta => {
    this.setState(state => {
      const maxLength = this.dataLength - 1;
      let nextMovement = state.movement + delta;
      if (nextMovement < 0) {
        nextMovement = 0;
      }

      if (nextMovement > maxLength * IMG_WIDTH) {
        nextMovement = maxLength * IMG_WIDTH;
      }

      return {
        movement: nextMovement,
        transitionDuration: '0s'
      };
    });
  };

  handleMovementEnd = () => {
    const { movement, currentIndex } = this.state;

    const endPosition = movement / IMG_WIDTH;
    const endPartial = endPosition % 1
    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - currentIndex;
    let nextIndex = endingIndex;
    // console.log('END POSITION: ', endPosition);
    // console.log('END PARTIAL: ', endPartial);
    // console.log('END INDEX: ', endingIndex);
    // console.log('DELTA INTEGER: ', deltaInteger);

    if (deltaInteger >=0) {
      if (endPartial >= 0.1) {
        nextIndex += 1;
      }
    } else if (deltaInteger<0) {
      nextIndex = currentIndex - Math.abs(deltaInteger);
      if (endPartial > 0.9) {
        nextIndex += 1;
      }
    }
    console.log("NEXT INDEX: ",nextIndex);

    this.transitionTo(nextIndex, Math.min(0.5, 1 - Math.abs(endPartial)))
  };

  transitionTo = (index, duration) => {
    this.setState({
      currentIndex: index,
      movement: index * IMG_WIDTH,
      transitionDuration: `${duration}s`
    })
  }

  render() {
    // console.log('RENDER');

    // console.log(this.state.movement);
    // console.log(this.state.transitionDuration);

    let navigationPanel = null;

    if (this.state.windowWidth > 600) {
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
    } else {
      navigationPanel = (
        <div className="nav">
          <NavigationMobile
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


    console.log("TRANS: ", this.state.movement * -1);
    return (
      <div className="App">
        {/* <h1>
          This is picture slider
          <br />
          Welcome
        </h1> */}
        <div className="photo-slider">
          <div
            className="photos-slider-wrapper"
            // style={{
            //   transform: `translateX(-${(+this.state.activeImageIndex - 1) *
            //     (100 / images.length)}%)`
            // }}
            style={{
              transform: `translateX(-${this.state.movement * -1}px)`
            }}
          >
            {images.map(image => {
              const imgClasses = ['photo'];

              if (this.state.activeImageIndex - 1 === image.id) {
                imgClasses.push('active');
              }
              return (
                <Photo
                  classes={imgClasses}
                  index={image.id}
                  key={image.id}
                  myImg={image.src}
                  onClickHandler={() => this.onPhotoClickhandler(image.id)}
                  onTouchStart={e => this.handleTouchStart(e)}
                  onTouchMove={e => this.handleTouchMove(e)}
                  onTouchEnd={() => this.handleMovementEnd()}
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
