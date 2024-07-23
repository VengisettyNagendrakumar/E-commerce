import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label={
                <>
                  <i className="fab fa-paypal me-2"></i>
                  PayPal or Credit Card
                </>
              }
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === 'PayPal'}
              onChange={handlePaymentMethodChange}
            />
          </Col>
          <Col className="my-3">
            <Form.Check
              type="radio"
              label={
                <>
                
               <i class="fas fa-money-check"></i>
                  Phone Pay
                </>
              }
              id="phone-pay"
              name="paymentMethod"
              value="Phone Pay"
              checked={paymentMethod === 'Phone Pay'}
              onChange={handlePaymentMethodChange}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label={
                <>
                <i class="fa-brands fa-google-pay"></i>
                  Google Pay
                </>
              }
              id="google-pay"
              name="paymentMethod"
              value="Google Pay"
              checked={paymentMethod === 'Google Pay'}
              onChange={handlePaymentMethodChange}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
