import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
function ShippingScreen() {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
        <CheckoutSteps step1="step1" step2="step2"/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter Address' 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter City' 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter PostalCode' 
            value={postalCode} 
            onChange={(e) => setPostalCode(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId='country' className='my-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter Country' 
            value={country} 
            onChange={(e) => setCountry(e.target.value)} 
            required 
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;

