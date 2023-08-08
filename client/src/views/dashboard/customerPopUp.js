import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

Modal.setAppElement('#root');

const CustomerPopUp = (props) => {
  const handleDelete = async () => {
    // Send the delete request to the API
    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/delete/${props.selectedCustomer.id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // If the response status is within the range 200-299, it means the request was successful
        props.setData(props.data.filter((customer) => customer.id !== props.selectedCustomer.id));
        props.setDeleteConfirmationOpen(false); // Close the delete confirmation modal
        props.setSelectedCustomer(null); // Clear the selectedCustomer state
      } else {
        // Handle errors here if needed
        console.error('Error deleting customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={() => {
          props.setIsModalOpen(false);
          props.setSelectedCustomer(null); // Clear the selectedCustomer state when the modal is closed
        }}
        contentLabel="Customer Modal"
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
          <h2>Customer Details</h2>
          {props.selectedCustomer && (
            <div>
              <p>Name: {props.selectedCustomer.name}</p>
              <p>Email: {props.selectedCustomer.email} </p>
              <p>Phone: {props.selectedCustomer.phone} </p>
              <p>Address: {props.selectedCustomer.address} </p>
            </div>
          )}
          <button onClick={() => props.setIsModalOpen(false)}>Close</button>
        </div>
        {props.isDeleteConfirmation && (
          <div>
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete the customer:{' '}
              {props.selectedCustomer && props.selectedCustomer.name}?
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

export default CustomerPopUp;
