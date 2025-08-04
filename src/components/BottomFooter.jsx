import React from 'react'
import { Link } from 'react-router-dom'

const BottomFooter = () => {
    return (
        <div className="bottom-footer py-8" style={{backgroundColor: '#299E60'}}>
            <div className="container container-lg">
                <div className="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
                    <p className="bottom-footer__text  text-white">
                        ZaoDirect © 2025. All Rights Reserved{" "}
                    </p>
                    <div className="flex-align gap-8 flex-wrap">
                        <span className="text-heading text-sm">Developed By : </span>
                        <Link style={{color: 'white'}}>TWDL</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BottomFooter