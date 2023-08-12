import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { CButton, CForm } from '@coreui/react';

Modal.setAppElement('#root');

const CustomerPopUp = (props) => {
  const [updatedData, setUpdatedData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  
  const [addData, setAddData] = useState({});

  useEffect(() => {
    if (props.edit) {
      console.log("props.edit:", props.edit);
      console.log("props.selectedCustomer:", props.selectedCustomer);
      setUpdatedData({
        id: props.selectedCustomer._id,
        name: props.selectedCustomer?.name,
        phone: props.selectedCustomer?.phone,
        email: props.selectedCustomer?.email,
        address: props.selectedCustomer?.address
        
      });
      
    }
  }, [props.edit, props.selectedCustomer]);
  useEffect(() => {
    console.log("Updated data:", updatedData);
  }, [updatedData]);
  

  const handleToClose = () => {
    props.setIsModalOpen(false);
    props.setEdit(false);
    props.setAddCustomer(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("inside handleChange");
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("updated data :", updatedData);
  };

  const handleChangeOfAdd = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (customer) => {
    fetch(`http://localhost:8080/api/customer/delete/${customer?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Customer deleted successfully:', data);
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });

    props.setDeletePop(false);
    props.setSelectedCustomer(null);
    props.setGetData(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/customer/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      
      
      body: JSON.stringify(updatedData),
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Customer updated successfully:', data);
        console.log("inside handleSubmit :",updatedData);
      })
      .catch((error) => {
        console.error('Error updating customer:', error);
      });

    props.setAddCustomer(false);
    props.setGetData(true);
    props.setIsModalOpen(false);
    props.setEdit(false);
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:8080/api/customer/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Customer created successfully:', data);
        } else {
          console.error('Error creating customer:', data.error);
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
  
    props.setAddCustomer(false);
    props.setIsModalOpen(false);
    props.setGetData(true);
    setAddData({});
  };
  


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
                      name="name"
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
                      name="email"
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
                      name="phone"
                      placeholder="Phone no"
                      onChange={handleChange}
                      value={updatedData.phone}
                    />
                  </label>
                  <label>
                    Address
                    <input
                      name="address"
                      placeholder="Address"
                      onChange={handleChange}
                      value={updatedData.address}
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
                    name="name"
                    placeholder="Name"
                    onChange={handleChangeOfAdd}
                    value={addData.name}
                  />
                  <p></p>
                  <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChangeOfAdd}
                    value={addData.email}
                  />
                  <p></p>
                  <input
                    name="phone"
                    placeholder="Phone no"
                    onChange={handleChangeOfAdd}
                    value={addData.phone}
                  />
                  <p></p>
                  <input
                    name="address"
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

export default CustomerPopUp
