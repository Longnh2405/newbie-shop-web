import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import { addItem } from '~/redux/slices/shopping-cart/cartItemsSlide';

import { Button, Fab } from '@mui/material';

import numberWithCommas from 'helpers/numberWithCommas';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import { showError, showSuccess } from 'helpers/toast';
import { useCart } from 'providers/CartProvider';
import { BASE_IMAGE } from 'constants/api';
import { getListPropertyProduct } from 'helpers';

const ProductView = (props) => {
  const { addItemToCart } = useCart();

  const [previewImg, setPreviewImg] = useState(`${BASE_IMAGE}${props.product?.image_with_product?.[0]?.image.url}`);

  const productColors = getListPropertyProduct(props.product.product_detail, 'color_id');
  const productSizes = getListPropertyProduct(props.product.product_detail, 'size_id');

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [colorAvail, setColorAvail] = useState(productColors);
  const [sizeAvail, setSizeAvail] = useState(productSizes);

  const [quantity, setQuantity] = useState(1);

  const history = useNavigate();

  const updateQuantity = (type) => {
    if (type === 'plus') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  const handleSetColor = (item) => {
    if (item.value === color?.value) {
      setColor();
      setSizeAvail(productSizes);
    } else {
      setColor(item);
      const newSizeAvail = props.product?.product_detail?.filter((ele) => ele.color_id === item.value);
      setSizeAvail(newSizeAvail);
    }
  };
  const handleSetSize = (item) => {
    if (item.value === size?.value) {
      setSize();
      setColorAvail(productColors);
    } else {
      setSize(item);
      const newColorAvail = props.product?.product_detail?.filter((ele) => ele.size_id === item.value);
      setColorAvail(newColorAvail);
    }
  };

  useEffect(() => {
    setPreviewImg(`${BASE_IMAGE}${props.product?.image_with_product?.[0]?.image.url}`);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
    setColorAvail(productColors);
    setSizeAvail(productSizes);
  }, [props.product]);

  const check = () => {
    if (color === undefined) {
      showError('Vui lòng chọn màu sắc');
      return false;
    } else if (size === undefined) {
      showError('Vui lòng chọn kích thước');
      return false;
    }
    return true;
  };
  const addItem = (item) => {
    const detailItemCart = props.product?.product_detail?.find(
      (ele) => ele.color_id === color.value && ele.size_id === size.value,
    );
    addItemToCart({ ...item, product_detail: { color, size, id: detailItemCart.id }, quantity });
  };

  const addToCart = () => {
    if (check()) {
      addItem(props.product);

      showSuccess('Thêm vào giỏ hàng thành công!');
    }
  };

  const goToCart = () => {
    if (check()) {
      addItem(props.product);
      history('/cart');
    }
  };

  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            onClick={() => setPreviewImg(`${BASE_IMAGE}${props.product?.image_with_product?.[0]?.image.url}`)}
            className="product__images__list__item"
          >
            <img src={`${BASE_IMAGE}${props.product?.image_with_product?.[0]?.image.url}`} alt="" />
          </div>
          <div
            onClick={() => setPreviewImg(`${BASE_IMAGE}${props.product?.image_with_product?.[1]?.image.url}`)}
            className="product__images__list__item"
          >
            <img src={`${BASE_IMAGE}${props.product?.image_with_product?.[1]?.image.url}`} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div className={`product__description ${descriptionExpand ? 'expand' : ''}`}>
          <div className="product__description__title">Chi tiết sản phẩm</div>
          <div
            className="product__description__content"
            dangerouslySetInnerHTML={{ __html: props.product.description }}
          ></div>
          <div className="product__description__toggle">
            <Button
              variant="contained"
              size="large"
              endIcon={descriptionExpand ? <AiFillCaretUp /> : <AiFillCaretDown />}
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{props.product.name}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">{numberWithCommas(props.product?.discount || 0)}đ</span>
        </div>
        <div className="product__info__item">
          <span className="product__info__item__title">Màu sắc</span>
          <div className="product__info__item__list">
            {productColors?.map((item, index) => {
              const isItemAvail = colorAvail?.find((ele) => ele?.color_id === item.value || ele?.value === item.value);
              if (!!isItemAvail) {
                return (
                  <div
                    className={`product__info__item__list__color  color-size ${
                      color?.value === item.value ? 'active' : ''
                    } `}
                    key={index}
                    onClick={() => handleSetColor(item)}
                  >
                    <div className={`circle bg-${item.des.des}`}></div>
                  </div>
                );
              } else {
                return (
                  <div
                    className={`product__info__item__list__color disabled  ${
                      color?.value === item.value ? 'active' : ''
                    } `}
                    key={index}
                    // onClick={() => handleSetColor(item)}
                  >
                    <div className={`circle bg-${item.des.des}`}></div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="product__info__item">
          <span className="product__info__item__title">Kích thước</span>
          <div className="product__info__item__list">
            {productSizes?.map((item, index) => {
              const isItemAvail = sizeAvail?.find((ele) => ele.size_id === item.value || ele?.value === item.value);
              if (!!isItemAvail) {
                return (
                  <div
                    className={`product__info__item__list__size  color-size ${
                      size?.value === item.value ? 'active' : ''
                    }`}
                    onClick={() => handleSetSize(item)}
                    key={index}
                  >
                    <div className={`circle bg-${item}`}>
                      <span className="text">{item.des.label}</span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className={`product__info__item__list__size disabled  ${
                      size?.value === item.value ? 'active' : ''
                    }`}
                    // onClick={() => handleSetSize(item)}
                    key={index}
                  >
                    <div className={`circle bg-${item}`}>
                      <span className="text">{item.des.label}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title"> Số lượng </div>
          <div className="product__info__item__quantity">
            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('minus')}>
              <Fab color="primary" size="small" aria-label="add" variant="extended">
                <AiOutlineMinus></AiOutlineMinus>
              </Fab>
            </div>
            <div className="product__info__item__quantity-input">{quantity}</div>
            <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
              <Fab color="primary" size="small" aria-label="add" variant="extended">
                <AiOutlinePlus></AiOutlinePlus>
              </Fab>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__button">
            <Button variant="contained" size="large" onClick={goToCart}>
              {'Mua ngay'}
            </Button>
            <Button variant="contained" size="large" onClick={addToCart}>
              {'Thêm vào giỏ hàng'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductView;
