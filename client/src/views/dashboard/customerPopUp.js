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
        id: props.selectedCustomer._id,
        name: props.selectedCustomer?.name,
        email: props.selectedCustomer?.email,
        phone: props.selectedCustomer?.phone,
        address: props.selectedCustomer?.address
      })
    }
  }, [props])

  const handleToClose = () => {
    props.setIsModalOpen(false)
    props.setEdit(false)
    props.setAddCustomer(false)
  }

  //   const openInPopup = item => {
  //     setRecordForEdit(item)
  //     setOpenPopup(true)
  // }
  // const handleViewClick = (Customer) => {
  //   setSelectedCustomer(Customer)
  //   console.log(Customer)
  // }

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   console.log(name, value)
  //   setUpdatedData((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     }
  //   })
  // }
  const handleChange = (e) => {
    
    const { name, value } = e.target
    console.log(name, value)
    setUpdatedData((up)=>{
      return {
        ...up,
        [name]: value,
      }
    })
    
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

  const handleDelete = (customer) => {
    // Send the delete request to the API
    fetch(`http://localhost:8080/api/customer/delete/${customer?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Customer updated successfully:', data)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error updating customer:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })

    // Close the delete confirmation modal and clear the selectedCustomer state
    props.setDeletePop(false)
    props.setSelectedCustomer(null)
    props.setGetData(true)
  }

  // handling update data here

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/customer/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Customer updated successfully:', data)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error updating Customer:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })
    props.setAddCustomer(false)
    props.setGetData(true)
    props.setIsModalOpen(false)
    props.setEdit(false)
  }

  //handling add Customer here
  const handleAddCustomer = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/api/customer/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Customer created successfully:', data)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error creating Customer:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })

    props.setAddCustomer(false)
    props.setIsModalOpen(false)
    props.setGetData(true)
    setAddData({})
  }

  //content to be show in pop up
  const Content = () => {
    if (props.edit == true) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginBottom: '30px' }}>Customer Details</h2>
          <CForm onSubmit={handleSubmit}>
            {props.selectedCustomer && (
              <div>
                <p>
                  <label>
                    Name
                    <input
                      name="Name"
                      placeholder="Name"
                      onChange={handleChange}
                      value={updatedData.name}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    Email
                    <input
                      name="Email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={updatedData.email}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    Phone
                    <input
                      name="Phone"
                      placeholder="Phone no"
                      onChange={handleChange}
                      value={updatedData.phone}
                    />
                  </label>
                </p>
                <p></p>
                <CButton color="success" shape="rounded-pill" type="submit">
                  Update
                </CButton>
              </div>
            )}
          </CForm>
        </div>
      )
    } else if (props.addCustomer) {
      return (
        <>
          {addData && (
            <div>
              <button className="btn btn-primary close-button" onClick={handleToClose}>
                Close
              </button>
              <h2 style={{ marginBottom: '30px' }}> Enter Customer Details</h2>
              <CForm onSubmit={handleAddCustomer}>
                <div>
                  <p></p>
                  <input
                    name="Name"
                    placeholder="Name"
                    onChange={handleChangeOfAdd}
                    value={addData.Name}
                  />
                  <p></p>
                  <input
                    name="Email"
                    placeholder="Email"
                    onChange={handleChangeOfAdd}
                    value={addData.email}
                  />
                  <p></p>
                  <input
                    name="Phone"
                    placeholder="Phone no"
                    onChange={handleChangeOfAdd}
                    value={addData.phone}
                  />
                  <p></p>
                  <input
                    name="Address"
                    placeholder="Address"
                    onChange={handleChangeOfAdd}
                    value={addData.address}
                  /> 
                  <p></p>
                  <CButton color="success" shape="rounded-pill" type="submit">
                    Add Customer
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
            Are you sure you want to delete the Customer:{' '}
            {props.selectedCustomer && props.selectedCustomer.name}?
          </p>
          <Button
            onClick={() => {
              props.setDeletePop(false)
              handleToClose()
            }}
            variant="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(props.selectedCustomer)
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
          <h2 style={{ marginBottom: '30px' }}>Customer Details</h2>
          {props.selectedCustomer && (
            <div>
              <p>Name: {props.selectedCustomer.name}</p>
              <p>Email: {props.selectedCustomer.email} </p>
              <p>Phone:{props.selectedCustomer.phone}</p>
              <p>Address:{props.selectedCustomer.address}</p>
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
            padding: '40px',
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Translate to center
          },
        }}
      >
        <h2>Confirm Delete</h2>
        <p>
          Are you sure you want to delete the Customer:{' '}
          {props.selectedCustomer && props.selectedCustomer.name}?
        </p>
        <Button onClick={() => props.setDeletePop(false)} variant="primary">
          Cancel
        </Button>
        <Button onClick={() => handleDelete(props.selectedCustomer)} variant="danger" autoFocus>
          Delete
        </Button>
      </Modal> */}
    </>
  )
}

export default PopUp
