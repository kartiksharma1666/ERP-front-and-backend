import React, { useState } from 'react';
import { MdAdd,MdProductionQuantityLimits } from 'react-icons/md';
import { BiUserPlus } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

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
        <button  className="fabbtn">
          <MdAdd />
        </button>
      </div>
      <div
      
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
         <MdProductionQuantityLimits />
          </button>
        </div>
        <div className="d-flex" style={{marginBottom: '20px'}}>
          <span className={`billing-span ${isBoxActive ? 'show' : ''}`}>Billing</span>
          <button className="floatbtn item4" onClick={handleBillingClick}>
             <FaRegMoneyBillAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;