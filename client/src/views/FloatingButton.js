import React, { useState } from 'react';
import { MdAdd, MdProductionQuantityLimits } from 'react-icons/md';
import { BiUserPlus } from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FloatingButton = () => {
  const [isBoxActive1, setIsBoxActive1] = useState(false);
  const [isBoxActive2, setIsBoxActive2] = useState(false);
  const [isBoxActive3, setIsBoxActive3] = useState(false);

  const navigate = useNavigate();

  const handleFabClick = () => {
    setIsBoxActive1(true);
    setIsBoxActive2(true);
    setIsBoxActive3(true);
  };

  const handleFabLeave = () => {
    setIsBoxActive1(false);
    setIsBoxActive2(false);
    setIsBoxActive3(false);
  };

  const handleAddCustomerClick = () => {
    navigate('/customer');
  };

  const handleAddProductClick = () => {
    navigate('/dashboard');
  };

  const handleAddBillingClick = () => {
    navigate('/billing');
  };

  return (
    <div>
      <div onMouseOver={handleFabClick} onClick={handleFabLeave} className="fab">
        <button className="fabbtn">
          <MdAdd />
        </button>
      </div>
      <div className={`box ${isBoxActive1 ? 'box-active' : ''}`}>
        <div className="d-flex">
          <span className={`add-customer-span ${isBoxActive1 ? 'show' : ''}`}>Add Customer</span>
          <button className="floatbtn item4" onClick={handleAddCustomerClick}>
            <BiUserPlus />
          </button>
        </div>
      </div>
      <div className={`box ${isBoxActive2 ? 'box-active1' : ''}`} >
        <div className="d-flex" >
          <span className={`add-product-span ${isBoxActive2 ? 'show' : ''}`}>Add Product</span>
          <button className="floatbtn item4" onClick={handleAddProductClick}>
            <MdProductionQuantityLimits />
          </button>
        </div>
      </div>
      <div className={`box ${isBoxActive3 ? 'box-active2' : ''}`} >
        <div className="d-flex" >
          <span className={`add-product-span ${isBoxActive3 ? 'show' : ''}`}>Add Billing</span>
          <button className="floatbtn item4" onClick={handleAddBillingClick}>
            <FaRegMoneyBillAlt />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatingButton;
