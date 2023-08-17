import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CButton, CForm } from '@coreui/react';

Modal.setAppElement('#root');

const InventoryPopUp = (props) => {
  const [updatedData, setUpdatedData] = useState({
    
    product: "",
    weight: 0,
    quantity: 0,
    category: ""
  });

  const [addData, setAddData] = useState({
    product: "",
    weight: 0,
    quantity: 0,
    category: ""
  });

  useEffect(() => {
    if (props.edit) {
      setUpdatedData({
        id: props.selectedInventory.id,
        product: props.selectedInventory?.product,
        weight: props.selectedInventory?.weight,
        quantity: props.selectedInventory?.quantity,
        category: props.selectedInventory?.category
      });
    }
  }, [props.edit, props.selectedInventory]);

  const handleToClose = () => {
    props.setIsModalOpen(false);
    props.setEdit(false);
    props.setAddInventory(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeOfAdd = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (inventory) => {
    console.log("inventory in delete", inventory.id);
    if (inventory && inventory.id) {
      fetch(`http://localhost:8080/api/inventory/delete/${inventory.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Inventory deleted successfully:', data);
          props.setGetData(true); // Trigger data refresh
        })
        .catch((error) => {
          console.error('Error deleting inventory:', error);
        });
    }

    props.setDeletePop(false);
    props.setSelectedInventory(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updated data", updatedData);
    fetch('http://localhost:8080/api/inventory/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Inventory updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating inventory:', error);
      });

    props.setAddInventory(false);
    props.setGetData(true);
    props.setIsModalOpen(false);
    props.setEdit(false);
  };

  const handleAddInventory = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/api/inventory/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Inventory created successfully:', data);
        } else {
          console.error('Error creating inventory:', data.error);
        }
      })
      .catch((error) => {
        console.error('API request error:', error);
      });

    props.setAddInventory(false);
    props.setIsModalOpen(false);
    props.setGetData(true);
    setAddData({});
  };

  const Content = () => {
    if (props.edit) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2>Inventory Details</h2>
          <CForm onSubmit={handleSubmit}>
            {props.selectedInventory && (
              <div>
                <p>
                  <label className='modal-input'>
                    Product
                    <input
                      name="product"
                      placeholder="Product"
                      onChange={handleChange}
                      value={updatedData.product}
                    />
                  </label>
                </p>
                <p>
                  <label className='modal-input'>
                    Weight
                    <input
                      name="weight"
                      placeholder="Weight"
                      onChange={handleChange}
                      value={updatedData.weight}
                    />
                  </label>
                </p>
                <p>
                  <label className='modal-input'>
                    Quantity
                    <input
                      name="quantity"
                      placeholder="Quantity"
                      onChange={handleChange}
                      value={updatedData.quantity}
                    />
                  </label>
                </p>
                <p>
                  <label className='modal-input'>
                    Category
                    <input
                      name="category"
                      placeholder="Category"
                      onChange={handleChange}
                      value={updatedData.category}
                    />
                  </label>
                </p>
                <CButton color="success" shape="rounded-pill" type="submit">
                  Update
                </CButton>
              </div>
            )}
          </CForm>
        </div>
      );
    } else if (props.addInventory) {
      return (
        <div>
          <h2>Add Inventory</h2>
          <CForm onSubmit={handleAddInventory}>
            <p>
              <label className='modal-input'>
                Product
                <input
                  name="product"
                  placeholder="Product"
                  onChange={handleChangeOfAdd}
                  value={addData.product}
                />
              </label>
            </p>
            <p>
              <label className='modal-input'>
                Weight
                <input
                  name="weight"
                  placeholder="Weight"
                  onChange={handleChangeOfAdd}
                  value={addData.weight}
                />
              </label>
            </p>
            <p>
              <label className='modal-input'>
                Quantity
                <input
                  name="quantity"
                  placeholder="Quantity"
                  onChange={handleChangeOfAdd}
                  value={addData.quantity}
                />
              </label>
            </p>
            <p>
              <label className='modal-input'>
                Category
                <input
                  name="category"
                  placeholder="Category"
                  onChange={handleChangeOfAdd}
                  value={addData.category}
                />
              </label>
            </p>
            <CButton color="success" shape="rounded-pill" type="submit">
              Add Inventory
            </CButton>
          </CForm>
        </div>
      );
    } else if (props.deletePop) {
      return (
        <div>
          <h2>Delete Inventory</h2>
          {props.selectedInventory && (
            <div>
              <p>
                <strong>Product:</strong> {props.selectedInventory.product}
              </p>
              <p>
                <strong>Weight:</strong> {props.selectedInventory.weight}
              </p>
              <p>
                <strong>Quantity:</strong> {props.selectedInventory.quantity}
              </p>
              <p>
                <strong>Category:</strong> {props.selectedInventory.category}
              </p>
              <p>Are you sure you want to delete this inventory?</p>
              <CButton color="danger" onClick={() => handleDelete(props.selectedInventory)}>
                Delete
              </CButton>
              <CButton color="secondary" onClick={handleToClose}>
                Cancel
              </CButton>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <h2>Inventory Details</h2>
          {props.selectedInventory && (
            <div>
              <p>
                <strong>Product:</strong> {props.selectedInventory.product}
              </p>
              <p>
                <strong>Weight:</strong> {props.selectedInventory.weight}
              </p>
              <p>
                <strong>Quantity:</strong> {props.selectedInventory.quantity}
              </p>
              <p>
                <strong>Category:</strong> {props.selectedInventory.category}
              </p>
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
        contentLabel="Inventory Modal"
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

export default InventoryPopUp;
