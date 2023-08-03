import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const ProductPopup = ({ product, onClose }) => {
  return (
    <CModal show={true} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Name</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Price: {product.price}</p>
        {/* Add other product details here */}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ProductPopup;
