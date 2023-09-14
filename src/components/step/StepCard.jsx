import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useEffect, useState } from 'react';
import CartItem from 'components/CartItem/CartItem';
import CommonStyles from 'components/CommonStyles';
import QrPayment from 'components/QrPay/QrPayment';
import { useCart } from 'providers/CartProvider';
import numberWithCommas from 'helpers/numberWithCommas';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useCreateOrder } from 'hooks/order/useCreateOrder';
import { showError, showSuccess } from 'helpers/toast';
import { useCreatePay } from 'hooks/pay/useCreatePay';
import { useNavigate } from 'react-router-dom';
import { RouteBase } from 'constants/routeUrl';

const steps = ['Kiểm tra giỏ hàng', 'Thanh toán'];

export default function StepCard() {
  const { cartItems, removeAllCart } = useCart();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [payMethod, setPayMethod] = useState('0');
  const { mutateAsync: createOrder } = useCreateOrder();
  const { mutateAsync: createPay } = useCreatePay();

  const [orderInfo, setOderInfo] = useState();

  const totalPrice = useMemo(() => {
    let total = 0;
    for (let index = 0; index < cartItems.length; index++) {
      total += cartItems?.[index]?.discount * cartItems?.[index]?.quantity;
    }
    return total;
  }, [cartItems]);

  const handleNext = async () => {
    if (activeStep === 0) {
      try {
        const bodyOrder = cartItems?.map((item) => ({
          product_id: item.id,
          product_detail_id: item.product_detail.id,
          amount: item.quantity,
        }));
        const resOrder = await createOrder(bodyOrder);
        setOderInfo(resOrder?.data?.data);
        showSuccess('Hoàn thành đơn hàng');
        setActiveStep(1);
      } catch (error) {
        console.log('error: ', error);
        showError('Có lỗi xảy ra');
      }
    }
    if (activeStep === 1) {
      if (payMethod === '0') {
        try {
          await createPay({ order_id: orderInfo.id });
          showSuccess('Đặt hàng thành công');
        } catch (error) {
          console.log('error: ', error);
          showError('Có lỗi xảy ra');
        }
      }
      removeAllCart();
      navigate(RouteBase.Home);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleChangePayMethod = (e) => {
    setPayMethod(e.target.value);
  };

  return (
    <div className="container">
      <div className="step-card">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '60vw' }}>
            <Stepper
              sx={{
                padding: '30px 0',
              }}
              activeStep={activeStep}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel
                      sx={{
                        '.MuiStepLabel-labelContainer span ': {
                          fontSize: '16px',
                        },
                      }}
                      {...labelProps}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
        </div>
        {activeStep === 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <CartItem item={item} key={index} delete></CartItem>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                <div>Tổng tiền:</div>
                <div>{numberWithCommas(totalPrice)} đ</div>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Phương thức thanh toán:</div>
                <FormControl>
                  {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    row
                    onChange={handleChangePayMethod}
                  >
                    <FormControlLabel
                      value="0"
                      checked={payMethod === '0'}
                      control={<Radio />}
                      label="Thanh toán bằng ngân hàng"
                    />
                    <FormControlLabel value="1" checked={payMethod === '1'} control={<Radio />} label="Paypal" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        ) : (
          <QrPayment totalPrice={totalPrice} payMethod={payMethod} orderInfo={orderInfo} />
        )}
        <div className="step-card__btn">
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} size="medium" variant="contained">
            Back
          </Button>

          <Button onClick={handleNext} variant="contained" size="medium">
            {activeStep === steps.length - 1 ? 'Finish' : 'Thanh toán'}
          </Button>
        </div>
      </div>
    </div>
  );
}
