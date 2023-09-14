import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from 'components/Grid/Grid';
import ProductCard from 'components/Product/ProductCard';
import { BASE_IMAGE } from 'constants/api';

const InfinityList = (props) => {
  const perLoad = 6; // items each load

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (listRef && listRef.current) {
        if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index) => (
          <ProductCard
            key={item.id}
            img01={`${BASE_IMAGE}${item.image_with_product[0].image.url}`}
            img02={`${BASE_IMAGE}${item.image_with_product[1].image.url}`}
            name={item.name}
            price={item.price}
            discount={item.discount}
            slug={item.id}
          />
        ))}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};
export default InfinityList;
