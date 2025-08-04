import React from 'react'
import { Link } from 'react-router-dom';
import CategoryCards from './CategoryCards';

const FeatureOne = () => {

    
    return (
        <div className="feature" id="featureSection" style={{marginBottom: '100px'}}>
            <div className="container container-lg">
                <div className="position-relative arrow-center">
                    <div className="flex-align">
                        <button
                            type="button"
                            id="feature-item-wrapper-prev"
                            className="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
                        >
                            <i className="ph ph-caret-left" />
                        </button>
                        <button
                            type="button"
                            id="feature-item-wrapper-next"
                            className="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
                        >
                            <i className="ph ph-caret-right" />
                        </button>
                    </div>
                   <CategoryCards/>
                </div>
            </div>
        </div>

    )
}

export default FeatureOne