
import React, { Component } from 'react';
import images from './assets/data/data';

import Photo from './components/Photo';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: images[1],
      data: []
    };
  }

  componentDidMount() {
    this.setState({
      data: images
    });
  }

  // updateData(index) {
  //   console.log(index);
  //   this.setState({
  //     // data: images.slice(1, 4),
  //     currentImage: images[index],
  //     startingIndex: index
  //   });
  // }

  nextSlide = () => {
    const newIndex = this.state.currentImage.id + 1;
    this.setState({
      currentImage: images[newIndex]
    });
  };

  prevSlide = () => {
    const newIndex = this.state.currentImage.id - 1;
    this.setState({
      currentImage: images[newIndex]
    });
  };

  render() {
    console.log('RENDER');
    return (
      <div className="App">
        <button onClick={() => this.nextSlide()}>Next Image</button>
        <button onClick={() => this.prevSlide()}>Previous Image</button>
        <h1>How are you!</h1>

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
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
