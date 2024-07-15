import { Route, Routes } from 'react-router';
import './App.css';
import Xasa from './components/Foods/Xasa';
import Homes from './pages/Home/Homes';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import OrderSummary from './pages/PlaceOrder/OrderSummary';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './components/LoginPop/LoginPopup';
import ExploreMenu from './components/ExploreMenu/ExploreMenu'; // Import ExploreMenu

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [category, setCategory] = useState("All"); // State for category

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='App'>
        <Xasa setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Homes />} />
          <Route path='cart' element={<Cart />} />
          <Route path='order' element={<PlaceOrder />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/explore-menu" element={<ExploreMenu category={category} setCategory={setCategory} />} /> {/* Add ExploreMenu route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
