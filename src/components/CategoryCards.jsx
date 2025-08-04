import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';

function CategoryCards(){
    const [categories, setCategories] = useState([]);

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-right" />
            </button>
        );
    }
    function SamplePrevArrow(props) {
        const { className, onClick } = props;

        return (

            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 10,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1699,
                settings: {
                    slidesToShow: 9,
                },
            },
            {
                breakpoint: 1599,
                settings: {
                    slidesToShow: 8,
                },
            },
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 424,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 359,
                settings: {
                    slidesToShow: 1,
                },
            },

        ],
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

    return<div className="feature-item-wrapper">
                <Slider {...settings}>
                    {categories.map((cat, index) => (
                        <div className="feature-item text-center" key={index}>
                            <div className="feature-item__thumb rounded-circle">
                            <Link to="/shop" className="w-100 h-100 flex-center">
                                <img src={cat.image_url} alt={cat.category} />
                            </Link>
                            </div>
                            <div className="feature-item__content mt-16">
                            <h6 className="text-lg mb-8">
                                <Link to="/shop" className="text-inherit">
                                {cat.category}
                                </Link>
                            </h6>
                            <span className="text-sm text-gray-400">125+ Products</span>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

}

export default CategoryCards;
