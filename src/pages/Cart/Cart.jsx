import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // State to store applied discount

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const applyPromoCode = () => {
    // Example logic to apply promo code discount
    if (promoCode === 'SUMMER20') { // Example promo code
      setDiscount(5); // Example discount amount
    } else {
      // Handle invalid promo code
      alert('Invalid promo code');
    }
  };

  const proceedToCheckout = () => {
    const cartSummary = {
      cartItems: food_list.filter(item => cartItems[item._id] > 0).map(item => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
        total: item.price * cartItems[item._id]
      })),
      totalAmount: getTotalCartAmount(),
      discount,
    };
    localStorage.setItem('orderSummary', JSON.stringify(cartSummary));
    clearCart();
    navigate('/order');
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Render nothing if item is not in cart
        })}
      </div>
      <div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              {discount > 0 && (
                <div className="cart-total-details">
                  <p>Promo Code Discount</p>
                  <p>-${discount}</p>
                </div>
              )}
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2 - discount}</b>
              </div>
              
            </div>
            <button onClick={proceedToCheckout}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className='cart-promocode-input'>
                <input
                  type='text'
                  placeholder='Enter promo code'
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                />
                <button onClick={applyPromoCode}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
