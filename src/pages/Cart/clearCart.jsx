import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <StoreContext.Provider value={{ cartItems, setCartItems, clearCart }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
