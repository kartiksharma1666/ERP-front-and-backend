import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';

Modal.setAppElement('#root');

const PopUp = (props) => {
  // Function to close the modal
  const handleToClose = () => {
    props.setIsModalOpen(false);
  };

  const handleDelete = async () => {
    // Send the delete request to the API
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/delete/${props.selectedProduct.id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // If the response status is within the range 200-299, it means the request was successful
        props.setData(props.data.filter((product) => product.id !== props.selectedProduct.id));
        props.setDeleteConfirmationOpen(false); // Close the delete confirmation modal
        props.setSelectedProduct(null); // Clear the selectedProduct state
      } else {
        // Handle errors here if needed
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={handleToClose}
        contentLabel="Product Modal"
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
          <button onClick={handleToClose}>Close</button>
          <h2>Product Details</h2>
          {props.selectedProduct && (
            <div>
              <p>Name: {props.selectedProduct.name}</p>
              <p>Price: {props.selectedProduct.price} </p>
              <p>Description: {props.selectedProduct.description}</p>
            </div>
          )}
        </div>
      </Modal>

      {props.isDeleteConfirmationOpen && (
        <Modal
          isOpen={props.isDeleteConfirmationOpen}
          onRequestClose={() => props.setDeleteConfirmationOpen(false)}
          contentLabel="Delete Confirmation"
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
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete the product: {props.selectedProduct && props.selectedProduct.name}?
            </p>
            <Button onClick={() => props.setDeleteConfirmationOpen(false)} variant="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="danger" autoFocus>
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PopUp;
