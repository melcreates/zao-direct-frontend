import React  from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../helper/CartContext";

function ProductCardShopPage({products, grid}){
const { addToCart } = useCart();

  return <div className={`list-grid-wrapper ${grid && "list-view"}`}>
    {products.map((product, index)=>(
        <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
            <Link
                to="/product-details-two"
                className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
            >
                <img
                    src="assets/images/thumbs/product-two-img1.png"
                    alt=""
                    className="w-auto max-w-unset"
                />
                
            </Link>
            <div className="product-card__content mt-16">
                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                    <Link
                        to="/product-details-two"
                        className="link text-line-2"
                        tabIndex={0}
                    >
                        {product.name}
                    </Link>
                </h6>
                <div className="flex-align mb-20 mt-16 gap-6">
                    <span className="text-xs fw-medium text-gray-500">4.8</span>
                    <span className="text-15 fw-medium text-warning-600 d-flex">
                        <i className="ph-fill ph-star" />
                    </span>
                    <span className="text-xs fw-medium text-gray-500">(17k)</span>
                </div>
                <div className="mt-8">
                    <div
                        className="progress w-100 bg-color-three rounded-pill h-4"
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow={35}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className="progress-bar bg-main-two-600 rounded-pill"
                            style={{ width: "35%" }}
                        />
                    </div>
                    <span className="text-gray-900 text-xs fw-medium mt-8">
                        {product.is_available? "Available" : "Sold Out"}
                    </span>
                </div>
                <div className="product-card__price my-20">
                    <span className="text-heading text-md fw-semibold ">
                        {product.price} <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                    </span>
                </div>
                <Link
                    to="/cart"
                    className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                    tabIndex={0}
                    onClick={() => addToCart(product)}
                >
                    Add To Cart <i className="ph ph-shopping-cart" />
                </Link>
            </div>
        </div>
    ))}
    
  </div>
  


}

export default ProductCardShopPage;