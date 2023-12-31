import React from 'react';
import Slider from 'react-slick';

import productData from 'assets/fake-data/products';
import ProductCard from './ProductCard';

import { FcNext, FcPrevious } from 'react-icons/fc';
import { useProducts } from 'providers/ProductsProvider';
import { getProducts } from 'helpers';
import { BASE_IMAGE } from 'constants/api';

const SliderProduct = () => {
  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} style={{ fontSize: '2.5rem' }} onClick={onClick}>
        <FcNext></FcNext>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} style={{ fontSize: '2.5rem' }} onClick={onClick}>
        <FcPrevious></FcPrevious>
      </div>
    );
  }

  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow className="next" />,
    prevArrow: <SamplePrevArrow className="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { listProduct } = useProducts();

  return (
    <Slider {...settings} pauseOnFocus={false}>
      {getProducts(listProduct, 8).map((item, index) => (
        <ProductCard
          key={item.id}
          img01={`${BASE_IMAGE}${item.image_with_product[0].image.url}`}
          img02={`${BASE_IMAGE}${item.image_with_product[1].image.url}`}
          name={item.name}
          price={item.price}
          discount={item.discount}
          slug={item.id}
        ></ProductCard>
      ))}
    </Slider>
    // <Slider {...settings} pauseOnFocus={false}>
    //   {productData.getProducts(8).map((item, index) => (
    //     <ProductCard
    //       key={index}
    //       img01={item.image01}
    //       img02={item.image02}
    //       name={item.title}
    //       price={Number(item.price)}
    //       slug={item.slug}
    //     ></ProductCard>
    //   ))}
    // </Slider>
  );
};

export default SliderProduct;
