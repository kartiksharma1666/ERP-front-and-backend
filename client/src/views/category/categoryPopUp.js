import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { CButton, CForm } from '@coreui/react';

Modal.setAppElement('#root');

const CategoryPopUp = (props) => {
  const [updatedData, setUpdatedData] = useState({
    name: '',
  });

  useEffect(() => {
    if (props.edit) {
      setUpdatedData({
        id: props.selectedCategory?._id,
        name: props.selectedCategory?.name,
      });
    }
  }, [props.edit, props.selectedCategory]);

  const handleToClose = () => {
    props.setIsModalOpen(false);
    props.setEdit(false);
    props.setAddCategory(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (category) => {
    fetch(`http://localhost:8080/api/category/delete/${category?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Category deleted successfully:', data);
      })
      .catch((error) => {
        console.error('Error deleting category:', error);
      });

    props.setDeletePop(false);
    props.setSelectedCategory(null);
    props.setGetData(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/category/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Category updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating category:', error);
      });

    props.setAddCategory(false);
    props.setGetData(true);
    props.setIsModalOpen(false);
    props.setEdit(false);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/category/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Category created successfully:', data);
      })
      .catch((error) => {
        console.error('Error creating category:', error);
      });

    props.setAddCategory(false);
    props.setIsModalOpen(false);
    props.setGetData(true);
  };

  const popup = {
    marginTop : '25px'
  }

  const inputbox = {
    width: '300px', 
    marginLeft: '10px',
    marginTop: '-5px',
    height: '35px'
  }

  const updatebox ={
    width: '300px', 
    marginLeft: '10px',
    marginTop: '-5px',
    height: '35px',
    
  }
  
  const Content = () => {
    if (props.edit === true) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginTop: '-15px' }}>Edit Category</h2>
          <CForm onSubmit={handleSubmit}>
          <div>
              <p style={popup}>
                <label>
                  Category Name
                  <input style={updatebox}
                    name="name"
                    placeholder="Category Name"
                    onChange={handleChange}
                    value={updatedData.name}
                    className='input-style'
                  />
                </label>
              </p>
              <CButton color="success" shape="rounded-pill" type="submit" style = {{marginTop: '10px'}}>
                Update Category
              </CButton>
            </div>
          </CForm>
        </div>
      );
    } else if (props.addCategory) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginTop: '-15px' }}>Add Category</h2>
          <CForm onSubmit={handleAddCategory}>
          <div>
              <p style={popup}>
                <label>
                  Category Name
                  <input style={inputbox}
                    name="name"
                    placeholder="Category Name"
                    onChange={handleChange}
                    value={updatedData.name}
                    className='input-style'
                  />
                </label>
              </p>
              <CButton color="success" shape="rounded-pill" type="submit" style = {{marginTop: '10px'}}>
                Add Category
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
            Are you sure you want to delete the Category:{' '}
            {props.selectedCategory && props.selectedCategory.name}?
          </p>
          <Button
          style={{marginTop: '20px', borderRadius: '20px'}}
            onClick={() => {
              props.setDeletePop(false);
              handleToClose();
            }}
            variant="primary"
          >
            Cancel
          </Button>
          <Button
          style={{marginLeft: '20px', marginTop: '20px', borderRadius: '20px'}}
            onClick={() => {
              handleDelete(props.selectedCategory);
              handleToClose();
            }}
            variant="danger"
            autoFocus
          >
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
          <h2 style={{ marginBottom: '30px' }}>Category Details</h2>
          {props.selectedCategory && (
            <div>
              <p>Name: {props.selectedCategory.name}</p>
              {/* Render other category details */}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={handleToClose}
      contentLabel="Category Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '50%', // Adjust the width as needed
          height: '230px', // Adjust the height as needed
          maxWidth: '700px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '40px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      {Content()}
    </Modal>
  );
};
export default CategoryPopUp;
