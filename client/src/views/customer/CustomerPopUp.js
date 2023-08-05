import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

 const CustomerPopUp = ({customers, onClose }) => {
    return (
        <div>
            <CModal show={true} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Name</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Name: {customers.name}</p>
        <p>Country: {customers.country}</p>
        <p>Age: {customers.Age}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
        </div>
    )
}
export default CustomerPopUp