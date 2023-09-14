import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Button, Fab } from '@mui/material';

// import { useDispatch } from 'react-redux/es/hooks/useDispatch';
// import { updateItem } from '~/redux/slices/shopping-cart/cartItemsSlide';
// import { removeItem } from '~/redux/slices/shopping-cart/cartItemsSlide';

import numberWithCommas from 'helpers/numberWithCommas';
import CartDialog from 'components/ViewDialog/CartDialog';
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { MdLocalShipping, MdTaskAlt, MdErrorOutline, MdOutlineMailOutline } from 'react-icons/md';
import { useCart } from 'providers/CartProvider';
import { BASE_IMAGE } from 'constants/api';

const CartItem = (props) => {
  const { stardust, Confirm, Shipping, Shipped, Deny, item } = props;

  const { updateItemCart, removeCartItem } = useCart();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateQuantity = (opt) => {
    updateItemCart(item, opt);
  };

  const handleRemoveCartItem = () => {
    removeCartItem(item);
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="cart__item">
      <div className="cart__item__img">
        <Link to={`/catalog/${item.id}`}>
          <img src={`${BASE_IMAGE}${item.image_with_product[0].image.url}`} alt="" />
        </Link>
      </div>
      <div className="cart__item__info">
        <div className="cart__item__info__name">
          <Link to={`/catalog/${item.id}`}>
            <span>{item.name}</span>
            <span>{item.product_detail.color.des.label}</span>
            <span>{item.product_detail.size.des.label}</span>
          </Link>
        </div>
        <div className="cart__item__info__price">Số tiền: {numberWithCommas(item.discount * item.quantity)}đ</div>
        {stardust && <div>Đánh giá {props.children}</div>}
        {props?.delete && (
          <>
            <div className="cart__item__info__quantity">
              <div className="product__info__item__quantity">
                <div
                  className="product__info__item__quantity-btn"
                  onClick={() => {
                    if (item.quantity === 1) return;
                    updateQuantity('-');
                  }}
                >
                  <Fab color="primary" size="small" variant="extended">
                    <AiOutlineMinus></AiOutlineMinus>
                  </Fab>
                </div>
                <div className="product__info__item__quantity-input">{item.quantity}</div>
                <div className="product__info__item__quantity-btn" onClick={() => updateQuantity('+')}>
                  <Fab color="primary" size="small" variant="extended">
                    <AiOutlinePlus></AiOutlinePlus>
                  </Fab>
                </div>
              </div>
            </div>

            <div className="cart__item__info__del" onClick={handleOpenDialog}>
              <Button variant="contained" size="medium" startIcon={<AiFillDelete />}>
                Xóa
              </Button>
            </div>
          </>
        )}
        {Confirm && (
          <Button
            disableRipple
            variant="contained"
            size="medium"
            color="secondary"
            startIcon={<MdOutlineMailOutline />}
          >
            Liên hệ với shop
          </Button>
        )}
        {Shipping && (
          <Button disableRipple variant="contained" size="medium" color="primary" startIcon={<MdLocalShipping />}>
            Đang vận chuyển
          </Button>
        )}
        {Shipped && (
          <Button disableRipple variant="contained" size="medium" color="success" startIcon={<MdTaskAlt />}>
            Đã hoàn thành
          </Button>
        )}
        {Deny && (
          <Button disableRipple variant="contained" size="medium" color="error" startIcon={<MdErrorOutline />}>
            Đơn hàng đã hủy
          </Button>
        )}
      </div>
      <CartDialog
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        removeCartItem={handleRemoveCartItem}
        isDialogOpen={isDialogOpen}
      ></CartDialog>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
