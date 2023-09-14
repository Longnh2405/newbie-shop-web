import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from '@mui/material';
import numberWithCommas from 'helpers/numberWithCommas';

const ProductCard = (props) => {
  return (
    <div className="product-card">
      <Link to={`/catalog/${props.slug}`}>
        <div className="product-card__image">
          <img src={props.img01} alt="" />
          <img src={props.img02} alt="" />
        </div>
        <h3 className="product-card__name">{props.name}</h3>
        <div className="product-card__price">
          {numberWithCommas(props?.discount || 0)}đ
          <span className="product-card__price__old">
            <del>{numberWithCommas(props?.price || 0)}đ</del>
          </span>
        </div>
      </Link>
      <div className="product-card__btn">
        <Link to={`/catalog/${props.slug}`}>
          <Button variant="contained" size="large">
            chọn mua
          </Button>
        </Link>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
