import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import OrderPopUp from './orderPopUp'; // Assuming you have the OrderPopUp component

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch order data from the backend API
  const getDataFromDB = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/order/all');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders); // Update the state with the received order data
      } else {
        console.error('Failed to fetch order data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  // Function to handle showing the OrderPopUp
  const handleShowOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Function to handle showing the delete confirmation modal
  const handleShowDeleteConfirmation = (order) => {
    setSelectedOrder(order);
    setDeleteConfirmationOpen(true);
  };

  // Function to handle closing the delete confirmation modal
  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
  };

  // Function to handle the delete confirmation and API call
  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/delete/${selectedOrder._id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setOrders(orders.filter((order) => order._id !== selectedOrder._id));
      } else {
        console.error('Error deleting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    } finally {
      setDeleteConfirmationOpen(false);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      {/* Table to display the list of orders */}
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Orders</strong>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>S.no</CTableHeaderCell>
                <CTableHeaderCell>Order Number</CTableHeaderCell>
                <CTableHeaderCell>Customer Name</CTableHeaderCell>
                <CTableHeaderCell>Total Amount</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {orders.map((order, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{order.orderNumber}</CTableDataCell>
                  <CTableDataCell>{order.customerName}</CTableDataCell>
                  <CTableDataCell>{order.totalAmount}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" onClick={() => handleShowOrderDetails(order)}>
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
                      onClick={() => handleShowDeleteConfirmation(order)}
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

      {/* Order Details PopUp */}
      {isModalOpen && (
        <OrderPopUp
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedOrder={selectedOrder}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmationOpen && (
        <OrderPopUp
          isModalOpen={deleteConfirmationOpen}
          setIsModalOpen={handleDeleteConfirmationClose}
          selectedOrder={selectedOrder}
          isDeleteConfirmation={true}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
    </>
  );
};

export default Orders;
