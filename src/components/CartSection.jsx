import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../helper/CartContext';
import QuantityControl from '../helper/QuantityControl';

const CartSection = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              {cartItems.length === 0 ? (
                <p className="text-center text-lg fw-bold">Your cart is empty.</p>
              ) : (
                <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                  <table className="table style-three">
                    <thead>
                      <tr>
                        <th>Delete</th>
                        <th style={{ minWidth: '250px' }}>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <button onClick={() => removeFromCart(item.id)} type="button" className="remove-tr-btn flex-align gap-12 hover-text-danger-600"><i className="ph ph-x-circle text-2xl d-flex" />Remove</button>
                          </td>
                          <td>{item.name}</td>
                          <td>Ksh {item.price}</td>
                          <td>
                            <QuantityControl
                              quantity={item.quantity}
                              onChange={(newQty) => updateQuantity(item.id, newQty)}
                            />
                          </td>
                          <td>Ksh {item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              
            </div>
          </div>

          {/* Sidebar */}
          {cartItems.length > 0 && (
            <div className="col-xl-3 col-lg-4">
              <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
                <h6 className="text-xl mb-32">Cart Totals</h6>
                <div className="bg-color-three rounded-8 p-24">
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two">Subtotal</span>
                    <span className="text-gray-900 fw-semibold">Ksh {total}</span>
                  </div>
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two">Estimated Delivery</span>
                    <span className="text-gray-900 fw-semibold">Free</span>
                  </div>
                  <div className="mb-0 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two">Estimated Tax</span>
                    <span className="text-gray-900 fw-semibold">Ksh 0.00</span>
                  </div>
                </div>
                <div className="bg-color-three rounded-8 p-24 mt-24">
                  <div className="flex-between gap-8">
                    <span className="text-gray-900 text-xl fw-semibold">Total</span>
                    <span className="text-gray-900 text-xl fw-semibold">Ksh {total}</span>
                  </div>
                </div>
                <Link to="/checkout" className="btn btn-main mt-40 py-18 w-100 rounded-8">
                  Proceed to checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartSection;
