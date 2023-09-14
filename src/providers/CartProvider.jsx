import { cloneDeep } from 'lodash';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import httpServices from 'services/httpServices';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const initCartItem = httpServices.getItemCart() || [];
  const [cartItems, setCartItems] = useState(initCartItem);

  const addItemToCart = (item) => {
    const newItem = item;
    const initItemCart = cloneDeep(cartItems);
    const duplicate = initItemCart?.find(
      (item) =>
        item.id === newItem.id &&
        item.product_detail.color.value === newItem.product_detail.color.value &&
        item.product_detail.size.value === newItem.product_detail.size.value,
    );

    if (duplicate) {
      const newItemInCart = initItemCart?.map((item) => {
        if (
          item.id === duplicate.id &&
          item.product_detail.color.value === duplicate.product_detail.color.value &&
          item.product_detail.size.value === duplicate.product_detail.size.value
        ) {
          return { ...item, quantity: item.quantity + duplicate.quantity };
        }
        return item;
      });
      setCartItems(newItemInCart);
    } else {
      const newItemInCart = [...initItemCart, newItem];
      setCartItems(newItemInCart);
    }
  };

  const updateItemCart = (item, opt) => {
    const changeQuantity = opt === '+' ? 1 : -1;
    const newCartItems = cartItems.map((ele) => {
      if (
        item.id === ele.id &&
        item.product_detail.color.value === ele.product_detail.color.value &&
        item.product_detail.size.value === ele.product_detail.size.value
      ) {
        return {
          ...ele,
          quantity: ele.quantity + changeQuantity,
        };
      }
      return ele;
    });
    setCartItems(newCartItems);
  };

  const removeCartItem = (item) => {
    const indexItemDelete = cartItems.findIndex(
      (ele) =>
        item.id === ele.id &&
        item.product_detail.color.value === ele.product_detail.color.value &&
        item.product_detail.size.value === ele.product_detail.size.value,
    );
    const nextCartItem = cloneDeep(cartItems);
    nextCartItem.splice(indexItemDelete, 1);
    setCartItems(nextCartItem);
  };

  const removeAllCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    httpServices.saveItemCart(cartItems);
  }, [cartItems]);

  const value = useMemo(() => {
    return { cartItems, addItemToCart, updateItemCart, removeCartItem, removeAllCart };
  }, [cartItems, addItemToCart, updateItemCart, removeCartItem, removeAllCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
