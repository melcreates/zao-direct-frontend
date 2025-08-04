import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactSlider from 'react-slider';
import axios from 'axios';
import ProductCardShopPage from './ProductCardShopPage';

const ShopSection = () => {
  const [grid, setGrid] = useState(false);
  const [active, setActive] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const sidebarController = () => {
    setActive(!active);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

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

  useEffect(() => {
    let result = [...products];
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [selectedCategory, products]);

  const toggleCategory = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="shop py-80">
      <div className={`side-overlay ${active && "show"}`}></div>
      <div className="container container-lg">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className={`shop-sidebar ${active && "active"}`}>
              <button onClick={sidebarController} type="button" className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600">
                <i className="ph ph-x" />
              </button>
              <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
                <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Category</h6>
                <ul className="max-h-540 overflow-y-auto scroll-sm">
                  <li className="mb-24">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-gray-900 hover-text-main-600 bg-transparent border-0 ${selectedCategory === null ? 'fw-bold text-main-600' : ''}`}
                    >
                      All
                    </button>
                  </li>
                  {categories.map((cat, index) => (
                    <li className="mb-24" key={index}>
                      <button
                        onClick={() => toggleCategory(cat.category)}
                        className={`text-gray-900 hover-text-main-600 bg-transparent border-0 ${selectedCategory === cat.category ? 'fw-bold text-main-600' : ''}`}
                      >
                        {cat.category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shop-sidebar__box rounded-8">
                <img src="assets/images/thumbs/advertise-img1.png" alt="" />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="col-lg-9">
            <div className="flex-between gap-16 flex-wrap mb-40 ">
              <span className="text-gray-900">Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results</span>
              <div className="position-relative flex-align gap-16 flex-wrap">
                <div className="list-grid-btns flex-align gap-16">
                  <button onClick={() => setGrid(true)} type="button" className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${grid === true && "border-main-600 text-white bg-main-600"}`}>
                    <i className="ph-bold ph-list-dashes" />
                  </button>
                  <button onClick={() => setGrid(false)} type="button" className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${grid === false && "border-main-600 text-white bg-main-600"}`}>
                    <i className="ph ph-squares-four" />
                  </button>
                </div>
              </div>
            </div>
            <ProductCardShopPage products={currentProducts} grid={grid} />
            <ul className="pagination flex-center flex-wrap gap-16">
              <li className="page-item">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100">
                  <i className="ph-bold ph-arrow-left" />
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button onClick={() => setCurrentPage(i + 1)} className="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100">
                    {String(i + 1).padStart(2, '0')}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100">
                  <i className="ph-bold ph-arrow-right" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;

