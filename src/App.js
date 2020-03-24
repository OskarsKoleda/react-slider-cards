import React, { Component } from 'react';
import images from './assets/data/data';

import Photo from './components/Photo';
import MiniSlide from './components/MiniSlide';
import Navigation from './containers/Navigation';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.goToNextSlide = this.nextSlide.bind(this);
    this.goToPreviousSlide = this.prevSlide.bind(this);
    this.state = {
      currentImage: images[0],
      data: images,
      enteredText: ''
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     data: images
  //   });
  // }

  inputChangeHandler = event => {
    this.setState({
      enteredText: event.target.value
    });
  };

  onGoButtonClick = () => {
    let newIndex = +this.state.enteredText;
    // console.log("new index: ",newIndex);
    this.setState({
      currentImage: images[newIndex]
    });
  };

  nextSlide = () => {
    let newIndex;
    if (this.state.currentImage.id + 1 === images.length) {
      newIndex = 0;
    } else {
      newIndex = this.state.currentImage.id + 1;
    }
    this.setState({
      currentImage: images[newIndex]
    });
  };

  prevSlide = () => {
    let newIndex;
    if (this.state.currentImage.id === 0) {
      newIndex = images.length - 1;
    } else {
      newIndex = this.state.currentImage.id - 1;
    }
    this.setState({
      currentImage: images[newIndex]
    });
  };

  onPhotoClickhandler(photoId) {
    this.setState({
      currentImage: images[photoId]
    });
  }

  render() {
    console.log('RENDER');

    return (
      <div className="App">
        <h1>
          This is picture slider
          <br />
          Welcome
        </h1>
        <div className="photo-slider">
          <div
            className="photos-slider-wrapper"
            style={{
              transform: `translateX(-${this.state.currentImage.id *
                (100 / this.state.data.length)}%)`
            }}
          >
            {this.state.data.map(image => {
              const imgClasses = ['photo'];

              if (this.state.currentImage.id === image.id) {
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

        <Navigation
          onClickPrevious={this.goToPreviousSlide}
          onClickNext={this.goToNextSlide}
          onTextEntered={event => this.inputChangeHandler(event)}
          inputText={this.state.enteredText}
          onGoClick={() => this.onGoButtonClick()}
        />
      </div>
    );
  }
}

export default App;
