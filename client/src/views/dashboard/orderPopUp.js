import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { CButton, CForm } from '@coreui/react';

Modal.setAppElement('#root');

const OrderPopUp = (props) => {
  const [updatedOrder, setUpdatedOrder] = useState({
    orderNumber: "",
    customerName: "",
    totalAmount: "",
    OrderStatus: "",
    OrderMedium: ""
  });

  const [addOrder, setAddOrder] = useState({
    neworderNumber: "",
    newcustomerName: "",
    newtotalAmount: "",
    OrderStatus: "",
    OrderMedium: ""
    // Add other fields for adding an order
  });

  useEffect(() => {
    if (props.edit) {
      setUpdatedOrder({
        orderNumber: props.selectedOrder?.orderNumber,
        customerName: props.selectedOrder?.customerName,
        totalAmount: props.selectedOrder?.totalAmount,
        OrderStatus: props.selectedOrder?.OrderStatus,
        OrderMedium: props.selectedOrder?.OrderMedium
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
        console.log('customerName deleted successfully:', data);
      })
      .catch((error) => {
        console.error('Error deleting customerName:', error);
      });
    props.setDeletePop(false);
    props.setSelectedOrder(null);
    props.setIsModalOpen(false);
    props.setGetData(true); // Assuming you use a similar state to fetch orders
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/order/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      
      
      body: JSON.stringify(updatedOrder),
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('order updated successfully:', data);
        console.log("inside handleSubmit :",updatedOrder);
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

    //new order data from the addOrder state
    const newOrder = {
      orderNumber: addOrder.neworderNumber,
      customerName: addOrder.newcustomerName,
      totalAmount: addOrder.newtotalAmount,
      OrderStatus: addOrder.OrderStatus,
      OrderMedium: addOrder.OrderMedium
    };

    console.log("add Order :", addOrder);
  
    fetch('http://localhost:8080/api/order/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        newOrder
       ),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Order created successfully:', data);
         //Refresh the data by triggering a getData action
         props.setGetData(true);
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
    setAddOrder({
      neworderNumber: "",
      newcustomerName: "",
      newtotalAmount: "",
      OrderStatus: "",
      OrderMedium: ""
    });
  };
  
  // const popup = {
  //   marginTop : '25px'
  // }

  // const inputbox = {
  //   width: '50%', 
  //   marginTop: '-5px',
  //   height: '35px',
  // }

  // const updatebox ={
  //   width: '300px', 
  //   marginTop: '-5px',
  //   height: '35px',
  //   marginLeft: '10px'
  // }

  const Content = () => {
    if (props.edit === true) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginTop: '-15px' }}>Order Details</h2>
          <CForm onSubmit={handleSubmit}>
            {props.selectedOrder && (
              <div>
                <p className='popup'>
                  <label>
                    Order Number
                    <input className='inputbox'
                      name="orderNumber"
                      placeholder="Order Number"
                      onChange={handleChange}
                      value={updatedOrder.orderNumber}
                      
                    />
                  </label>
                </p>
                <p className='popup'>
                  <label>
                    Customer Name
                    <input className='inputbox'
                      name="Customer Name"
                      placeholder="customer Name"
                      onChange={handleChange}
                      value={updatedOrder.customerName}
                      
                    />
                  </label>
                </p>
                <p className='popup'>
                  <label>
                    Total Price
                    <input className='inputbox'
                      name="totalAmount"
                      placeholder="Total Price"
                      onChange={handleChange}
                      value={updatedOrder.totalAmount}
                      
                    />
                  </label>
                </p>
                <p style={popup}>
                  <label>
                    Order Status
                    <input style={updatebox}
                      name="OrderStatus"
                      placeholder="Order Status"
                      onChange={handleChange}
                      value={updatedOrder.OrderStatus}
                      className='input-style'
                    />
                  </label>
                </p>
                <p style={popup}>
                  <label>
                    Order Medium
                    <input style={updatebox}
                      name="OrderMedium"
                      placeholder="Order Medium"
                      onChange={handleChange}
                      value={updatedOrder.OrderMedium}
                      className='input-style'
                    />
                  </label>
                </p>
                {/* Add other order fields as needed */}
                <CButton color="success" shape="rounded-pill" type="submit" style = {{marginTop: '10px'}}>
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
          <h2 style={{ marginTop: '-15px' }}>Enter Order Details</h2>
          <CForm onSubmit={handleAddOrder}>
            <div>
              <p className='popup'>
                <label>Order Number
                <input className='inputbox'
                  name="neworderNumber"
                  placeholder="Order Number"
                  onChange={handleChangeOfAdd}
                  value={addOrder.neworderNumber}
                  
                />
              </label>
              </p>
              <p className='popup'>
                <label>Customer Name
                <input className='inputbox'
                  name="newcustomerName"
                  placeholder="Customer Name"
                  onChange={handleChangeOfAdd}
                  value={addOrder.newcustomerName}
                  
                />
                </label>
              </p>
              <p className='popup'>
                <label>Total Price
                <input className='inputbox'
                  name="newtotalAmount"
                  placeholder="Total Price"
                  onChange={handleChangeOfAdd}
                  value={addOrder.newtotalAmount}
                  
                />
                </label>
              </p>
            
              <p style={popup}>
                <input style={inputbox}
                  name="OrderStatus"
                  placeholder="Order Status"
                  onChange={handleChangeOfAdd}
                  value={addOrder.OrderStatus}
                  className='input-style'
                />
              </p>
              <p style={popup}>
                <input style={inputbox}
                  name="OrderMedium"
                  placeholder="Order Medium"
                  onChange={handleChangeOfAdd}
                  value={addOrder.OrderMedium}
                  className='input-style'
                />
              </p>
              {/* Add other order fields as needed */}
              <CButton color="success" shape="rounded-pill" type="submit" style = {{marginTop: '10px'}}>
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
          <Button className='cancel-btn' onClick={() => handleToClose()} variant="primary">
            Cancel
          </Button>
          <Button className='delete-btn'
          onClick={() => handleDelete(props.selectedOrder)} variant="danger" autoFocus>
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
            <div className='popup'>
              <p>Order Number: {props.selectedOrder.orderNumber}</p>
              <p>Total Price: {props.selectedOrder.totalAmount}</p>
              <p>customerName :{props.selectedOrder.customerName}</p>
              <p>OrderStatus :{props.selectedOrder.OrderStatus}</p>
              <p>OrderMedium :{props.selectedOrder.OrderMedium}</p>
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
            height: '340px', // Adjust the height as needed
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
    </>
  );
};

export default OrderPopUp;
