import React, { Component } from 'react';
import images from './assets/data/data';

import Photo from './components/Photo';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePhotoClick = this.onPhotoClickhandler.bind(this)
    this.state = {
      currentImage: images[0],
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      data: images
    });
  }


  nextSlide = () => {
    let newIndex;

    if (this.state.currentImage.id + 1 === images.length){
      newIndex = 0
    } else {
       newIndex = this.state.currentImage.id + 1;
    }
    this.setState({
      currentImage: images[newIndex]
    });
  };

  prevSlide = () => {
    let newIndex;

    if (this.state.currentImage.id === 0){
      newIndex = images.length - 1;
    } else {
       newIndex = this.state.currentImage.id - 1;
    }
    this.setState({
      currentImage: images[newIndex]
    });
  };

  onPhotoClickhandler(photoId) {
    console.log("Logging ID: ", photoId)
    this.setState({
      currentImage: images[photoId]
    });
  }

  render() {
    console.log('RENDER');
    return (
      <div className="App">
        
        <h1>This is picture slider. Welcome.</h1>

        <div className="photo-slider">
          <div
            className="photos-slider-wrapper"
            // style={{
            //   transform: `translateX(-${this.state.currentImage.id *
            //     (100 / this.state.data.length)}%)`
            // }}
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
        <button onClick={() => this.nextSlide()}>Next Image</button>
        <button onClick={() => this.prevSlide()}>Previous Image</button>
      </div>
    );
  }
}

export default App;