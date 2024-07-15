import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [isInfoFilled, setIsInfoFilled] = useState(true);
  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    const storedOrderSummary = JSON.parse(localStorage.getItem('orderSummary'));
    setOrderSummary(storedOrderSummary);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleProcessToPayment = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, street, city, state, zipCode, country, phone } = deliveryInfo;
    if (!firstName || !lastName || !email || !street || !city || !state || !zipCode || !country || !phone) {
      setIsInfoFilled(false);
    } else {
      setIsInfoFilled(true);
      localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
      console.log('Proceeding to payment with info:', deliveryInfo);
      navigate('/order-summary');
    }
  };

  return (
    <form className='place-order' onSubmit={handleProcessToPayment}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder='First Name'
            value={deliveryInfo.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder='Last Name'
            value={deliveryInfo.lastName}
            onChange={handleInputChange}
          />
        </div>
        <input
          type='text'
          name="email"
          placeholder='Email Address'
          value={deliveryInfo.email}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name="street"
          placeholder='Street'
          value={deliveryInfo.street}
          onChange={handleInputChange}
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder='City'
            value={deliveryInfo.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder='State'
            value={deliveryInfo.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder='Zip Code'
            value={deliveryInfo.zipCode}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="country"
            placeholder='Country'
            value={deliveryInfo.country}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder='Phone'
          value={deliveryInfo.phone}
          onChange={handleInputChange}
        />
        {!isInfoFilled && <p className="error-message">Please fill in all the information.</p>}
      </div>
      <div className="place-order-right">
        {orderSummary && (
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${orderSummary.totalAmount}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${orderSummary.totalAmount === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${orderSummary.totalAmount === 0 ? 0 : orderSummary.totalAmount + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        )}
      </div>
    </form>
  );
}

export default PlaceOrder;
