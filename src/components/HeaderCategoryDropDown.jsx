import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HeaderCategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(false);
  const [activeIndexCat, setActiveIndexCat] = useState(null);

  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };

  const handleCatClick = (index) => { 
    setActiveIndexCat(index === activeIndexCat ? null : index);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data.categories || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='category on-hover-item'>
      <button
        onClick={handleCategoryToggle}
        type='button'
        className='category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-heading'
      >
        <span className='icon text-2xl d-xs-flex d-none'>
          <i className='ph ph-dots-nine' />
        </span>
        <span className='d-sm-flex d-none'>All</span> Categories
        <span className='arrow-icon text-xl d-flex'>
          <i className='ph ph-caret-down' />
        </span>
      </button>

      <div
        className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper ${
          activeCategory ? 'active' : ''
        }`}
      >
        <button
          onClick={() => {
            handleCategoryToggle();
            setActiveIndexCat(null);
          }}
          type='button'
          className='close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex'
        >
          <i className='ph ph-x' />
        </button>


        <ul className='scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto'>
          {categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => handleCatClick(index)}
              className={`has-submenus-submenu ${
                activeIndexCat === index ? 'active' : ''
              }`}
            >
              <Link
                to='#'
                className='text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0'
              >
                <span className='text-xl d-flex'>
                  <i className='ph ph-brandy' />
                </span>
                <span>{cat.category}</span>
                <span className='icon text-md d-flex ms-auto'>
                  <i className='ph ph-caret-right' />
                </span>
              </Link>
              <div
                className={`submenus-submenu py-16 ${
                  activeIndexCat === index ? 'open' : ''
                }`}
              >
                <h6 className='text-lg px-16 submenus-submenu__title'>
                  {cat.category}
                </h6>
                {/* You can fetch and map subcategories here if needed */}
                <ul className='submenus-submenu__list max-h-300 overflow-y-auto scroll-sm'>
                  <li><Link to='/shop'>Sample Item</Link></li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderCategoryDropdown;

