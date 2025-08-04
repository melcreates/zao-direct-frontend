import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchBar({ category }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownResults, setDropdownResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (value.trim() === '') {
        setDropdownResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const queryParams = new URLSearchParams({
          search: value,
          ...(category && { category }), // add category filter if provided
        });

        const response = await axios.get(`http://localhost:5000/products?${queryParams.toString()}`);
        setDropdownResults((response.data.products || []).slice(0,6));
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 300); // debounce delay
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-form__wrapper position-relative" ref={containerRef} style = {{zIndex: '1'}}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44"
      />

      <button
        type="submit"
        className="w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
      >
        <i className="ph ph-magnifying-glass" />
      </button>

      {showDropdown && (
        <div className="absolute z-50 bg-white border border-gray-300 rounded mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
          {dropdownResults.length > 0 ? (
            <ul>
              {dropdownResults.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate(`/product-details/${product.id}`);
                    setShowDropdown(false);
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
