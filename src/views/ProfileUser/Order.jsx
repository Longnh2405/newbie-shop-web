import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import CommonIcons from 'components/CommonIcons';
import { useGetOrders } from 'hooks/order/useGetOrders';
import { useAuthentication } from 'providers/AuthenticationProvider';
import { useProducts } from 'providers/ProductsProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import numberWithCommas from 'helpers/numberWithCommas';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    order: {
      backgroundColor: '#f5f5f5',
      padding: '16px 24px',
      display: 'flex',
    },
    content: {
      flex: 5,
    },
    itemOrder: {
      display: 'flex',
      gap: '20px',
    },
    infoProduct: {
      display: 'flex',
      gap: '24px',
    },
    time: {
      flex: 1,
    },
    total: {
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const Order = (props) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const { userInfo } = useAuthentication();
  const { listProduct } = useProducts();
  const [listOrder, setListOrder] = useState([]);
  console.log('listOrder: ', listOrder);
  const { data: resData, refetch } = useGetOrders({
    page: 1,
    limit: 1000,
    search: '',
    user_id: userInfo?.id,
  });
  const orders = resData?.data?.data || [];

  const optionStatus = [
    { value: 1, label: 'Đã xác nhận' },
    { value: 2, label: 'Chưa xác nhận' },
    { value: 3, label: 'Đang giao' },
    { value: 4, label: 'Đã giao' },
  ];
  const optionTransaction = [
    { value: 2, label: 'Đã thanh toán' },
    { value: 1, label: 'Chưa thanh toán' },
  ];
  //! Function

  const checkStatus = (status) => {
    const result = optionStatus?.find((item) => item.value === status);
    console.log('result: ', result);
    return result.label;
  };
  const checkPayStatus = (status) => {
    const result = optionTransaction?.find((item) => item.value === status);
    return result.label;
  };

  useEffect(() => {
    const newOrders = cloneDeep(orders);
    const products = cloneDeep(listProduct);
    const currentProduct = [];

    products.map((pro) => {
      pro.product_detail?.map((proDetail) => {
        delete pro.product_detail;
        delete pro.id;
        delete proDetail.amount;
        currentProduct.push({ ...proDetail, ...pro });
      });
    });

    const updatedOrder = newOrders.map((order) => {
      const updatedOrderDetail = order.order_detail.map((detail) => {
        const product = currentProduct.find((item) => item.id === detail.product_detail_id);
        if (product) {
          return { ...detail, ...product };
        }
        return detail;
      });
      return { ...order, order_detail: updatedOrderDetail };
    });

    const reversedOrder = updatedOrder.slice().reverse();
    setListOrder(reversedOrder);
  }, [orders, listProduct]);

  //! Render
  return (
    <div className="profile__right">
      <div
        className="profile__right__user"
        style={{ padding: '30px 10px', display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {listOrder.length === 0 ? (
          <div>Bạn chưa có đơn hàng nào</div>
        ) : (
          listOrder.map((item, index) => (
            <div key={index} className={classes.order}>
              <div className={classes.time}>{moment(item?.created_at).format('DD/MM/YYYY')}</div>
              <div className={classes.content}>
                {item?.order_detail?.map((ele, ind) => (
                  <div className={classes.itemOrder} key={ind}>
                    <div className={classes.infoProduct}>
                      <div className={classes.img}>
                        <img
                          style={{ width: '80px', height: 'auto' }}
                          src={`${BASE_IMAGE}${ele?.image_with_product?.[0]?.image.url}`}
                          alt="sdf"
                        />
                      </div>
                      <div className={classes.info}>
                        <div>{ele?.name}</div>
                        <div>{ele?.color?.name}</div>
                        <div>{ele?.size?.name}</div>
                      </div>
                    </div>
                    <div>Số lượng: {ele?.amount}</div>
                  </div>
                ))}
              </div>
              <div className={classes.total}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div>Trạng thái đơn hàng: {checkStatus(item?.status)}</div>
                  <div>Trạng thái thanh toán: {checkPayStatus(item?.payment_status)}</div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                  Tổng tiền: {numberWithCommas(item?.post_promotion_payment_total)}đ
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
