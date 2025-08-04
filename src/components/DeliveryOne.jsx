import React from 'react'
import { Link } from 'react-router-dom'

const DeliveryOne = () => {
    return (
        <div className="delivery-section" style={{ marginTop: '50px', marginBottom: '50px' }}>
  <div className="container container-lg">
    <div
      className="delivery position-relative rounded-16 p-0 overflow-hidden"
      style={{ height: '290px' }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('assets/images/bg/deliveryBg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }}
      />
       {/* Background Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black at 50% opacity
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="d-flex justify-content-center align-items-center w-100 h-100 position-relative"
        style={{ zIndex: 1 }}
      >
        <div className="text-center text-white">
        <h4 className="mb-4 text-white" style={{paddingBottom: '10px'}}>
            Sourcing for Your Store?<br/> ZaoDirect Delivers.
          </h4>
          <p style={{paddingBottom: '20px'}}>Fresh fruits & vegetables from Kenyan farmers to your business</p>
          <Link
            to="/shop"
            className="mt-4 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-2"
          >
            Start Ordering
            <span className="icon text-xl d-flex">
              <i className="ph ph-arrow-right" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>


    )
}

export default DeliveryOne