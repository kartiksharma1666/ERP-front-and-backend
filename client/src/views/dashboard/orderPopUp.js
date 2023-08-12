import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { CButton, CForm } from '@coreui/react';

Modal.setAppElement('#root');

const OrderPopUp = (props) => {
  const [updatedOrder, setUpdatedOrder] = useState({
    orderNumber: "",
    customer: "",
    totalPrice: 0
    
  });

  const [addOrder, setAddOrder] = useState({
    newOrderNumber: "",
    newcustomer: "",
    newTotalPrice: 0,
    // Add other fields for adding an order
  });

  useEffect(() => {
    if (props.edit) {
      setUpdatedOrder({
        orderNumber: props.selectedOrder?.orderNumber,
        customer: props.selectedOrder?.customer,
        totalPrice: props.selectedOrder?.totalPrice
        // Update other fields as needed
      });
    }
  }, [props.edit, props.selectedOrder]);

  const handleToClose = () => {
    props.setIsModalOpen(false);
    props.setEdit(false);
    props.setAddOrder(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeOfAdd = (e) => {
    const { name, value } = e.target;
    setAddOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (order) => {
    fetch(`http://localhost:8080/api/order/delete/${order?._id}`, {
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
    props.setSelectedOrder(null);
    props.setGetData(true); // Assuming you use a similar state to fetch orders
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/order/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      
      
      body: JSON.stringify(updatedData),
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('order updated successfully:', data);
        console.log("inside handleSubmit :",updatedData);
      })
      .catch((error) => {
        console.error('Error updating order:', error);
      });
    props.setEdit(false);
    props.setGetData(true);
    props.setIsModalOpen(false);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Order created successfully:', data);
        } else {
          console.error('Error creating order:', data.error);
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
    props.setAddOrder(false);
    props.setIsModalOpen(false);
    props.setGetData(true);
    setAddOrder({});
  };

  const Content = () => {
    if (props.edit === true) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginBottom: '30px' }}>Order Details</h2>
          <CForm onSubmit={handleSubmit}>
            {props.selectedOrder && (
              <div>
                <p>
                  <label>
                    Order Number
                    <input
                      name="orderNumber"
                      placeholder="Order Number"
                      onChange={handleChange}
                      value={updatedOrder.orderNumber}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    Customer
                    <input
                      name="customer"
                      placeholder="Customer"
                      onChange={handleChange}
                      value={updatedOrder.customer}
                    />
                  </label>
                </p>
                <p>
                  <label>
                    Total Price
                    <input
                      name="totalPrice"
                      placeholder="Total Price"
                      onChange={handleChange}
                      value={updatedOrder.totalPrice}
                    />
                  </label>
                </p>
                {/* Add other order fields as needed */}
                <CButton color="success" shape="rounded-pill" type="submit">
                  Update
                </CButton>
              </div>
            )}
          </CForm>
        </div>
      );
    } else if (props.addOrder) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginBottom: '30px' }}>Enter Order Details</h2>
          <CForm onSubmit={handleAddOrder}>
            <div>
              <p>
                <input
                  name="newOrderNumber"
                  placeholder="Order Number"
                  onChange={handleChangeOfAdd}
                  value={addOrder.newOrderNumber}
                />
              </p>
              <p>
                <input
                  name="newcustomer"
                  placeholder="Customer"
                  onChange={handleChangeOfAdd}
                  value={addOrder.newcustomer}
                />
              </p>
              <p>
                <input
                  name="newTotalPrice"
                  placeholder="Total Price"
                  onChange={handleChangeOfAdd}
                  value={addOrder.newTotalPrice}
                />
              </p>
              {/* Add other order fields as needed */}
              <CButton color="success" shape="rounded-pill" type="submit">
                Add Order
              </CButton>
            </div>
          </CForm>
        </div>
      );
    } else if (props.deletePop) {
      return (
        <div>
          <h2>Confirm Delete</h2>
          <p>
            Are you sure you want to delete the Order with Order Number:{' '}
            {props.selectedOrder && props.selectedOrder.orderNumber}?
          </p>
          <Button onClick={() => handleToClose()} variant="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(props.selectedOrder)} variant="danger" autoFocus>
            Delete
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginBottom: '30px' }}>Order Details</h2>
          {props.selectedOrder && (
            <div>
              <p>Order Number: {props.selectedOrder.orderNumber}</p>
              <p>Total Price: {props.selectedOrder.totalPrice}</p>
              <p>Customer :{props.selectedOrder.customer}</p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={handleToClose}
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
            padding: '40px',
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Translate to center
          },
        }}
      >
        {Content()}
      </Modal>
    </>
  );
};

export default OrderPopUp;
