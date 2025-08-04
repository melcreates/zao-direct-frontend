import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCards12 from './ProductCards12';

const RecommendedOne = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/categories');
        setCategories(res.data.categories);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products');
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0" >Recommended for you</h5>
          <ul className="nav common-tab nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${selectedCategory === 'All' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('All')}
                    id="pills-all-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-all"
                    type="button"
                    role="tab"
                    aria-controls="pills-all"
                    aria-selected="true"
                    style={{
                    border: '1px solid black',
                    borderRadius: '50px',
                    }}
                >
                    All
                </button>
            </li>
            {categories.slice(0,5).map((cat) => (
              <li className="nav-item" role="presentation" key={cat.id || cat.category} >
                <button
                  className={`nav-link ${selectedCategory === cat.category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.category)}
                    style={{
                    border: '1px solid black',
                    borderRadius: '50px',
                    }}
                >
                  {cat.category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-all"
            role="tabpanel"
          >
            <div className="row g-12">
              <ProductCards12 products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedOne;
