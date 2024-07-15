import React, { useEffect, useState } from 'react';
import './OrderSummary.css';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch saved delivery info
    const savedDeliveryInfo = localStorage.getItem('deliveryInfo');
    if (savedDeliveryInfo) {
      setDeliveryInfo(JSON.parse(savedDeliveryInfo));
    }
    
    // Fetch saved order summary
    const savedOrderSummary = localStorage.getItem('orderSummary');
    if (savedOrderSummary) {
      setOrderSummary(JSON.parse(savedOrderSummary));
    }
  }, []);

  const handleOkClick = () => {
    // Clear the saved data if needed
    localStorage.removeItem('deliveryInfo');
    localStorage.removeItem('orderSummary');
    // Navigate to home page
    navigate('/');
  };

  return (
    <div className='order-summary'>
      <h1>Order Summary</h1>
      {deliveryInfo && orderSummary ? (
        <div>
          <div>
            <p><strong>First Name:</strong> {deliveryInfo.firstName}</p>
            <p><strong>Last Name:</strong> {deliveryInfo.lastName}</p>
            <p><strong>Email:</strong> {deliveryInfo.email}</p>
            <p><strong>Street:</strong> {deliveryInfo.street}</p>
            <p><strong>City:</strong> {deliveryInfo.city}</p>
            <p><strong>State:</strong> {deliveryInfo.state}</p>
            <p><strong>Zip Code:</strong> {deliveryInfo.zipCode}</p>
            <p><strong>Country:</strong> {deliveryInfo.country}</p>
            <p><strong>Phone:</strong> {deliveryInfo.phone}</p>
          </div>
          <div>
            <h2>Cart Items</h2>
            {orderSummary.cartItems.map((item) => (
              <div key={item.id}>
                <p><strong>Item:</strong> {item.name}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Total:</strong> ${item.price * item.quantity}</p>
                <hr />
              </div>
            ))}
            </div>
          <button onClick={handleOkClick}>OK</button>
        </div>
      ) : (
        <p>Loading order information...</p>
      )}
    </div>
  );
};

export default OrderSummary;
