import React, { Component } from 'react';
import images from './assets/data/data';
import _ from 'lodash'

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
    // this.updateDimensions = this.updateDim.bind(this);
    this.dataLength = images.length;
    this.state = {
      currentImage: images[0],
      enteredText: '',
      activeImageIndex: 5,
      windowWidth: 0,
      dragStart: 0,
      dragStartTime: new Date(),
      index: 0,
      lastIndex: 0
    };
  }

  componentDidMount() {
    // this.updateDimensions();
    window.addEventListener('resize', this.throttleHandleWindowResize);
  }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log(nextState)
    
//     if(nextState.data === this.state.data)
//     return false
// return true
//   }


  throttleHandleWindowResize = _.debounce(e => {
    console.log('Debounced!')
    this.setState({windowWidth: window.innerWidth})
  }, 200)
  

  // updateDim() {
  //   this.setState({ windowWidth: window.innerWidth });
  // }

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
    const startCoord = event.nativeEvent.touches[0].clientX;
    this.setState({
      dragStart: startCoord,
      dragStartTime: new Date()
    })
  }

  handleTouchMove = event => {

    const x = event.nativeEvent.touches[0].clientX;
    const offset = this.state.dragStart - x;
    const percentageOffset = offset / IMG_WIDTH;
    const newIndex = this.state.lastIndex + percentageOffset;
    const SCROLL_OFFSET_TO_STOP_SCROLL = 30;

    if (Math.abs(offset) > SCROLL_OFFSET_TO_STOP_SCROLL) {
      // console.log('OFFSET BIGGER SCROLL OFFSET TO STOP SCROLL')
    }

    // console.log('NEW INDEX: ', newIndex)
    this.setState({
      index: newIndex
    })
  };

  handleTouchEnd = () => {
    const {
      dragStartTime,
      index,
      lastIndex,
    } = this.state;

    const timeElapsed = new Date().getTime() - dragStartTime.getTime();
    const offset = lastIndex - index;
    const velocity = Math.round(offset / timeElapsed * 10000)

    let newIndex = Math.round(index);

    if (Math.abs(velocity) > 5) { 
      newIndex = velocity < 0 ? lastIndex + 1 : lastIndex - 1
    }

    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex >= this.dataLength) {
      newIndex = this.dataLength - 1;
    }

    this.setState({ 
      dragStart: 0,
      index: newIndex,
      lastIndex: newIndex,
    })

    console.log('NEW INDEX: ', newIndex)
    // console.log('OFFSET: ', offset)
    // console.log('VELOCITY: ', velocity)
  };

  handleMovement = delta => {


  };

  handleMovementEnd = () => {


  };


  render() {
    console.log('RENDER')
    let navigationPanel = null;
    console.log('WINDOW WIDTH: ', this.state.windowWidth)

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
              transform: `translateX(-${(+this.state.index) *
                (100 / images.length)}%)`
            }}
          >
            {images.map(image => {
              const imgClasses = ['photo'];

              // if (this.state.activeImageIndex - 1 === image.id) {
              //   imgClasses.push('active');
              // }

              if (this.state.index === image.id) {
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
