import React, { Component } from 'react';
import images from './assets/data/data';

import Photo from './components/Photo';
import Navigation from './containers/Navigation';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.goToNextSlide = this.nextSlide.bind(this);
    this.goToPreviousSlide = this.prevSlide.bind(this);
    this.state = {
      currentImage: images[0],
      enteredText: '',
      activeImageIndex: 5
    };
    this.dataLength = images.length;
  }

  // componentDidMount() {
  //   this.setState({
  //     data: images
  //   });
  // }

  inputChangeHandler = event => {
    const textValue = event.target.value
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
      return
    }
    console.log(newIndex)
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
      newIndex = this.state.activeImageIndex- 1;
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

  render() {
    console.log('RENDER');

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
            style={{

                transform: `translateX(-${(+this.state.activeImageIndex - 1) *
                  (100 / images.length)}%)`
            }}
          >
            {images.map(image => {
              const imgClasses = ['photo'];

              
              if ((this.state.activeImageIndex - 1) === image.id) {
                console.log(this.state.activeImageIndex - 1)
                imgClasses.push('active');
              }
              return (
                <Photo
                  classes={imgClasses}
                  index={image.id}
                  key={image.id}
                  myImg={image.src}
                  onClickHandler={() => this.onPhotoClickhandler(image.id)}
                />
              );
            })}
          </div>
        </div>

<div className="nav">
        <Navigation
          onClickPrevious={this.goToPreviousSlide}
          onClickNext={this.goToNextSlide}
          onTextEntered={event => this.inputChangeHandler(event)}
          inputText={this.state.enteredText}
          onGoClick={() => this.onGoButtonClick()}
          disabled={this.state.enteredText.trim() === ''}
        />
</div>
      </div>
    );
  }
}

export default App;
