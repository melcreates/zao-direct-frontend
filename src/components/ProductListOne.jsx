import React from 'react';
import { Link } from 'react-router-dom';
import ProductCards from './ProductCards';

const ProductListOne = () => {
    return (
        <div className="product mt-24">
            <div className="container container-lg">
               <ProductCards/> 
            </div>
        </div>

    )
}

export default ProductListOne