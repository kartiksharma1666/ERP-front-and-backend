import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'

import { CButton, CForm } from '@coreui/react'

Modal.setAppElement('#root')
const PopUp = (props) => {
  // Function to close the modal

  const [updatedData, setUpdatedData] = useState({})
  const [addData, setAddData] = useState({})

  useEffect(() => {
    if (props.edit) {
      setUpdatedData({
        id: props.selectedProduct._id,
        Name: props.selectedProduct?.name,
        Price: props.selectedProduct?.price,
        Description: props.selectedProduct?.description,
      })
    }
  }, [props])

  const handleToClose = () => {
    props.setIsModalOpen(false)
    props.setEdit(false)
    props.setAddProduct(false)
  }

  //   const openInPopup = item => {
  //     setRecordForEdit(item)
  //     setOpenPopup(true)
  // }
  // const handleViewClick = (product) => {
  //   setSelectedProduct(product)
  //   console.log(product)
  // }

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setUpdatedData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
    console.log(setUpdatedData);
  }
  const handleChangeOfAdd = (e) => {
    const { name, value } = e.target
    console.log(name, value)
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  // handling delete here

  const handleDelete = (product) => {
    // Send the delete request to the API
    fetch(`http://localhost:8080/api/products/delete/${product?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product updated successfully:', data)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error updating product:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })

    // Close the delete confirmation modal and clear the selectedProduct state
    props.setDeletePop(false)
    props.setSelectedProduct(null)
    props.setGetData(true)
  }

  // handling update data here

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/products/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product updated successfully:', data)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error updating product:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })
    props.setAddProduct(false)
    props.setGetData(true)
    props.setIsModalOpen(false)
    props.setEdit(false)
  }

  //handling add product here
  const handleAddProduct = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product created successfully:', data)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error creating product:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })

    props.setAddProduct(false)
    props.setIsModalOpen(false)
    props.setGetData(true)
    setAddData({})
  }

  const popup = {
    marginTop : '25px'
  }

  const inputbox = {
    width: '300px', 
    marginTop: '-5px',
    height: '35px'
  }

  const updatebox ={
    width: '300px', 
    marginTop: '-5px',
    height: '35px',
    marginLeft: '10px'
  }

  //content to be show in pop up
  const Content = () => {
    if (props.edit == true) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginTop: '-15px' }}>Product Details</h2>
          <CForm onSubmit={handleSubmit}>
            {props.selectedProduct && (
              <div>
                <p style={popup}>
                  <label>
                    Name
                    <input style={inputbox}
                      name="Name"
                      placeholder="Name"
                      onChange={handleChange}
                      value={updatedData.Name}
                      className='input-style'
                    />
                  </label>
                </p>
                <p style={popup}>
                  <label>
                    Price
                    <input style={inputbox}
                      name="Price"
                      placeholder="Price"
                      onChange={handleChange}
                      value={updatedData.Price}
                      className='input-style'
                    />
                  </label>
                </p>
                <p style={popup}>
                  <label>
                    Description
                    <input style={inputbox}
                      name="Description"
                      placeholder="Description"
                      onChange={handleChange}
                      value={updatedData.Description}
                      className='input-style'
                    />
                  </label>
                </p>
                <p></p>
                <CButton color="primary"  type="submit">
                  Update
                </CButton>
              </div>
            )}
          </CForm>
        </div>
      )
    } else if (props.addProduct) {
      return (
        <>
          {addData && (
            <div>
              <button className="btn btn-primary close-button" onClick={handleToClose}>
                Close
              </button>
              <h2 style={{ marginTop: '-15px'}}> Enter Product Details</h2>
              <CForm onSubmit={handleAddProduct}>
                <div>
                  <p style={popup}></p>
                  <input style={inputbox}
                    name="Name"
                    placeholder="Name"
                    onChange={handleChangeOfAdd}
                    value={addData.Name}
                    className='input-style'
                  />
                  <p style={popup}></p>
                  <input style={inputbox}
                    name="Price"
                    placeholder="Price"
                    onChange={handleChangeOfAdd}
                    value={addData.Price}
                    className='input-style'
                  />
                  <p style={popup}></p>
                  <input style={inputbox}
                    name="Description"
                    placeholder="Description"
                    onChange={handleChangeOfAdd}
                    value={addData.Description}
                    className='input-style'
                  />
                  <p style={popup}></p>
                  <input style={inputbox}
                    name="Category"
                    placeholder="Category"
                    onChange={handleChangeOfAdd}
                    value={addData.Category}
                    className='input-style'
                  />
                  <p></p>
                  <CButton color="primary"  type="submit" style={{marginTop: '15px'}}>
                    Add Product
                  </CButton>
                </div>
              </CForm>
            </div>
          )}
        </>
      )
    } else if (props.deletePop) {
      return (
        <>
          <h2>Confirm Delete</h2>
          <p>
            Are you sure you want to delete the product:{' '}
            {props.selectedProduct && props.selectedProduct.name}?
          </p>
          <Button style={{ marginTop: '20px', borderRadius: '20px'}}
            onClick={() => {
              props.setDeletePop(false)
              handleToClose()
            }}
            variant="primary"
          >
            Cancel
          </Button>
          <Button
          style={{marginLeft: '20px', marginTop: '20px', borderRadius: '20px'}}
            onClick={() => {
              handleDelete(props.selectedProduct)
              handleToClose()
            }}
            variant="danger"
            autoFocus
          >
            Delete
          </Button>
        </>
      )
    } else {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginBottom: '30px' }}>Product Details</h2>
          {props.selectedProduct && (
            <div style={popup}>
              <p>Name: {props.selectedProduct.name || ""}</p>
              <p>Price: {props.selectedProduct.price || ""} </p>
              <p>Description:{props.selectedProduct.description || ""}</p>

            </div>
          )}
        </div>
      )
    }
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
            height: '400px', // Adjust the height as needed
            maxWidth: '700px', // Limit the maximum width of the modal
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '40px',
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Translate to center
          },
        }}
      >
        {Content()}
      </Modal>
      {/* 
      <Modal
        isOpen={props.deletePop}
        onRequestClose={() => props.setDeletePop(false)}
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
            padding: '40px',
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
        <Button onClick={() => props.setDeletePop(false)} variant="primary">
          Cancel
        </Button>
        <Button onClick={() => handleDelete(props.selectedProduct)} variant="danger" autoFocus>
          Delete
        </Button>
      </Modal> */}
    </>
  )
}

export default PopUp
