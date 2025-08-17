import React from "react";

const BuyerStepsSection = () => {
  return (
    <section className='step py-80'>
      <div className='position-relative z-1'>
        <img
          src='assets/images/shape/curve-line-shape.png'
          alt=''
          className='position-absolute top-0 inset-inline-end-0 z-n1 me-60 d-lg-block d-none'
        />
        <div className='container container-lg'>
          <div className='row gy-4'>
            <div className='col-lg-6'>
              <div className='step-content'>
                <div className='section-heading ms-auto text-end'>
                  <h5 className=''> Shop Fresh Produce Directly from Farmers</h5>
                  <span className='text-gray-600'>
                    Skip the middleman and get high-quality, locally sourced produce delivered to your doorstep or business.  
                    Join ZaoDirect and enjoy transparency, freshness, and fair prices.
                  </span>
                </div>
                <div className='d-flex flex-column align-items-end gap-56'>
                  <div className='d-flex align-items-center gap-32'>
                    <div className='text-end'>
                      <h5 className='mb-8'>Step 01</h5>
                      <p className='text-gray-600'>
                        Sign up as a Buyer on ZaoDirect — it’s quick and free.
                      </p>
                    </div>
                    <div className='w-90 h-90 flex-center bg-main-two-100 rounded-circle'>
                      <h6 className='mb-0 w-60 h-60 bg-main-two-600 text-white d-flex align-items-center justify-content-center rounded-circle border border-5 border-white fw-medium'>
                        01
                      </h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-32'>
                    <div className='text-end'>
                      <h5 className='mb-8'>Step 02</h5>
                      <p className='text-gray-600'>
                        {" "}
                        Browse fresh produce from verified farmers and select what you need.
                      </p>
                    </div>
                    <div className='w-90 h-90 flex-center bg-main-two-100 rounded-circle'>
                      <h6 className='mb-0 w-60 h-60 bg-main-two-600 text-white d-flex align-items-center justify-content-center rounded-circle border border-5 border-white fw-medium'>
                        02
                      </h6>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-32'>
                    <div className='text-end'>
                      <h5 className='mb-8'>Step 03</h5>
                      <p className='text-gray-600'>
                        Place your order and get it delivered directly to you — fresh and on time.
                      </p>
                    </div>
                    <div className='w-90 h-90 flex-center bg-main-two-100 rounded-circle'>
                      <h6 className='mb-0 w-60 h-60 bg-main-two-600 text-white d-flex align-items-center justify-content-center rounded-circle border border-5 border-white fw-medium'>
                        03
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='text-center'>
                <img src='assets/images/thumbs/shop.png' alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerStepsSection;
