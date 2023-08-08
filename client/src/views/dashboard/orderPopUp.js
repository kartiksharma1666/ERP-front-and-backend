import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

Modal.setAppElement('#root');

const OrderPopUp = (props) => {
  const handleDelete = async () => {
    // Send the delete request to the API
    try {
      const response = await fetch(
        `http://localhost:8080/api/orders/delete/${props.selectedOrder.id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // If the response status is within the range 200-299, it means the request was successful
        props.setData(props.data.filter((order) => order.id !== props.selectedOrder.id));
        props.setDeleteConfirmationOpen(false); // Close the delete confirmation modal
        props.setSelectedOrder(null); // Clear the selectedOrder state
      } else {
        // Handle errors here if needed
        console.error('Error deleting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={() => {
          props.setIsModalOpen(false);
          props.setSelectedOrder(null); // Clear the selectedOrder state when the modal is closed
        }}
        contentLabel="Order Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            width: '50%', // Adjust the width as needed
            maxHeight: '80%', // Adjust the height as needed
            maxWidth: '800px', // Limit the maximum width of the modal
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Translate to center
          },
        }}
      >
        <div>
          <h2>Order Details</h2>
          {props.selectedOrder && (
            <div>
              <p>Order Number: {props.selectedOrder.orderNumber}</p>
              <p>Customer Name: {props.selectedOrder.customerName} </p>
              <p>Total Amount: {props.selectedOrder.totalAmount} </p>
              {/* Add other order details as needed */}
            </div>
          )}
          <button onClick={() => props.setIsModalOpen(false)}>Close</button>
        </div>
        {props.isDeleteConfirmation && (
          <div>
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete the order:{' '}
              {props.selectedOrder && props.selectedOrder.orderNumber}?
            </p>
            <Button onClick={() => props.setDeleteConfirmationOpen(false)} variant="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="danger" autoFocus>
              Delete
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OrderPopUp;
