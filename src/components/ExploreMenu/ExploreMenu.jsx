import React, { useEffect, useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import { useLocation } from 'react-router-dom';

const ExploreMenu = ({ category, setCategory }) => {
  const [filteredMenu, setFilteredMenu] = useState(menu_list);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search')?.toLowerCase() || '';
    const filtered = menu_list.filter(item =>
      item.menu_name.toLowerCase().includes(searchQuery)
    );
    setFilteredMenu(filtered);
  }, [location.search]);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {filteredMenu.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
            className='explore-menu-list-item'
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
