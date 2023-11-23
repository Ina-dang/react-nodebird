import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Slider from 'react-slick';
import {
  CloseBtn,
  Global,
  Header,
  ImageWrapper,
  Indicator,
  Overlay,
  SliderWrapper,
} from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    initialSlide: 0,
    afterChange: (slide) => setCurrentSlide(slide),
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SliderWrapper>
        <div>
          <Slider {...settings}>
            {images.map((image) => (
              <ImageWrapper key={image.src}>
                <img
                  src={`http://localhost:3060/${image.src}`}
                  alt={image.src}
                />
              </ImageWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SliderWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
