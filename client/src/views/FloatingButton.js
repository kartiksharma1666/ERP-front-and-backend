import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { BiUserPlus } from 'react-icons/bi';

const FloatingButton = () => {
  const [isBoxActive, setIsBoxActive] = useState(false);

  const handleFabClick = () => {
    setIsBoxActive(!isBoxActive);
  };

  return (
    <div>
      <div className='fab'>
        <button onClick={handleFabClick} className='fabbtn'>
          <MdAdd />
        </button>
      </div>
      <div className={`box ${isBoxActive ? 'box-active' : ''}`}>
        <div className='d-flex'>
          <span className={`add-customer-span ${isBoxActive ? 'show' : ''}`}>Add Customer</span>
          <button className='floatbtn item4'>
            <BiUserPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingButton;
