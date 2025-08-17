import React from "react";

const WhyBecomeBuyer = () => {
  return (
    <section className='why-seller py-80'>
      <div className='container'>
        <div className='section-heading text-center mx-auto'>
          <h5 className=''>Why Register Your Shop on ZaoDirect?</h5>
          <span className='text-gray-600'>
            Get fresh, high-quality produce at fair prices, delivered right to your door, straight from trusted farmers.
          </span>
        </div>
        <div className='row gy-4 justify-content-center'>
          <div className='col-lg-4 col-sm-6'>
            <div className='why-seller-item text-center'>
              <span className='text-main-two-600 text-72 d-inline-flex'>
                <i className='ph ph-gift' />
              </span>
              <h6 className='my-28'>Fresh from the Source</h6>
              <p className='text-gray-600 max-w-392 mx-auto'>
                Enjoy produce that comes directly from farmers, harvested to order, with no long storage times or unnecessary handling.
              </p>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6'>
            <div className='why-seller-item text-center'>
              <span className='text-main-two-600 text-72 d-inline-flex'>
                <i className='ph ph-credit-card' />
              </span>
              <h6 className='my-28'>Fair Prices, No Middlemen</h6>
              <p className='text-gray-600 max-w-392 mx-auto'>
                We connect you directly to the growers, so you get quality goods at competitive prices without the markups.
              </p>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6'>
            <div className='why-seller-item text-center'>
              <span className='text-main-two-600 text-72 d-inline-flex'>
                <i className='ph ph-chats' />
              </span>
              <h6 className='my-28'>Convenient & Reliable Delivery</h6>
              <p className='text-gray-600 max-w-392 mx-auto'>
                Choose your delivery time and location, we’ll make sure your order arrives fresh, on time, and ready to use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBecomeBuyer;
