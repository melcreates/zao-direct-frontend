import React from 'react';

const QuantityControl = ({ quantity, onChange }) => {
  return (
    <div className="d-flex align-items-center gap-2" style={{marginLeft: '50px'}}>
      <button onClick={() => onChange(quantity - 1)} className="btn btn-sm btn-outline-secondary" style={{backgroundColor: 'black'}}>-</button>
      <span style={{paddingRight: '10px', paddingLeft: '10px'}}>{quantity}</span>
      <button onClick={() => onChange(quantity + 1)} className="btn btn-sm btn-outline-secondary" style={{backgroundColor: 'black'}}>+</button>
    </div>
  );
};

export default QuantityControl;

