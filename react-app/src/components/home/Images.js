import React, { Component } from "react";
import { Carousel, Image } from "react-bootstrap";
import axios from "axios";

class Images extends Component {
  state = {
    index: 0,
    direction: null,
    images: []
  }

  handleSelect = (index, e) => {
    const { direction } = e;
    this.setState({ index, direction });
  };

  componentDidMount = () => {
    axios
      .get("https://dog.ceo/api/breeds/image/random/5")
      .then(response => {
        const images = response.data.message;
        this.setState({ images })
      })
  }

  render() {
    const { index, direction, images } = this.state;
    return (
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
        <Carousel activeIndex={index} direction={direction} onSelect={this.handleSelect} >
          {images.map((image, index) => (
            <Carousel.Item key={index} className="w-100 p-3">
              <Image
                src={image}
                alt="Error"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>)
  }
}

export default Images;