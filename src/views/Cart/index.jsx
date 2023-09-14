import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Section, { SectionBody, SectionTitle } from 'components/Section/Section';
import Grid from 'components/Grid/Grid';
import ProductCard from 'components/Product/ProductCard';
import CartItem from 'components/CartItem/CartItem';
import productData from 'assets/fake-data/products';
import { useCart } from 'providers/CartProvider';
import numberWithCommas from 'helpers/numberWithCommas';
import { useProducts } from 'providers/ProductsProvider';
import { BASE_IMAGE } from 'constants/api';
import { getProducts } from 'helpers';
import { useAuthentication } from 'providers/AuthenticationProvider';
import useToggleDialog from 'hooks/useToggleDialog';
import { RouteBase } from 'constants/routeUrl';

const useStyles = makeStyles((theme) => {
  return {};
});

const Cart = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { isLogged } = useAuthentication();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { listProduct } = useProducts();
  const { open, toggle, shouldRender } = useToggleDialog();

  const totalPrice = useMemo(() => {
    let total = 0;
    for (let index = 0; index < cartItems.length; index++) {
      total += cartItems?.[index]?.discount * cartItems?.[index]?.quantity;
    }
    return total;
  }, [cartItems]);

  //! Function

  const handleToPayment = () => {
    if (isLogged) {
      navigate('/payment');
    } else {
      toggle();
    }
  };

  //! Render
  return (
    <Fragment>
      <div className="cart container">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền</span>
              <span>{numberWithCommas(totalPrice)}đ</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Link to="/catalog">
              <Button variant="contained" size="large">
                Tiếp tục mua hàng
              </Button>
            </Link>
            <div className="btn-pay">
              <Button variant="contained" size="large" onClick={handleToPayment} disabled={cartItems.length === 0}>
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
        <div className="cart__list">
          {cartItems.map((item, index) => (
            <CartItem item={item} key={index} delete></CartItem>
          ))}
        </div>
      </div>
      <Section>
        <SectionTitle>Top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
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
          </Grid>
        </SectionBody>
      </Section>

      {shouldRender && (
        <CommonStyles.Modal
          open={open}
          toggle={toggle}
          header="Đăng nhập?"
          content="Bạn cần đăng nhập để thực hiện chức năng này"
          footer={
            <Fragment>
              <CommonStyles.Button onClick={toggle} color="error">
                Hủy
              </CommonStyles.Button>
              <CommonStyles.Button
                onClick={() => {
                  navigate(RouteBase.Login);
                }}
              >
                Đăng nhập
              </CommonStyles.Button>
            </Fragment>
          }
        />
      )}
    </Fragment>
  );
};

export default Cart;
