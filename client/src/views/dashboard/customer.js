import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import CustomerPopUp from './customerPopUp';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

 // Function to fetch customer data from the backend API
const getDataFromDB = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/customer/all');
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers); // Update the state with the received customer data
    } else {
      console.error('Failed to fetch customer data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching customer data:', error);
  }
};


  useEffect(() => {
    getDataFromDB();
  }, []);
  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/delete/${selectedCustomer._id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setCustomers(customers.filter((customer) => customer._id !== selectedCustomer._id));
      } else {
        console.error('Error deleting customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    } finally {
      setDeleteConfirmationOpen(false);
      setSelectedCustomer(null);
    }
  };



  // Function to handle showing the CustomerPopUp
  const handleShowCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Function to handle showing the delete confirmation modal
  const handleShowDeleteConfirmation = (customer) => {
    setSelectedCustomer(customer);
    setDeleteConfirmationOpen(true);
  };
  

  // Function to handle closing the delete confirmation modal
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };
  console.log('customers:', customers);

  return (
    <>
      {/* Table to display the list of customers */}
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Customers</strong>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>S.no</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Phone</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {customers.map((customer, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{customer.name}</CTableDataCell>
                  <CTableDataCell>{customer.email}</CTableDataCell>
                  <CTableDataCell>{customer.phone}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => handleShowCustomerDetails(customer)}>
                      View
                    </CButton>
                    

                  </CTableDataCell>
                  <CTableDataCell>
                          <CButton color="success" shape="rounded-pill">
                            Update
                          </CButton>
                        </CTableDataCell>
                  <CTableDataCell>
                          <CButton
                            color="danger"
                            shape="rounded-pill"
                            onClick={() => handleShowDeleteConfirmation(customer)}
                          >
                            Delete
                          </CButton>
                        </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Customer Details PopUp */}
      {isModalOpen && (
        <CustomerPopUp
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedCustomer={selectedCustomer}
        />
      )}

      {/* Delete Confirmation Modal */}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmationOpen && (
        <CustomerPopUp
          isModalOpen={deleteConfirmationOpen}
          setIsModalOpen={handleDeleteConfirmationClose}
          selectedCustomer={selectedCustomer}
          isDeleteConfirmation={true}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </>
  );
};

export default Customer;
