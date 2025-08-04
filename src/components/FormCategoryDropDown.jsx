import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormCategoryDropdown = ({ selected, onChange }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/categories")
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.categories);
        }
      })
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };

  return (
    <>
      {/* For the form dropdown (select box) */}
      <select
        value={selected}
        onChange={onChange}
        className='js-example-basic-single border border-gray-200 border-end-0'
        name='category'
      >
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.category}
          </option>
        ))}
      </select>


    </>
  );
};

export default FormCategoryDropdown;
