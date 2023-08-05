import React, { useState } from 'react'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'

Modal.setAppElement('#root')
const PopUp = (props) => {
  // Function to close the modal

  const handleToClose = () => {
    props.setIsModalOpen(false)
  }

  //   const openInPopup = item => {
  //     setRecordForEdit(item)
  //     setOpenPopup(true)
  // }
  // const handleViewClick = (product) => {
  //   setSelectedProduct(product)
  //   console.log(product)
  // }
  const handleDeleteConfirmation = (product) => {
    props.setSelectedProduct(product)
    props.setDeleteConfirmationOpen(true)
  }

  const handleDelete = () => {
    // Send the delete request to the API
    axios
      .delete(`http://localhost:8080/api/products/delete/${selectedProduct.id}`)
      .then((response) => {
        console.log(response.data) // Log the response from the server (optional)
        // Update the product list after successful deletion
        setData(data.filter((product) => product.id !== selectedProduct.id))
      })
      .catch((error) => {
        console.error('Error deleting product:', error)
      })
      .finally(() => {
        // Close the delete confirmation modal and clear the selectedProduct state
        setDeleteConfirmationOpen(false)
        setSelectedProduct(null)
      })
  }

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
              <p>Description:{props.selectedProduct.description}</p>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={props.deleteConfirmationOpen}
        onRequestClose={() => props.setDeleteConfirmationOpen(false)}
        contentLabel="Delete Confirmation"
        className="modal"
        overlayClassName="modal-overlay"
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
        <h2>Confirm Delete</h2>
        <p>
          Are you sure you want to delete the product:{' '}
          {props.selectedProduct && props.selectedProduct.name}?
        </p>
        <Button onClick={() => props.setDeleteConfirmationOpen(false)} variant="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="danger" autoFocus>
          Delete
        </Button>
      </Modal>
    </>
  )
}

export default PopUp
