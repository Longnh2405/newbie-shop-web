import React, { useEffect, useState } from 'react';
import qrPay from 'assets/images/qr_long.jpg';
import numberWithCommas from 'helpers/numberWithCommas';
import { PayPalButton } from 'react-paypal-button-v2';
import { showError, showSuccess } from 'helpers/toast';
import { roundingNumber } from 'helpers';
import { useCreatePay } from 'hooks/pay/useCreatePay';
import { useCart } from 'providers/CartProvider';

const QrPayment = ({ totalPrice, payMethod, orderInfo }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const { mutateAsync: createPay } = useCreatePay();
  const { removeAllCart } = useCart();

  const addPaypalScript = async () => {
    // const data=await
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://www.paypal.com/sdk/js?client-id=ARFCwQsfxxDpC_-g7S7u6Xd6xxVRWezQwbkJHm0XA9iDNtNDnmUSP1W1MSuoMO_sl9sMxx-PipjSZcBO';
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPaypal = async (details, data) => {
    try {
      const bodyPay = {
        order_id: orderInfo?.id,
        details,
        data,
      };
      await createPay(bodyPay);
      showSuccess('Thanh toán bằng Paypal thành công');
      removeAllCart();
    } catch (error) {
      console.log('error: ', error);
      showSuccess('Có lỗi xảy ra');
    }
  };
  const onErrorPaypal = (err) => {
    console.log('err: ', err);
    showError('Thanh toán Paypal lỗi');
  };
  return (
    <div className="qr-payment">
      <div className="left">
        <h3 className="title">Thông tin đơn hàng</h3>
        <div className="box-payment">
          <div className="label">Số tiền thanh toán</div>
          <div className="content">{numberWithCommas(orderInfo?.post_promotion_payment_total || 0)}đ</div>
        </div>
        <div className="box-payment">
          <div className="label">Giá trị đơn hàng</div>
          <div className="content">{numberWithCommas(orderInfo?.pre_promotion_payment_total || 0)}đ</div>
        </div>
        <div className="box-payment">
          <div className="label">Phí giao dịch</div>
          <div className="content">0 VND</div>
        </div>
        <div className="box-payment">
          <div className="label">Mã đơn hàng</div>
          <div className="content">{orderInfo?.id || 0}</div>
        </div>
        <div className="box-payment">
          <div className="label">Nhà cung cấp</div>
          <div className="content">CÔNG TY CỔ PHẦN THƯƠNG MẠI LONG NH</div>
        </div>
      </div>

      {payMethod === '0' && (
        <div
          className="right"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3 className="title">Quét mã qua ứng dụng Ngân hàng/ Ví điện tử</h3>
          <div className="content">
            <img src={qrPay} alt="" />
          </div>
        </div>
      )}
      {payMethod === '1' && (
        // && sdkReady
        <div className="right" style={{ flex: '1', padding: '20px' }}>
          <PayPalButton
            amount={roundingNumber(totalPrice)}
            currency="USD"
            onSuccess={onSuccessPaypal}
            onError={onErrorPaypal}
          />
        </div>
      )}
    </div>
  );
};

export default QrPayment;
