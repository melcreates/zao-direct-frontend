import React from 'react'
import { Link } from 'react-router-dom'
import FarmerCards from './FarmerCards'

const TopVendorsOne = () => {
    return (
        <section className="top-vendors py-80">
            <div className="container container-lg">
                <div className="section-heading">
                    <div className="flex-between flex-wrap gap-8">
                        <h5 className="mb-0">Weekly Top Farmers</h5>
                        <Link
                            to="/shop"
                            className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                        >
                            All Farmers
                        </Link>
                    </div>
                </div>
                <FarmerCards/>
            </div>
        </section>

    )
}

export default TopVendorsOne