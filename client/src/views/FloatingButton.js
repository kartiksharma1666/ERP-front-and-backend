import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { BiUserPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const [isBoxActive, setIsBoxActive] = useState(false);
  const navigate = useNavigate(); // Updated hook

  const handleFabClick = () => {
    setIsBoxActive(true);
  };

  const handleFabClick2 = () => {
    setIsBoxActive(false);
  };

  const handleAddCustomerClick = () => {
    // Navigate to the '/customer' route when the "Add Customer" button is clicked
    navigate('/customer');
  };

  const handleAddProductClick = () => {
    // Navigate to the '/add-product' route when the "Add Product" button is clicked
    navigate('/dashboard');
  };

  const handleBillingClick = () => {
    // Navigate to the '/billing' route when the "Billing" button is clicked
    navigate('/billing');
  };

  return (
    <div>
      <div onMouseOver={handleFabClick} onMouseOut={handleFabClick2} className="fab">
        <button style={{ marginBottom: '-50px' }} className="fabbtn">
          <MdAdd />
        </button>
      </div>
      <div
        style={{ marginBottom: '-40px' }}
        onMouseOver={handleFabClick}
        className={`box ${isBoxActive ? 'box-active' : ''}`}
      >
        <div className="d-flex">
          <span className={`add-customer-span ${isBoxActive ? 'show' : ''}`}>Add Customer</span>
          <button className="floatbtn item4" onClick={handleAddCustomerClick}>
            <BiUserPlus />
          </button>
        </div>
        <div className="d-flex">
          <span className={`add-product-span ${isBoxActive ? 'show' : ''}`}>Add Product</span>
          <button className="floatbtn item4" onClick={handleAddProductClick}>
            {/* Add Product Icon */}
          </button>
        </div>
        <div className="d-flex">
          <span className={`billing-span ${isBoxActive ? 'show' : ''}`}>Billing</span>
          <button className="floatbtn item4" onClick={handleBillingClick}>
            {/* Billing Icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;
