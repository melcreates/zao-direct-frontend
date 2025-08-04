import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FarmerCards() {
  const [farmers, setFarmers] = useState([]);
  const [productsByFarmer, setProductsByFarmer] = useState({}); // ✅ use object

  useEffect(() => {
    const fetchFarmersAndProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/farmers');
        const farmersData = response.data.farmers || [];
        setFarmers(farmersData);

        const productRequests = farmersData.map((farmer) =>
          axios.get(`http://localhost:5000/farmers/${farmer.id}`)
        );

        const productResponses = await Promise.all(productRequests);

        const productMap = {};
        productResponses.forEach((res, index) => {
          const farmerId = farmersData[index].id;
          productMap[farmerId] = res.data.products || [];
        });

        setProductsByFarmer(productMap);
      } catch (err) {
        console.error('Failed to fetch farmers or products:', err);
      }
    };

    fetchFarmersAndProducts();
  }, []);

  return (
    <div className="row gy-4 vendor-card-wrapper">
      {farmers.slice(0, 8).map((farmer, index) => (
        <div key={farmer.id} className="col-xxl-3 col-lg-4 col-sm-6">
          <div className="vendor-card text-center px-16 pb-24">
            <div>
              <img
                src="assets/images/thumbs/vendor-logo1.png"
                alt=""
                className="vendor-card__logo m-12"
              />
              <h6 className="title mt-32">{farmer.full_name}</h6>
              <span className="text-heading text-sm d-block">Delivery by 6:15am</span>
              <Link
                to="/shop"
                className="btn btn-main-two rounded-pill py-6 px-16 text-12 mt-8"
              >
                $5 off Snack &amp; Candy
              </Link>
            </div>
            <div className="vendor-card__list mt-22 flex-center flex-wrap gap-8">
              {(productsByFarmer[farmer.id] || []).slice(0, 5).map((product, idx) => (
                <div key={idx} className="vendor-card__item bg-white rounded-circle flex-center">
                  <img
                    src={product.image || 'assets/images/thumbs/vendor-img1.png'}
                    alt={product.name || 'Product'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FarmerCards;
