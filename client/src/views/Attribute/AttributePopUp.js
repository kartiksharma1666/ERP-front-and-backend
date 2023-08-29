import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { CButton, CForm } from '@coreui/react';

Modal.setAppElement('#root');

const AttributePopUp = (props) => {
  const [updateAttributeData, setupdateAttributeData] = useState({
    name: '',
    values: [],
  });

  useEffect(() => {
    if (props.edit) {
      setupdateAttributeData({
        id: props.selectedAttribute?._id,
        name: props.selectedAttribute?.name,
        values: props.selectedAttribute?.values || [],
      });
    } else if (props.addAttribute) {
      setupdateAttributeData({
        name: '',
        values: [''], // Initialize with an empty value
      });
    }
  }, [props.edit, props.selectedAttribute, props.addAttribute]);

  const handleToClose = () => {
    props.setIsModalOpen(false);
    props.setEdit(false);
    props.setAddAttribute(false); // Reset the addAttribute state
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('values[')) {
      // Handle values array change
      const index = parseInt(name.match(/\d+/)[0]); // Extract index from name
      setupdateAttributeData((prev) => ({
        ...prev,
        values: prev.values.map((val, i) => (i === index ? value : val)),
      }));
    } else {
      setupdateAttributeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddAttributeValue = () => {
    setupdateAttributeData((prev) => ({
      ...prev,
      values: [...prev.values, ''], // Add an empty value to the values array
    }));
  };

  const handleDeleteValue = (index) => {
    setupdateAttributeData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiEndpoint = props.edit ? '/attributes/update' : '/attributes/create';

    fetch(`http://localhost:8080/api${apiEndpoint}`, {
      method: props.edit ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateAttributeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Attribute operation successful:', data);
        props.setGetData(true);
        props.setIsModalOpen(false);
        props.setEdit(false);
        props.setAddAttribute(false);
      })
      .catch((error) => {
        console.error('Error performing attribute operation:', error);
      });
  };

  const handleDeleteAttribute = () => {
    fetch(`http://localhost:8080/api/attributes/delete/${props.selectedAttribute._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Attribute deleted successfully:', data);
        props.setGetData(true);
        props.setIsModalOpen(false);
        props.setEdit(false);
        props.setAddAttribute(false);
      })
      .catch((error) => {
        console.error('Error deleting attribute:', error);
      });
  };

  const popup = {
    marginTop: '25px',
  };

  const updatebox = {
    width: '300px',
    marginLeft: '10px',
    marginTop: '-5px',
    height: '35px',
  };

  const Content = () => {
    if (props.edit === true || props.addAttribute === true) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginTop: '-15px' }}>
            {props.edit ? 'Edit Attribute' : 'Add Attribute'}
          </h2>
          <CForm onSubmit={handleSubmit}>
            <div>
              <p style={popup}>
                <label>
                  Attribute Name
                  <input
                    style={updatebox}
                    name="name"
                    placeholder="Attribute Name"
                    onChange={handleAttributeChange}
                    value={updateAttributeData.name}
                    className="input-style"
                  />
                </label>
              </p>
              {updateAttributeData.values.map((value, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <label>
                    Value {index + 1}
                    <input
                      style={updatebox}
                      name={`values[${index}]`}
                      placeholder={`Value ${index + 1}`}
                      onChange={handleAttributeChange}
                      value={value}
                      className="input-style"
                    />
                  </label>
                  {props.edit && (
                    <CButton
                      color="danger"
                      shape="rounded-pill"
                      onClick={() => handleDeleteValue(index)}
                      style={{ marginLeft: '10px' }}
                    >
                      Delete
                    </CButton>
                  )}
                </div>
              ))}
              <CButton
                color="primary"
                shape="rounded-pill"
                onClick={handleAddAttributeValue}
                style={{ marginTop: '10px' }}
              >
                Add Value
              </CButton>
              <CButton
                color={props.edit ? 'success' : 'primary'}
                shape="rounded-pill"
                type="submit"
                style={{ marginTop: '10px' }}
              >
                {props.edit ? 'Update Attribute' : 'Add Attribute'}
              </CButton>
              {props.edit && (
                <CButton
                  color="danger"
                  shape="rounded-pill"
                  style={{ marginTop: '10px' }}
                  onClick={handleDeleteAttribute}
                >
                  Delete Attribute
                </CButton>
              )}
            </div>
          </CForm>
        </div>
      );
    }
    // ... rest of the cases, similar to your existing implementation
  };

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={handleToClose}
      contentLabel="Attribute Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          width: '50%',
          height: '400px',
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

export default AttributePopUp;
