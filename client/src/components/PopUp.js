import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'

import './Product'

import {
  CButton,
  CInputGroup,
  CInputGroupText,
  CDropdownItem,
  CForm,
  CFormGroup,
  CSelect,
  CFormInput,
} from '@coreui/react'

Modal.setAppElement('#root')
const PopUp = (props) => {
  // Function to close the modal
  const [addData, setAddData] = useState({
    Name: '',
    Price: '',
    Description: '',
    Category: '', // Initialize Category in addData
    Attributes: [], // Initialize Attributes in addData
  })
  const [updatedData, setUpdatedData] = useState({})
  // const [addData, setAddData] = useState({})
  const [attributes, setAttributes] = useState([])
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const updatedAddData = { ...addData, ...selectedAttributes }
  const [viewPop, setViewPop] = useState(false)
  const [category, setCategory] = useState([])

  const [updateAttributeData, setupdateAttributeData] = useState({
    name: '',
    values: [],
  })
  const [attributeInputs, setAttributeInputs] = useState([
    { attributeName: '', values: [{ value: '', price: '' }] }, // Initialize with an empty value and price
  ])

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
  const handleAttributeChange1 = (e) => {
    const { name, value } = e.target
    if (name.startsWith('values[')) {
      // Handle values array change
      const index = parseInt(name.match(/\d+/)[0]) // Extract index from name
      setupdateAttributeData((prev) => ({
        ...prev,
        values: prev.values.map((val, i) => (i === index ? value : val)),
      }))
    } else {
      setupdateAttributeData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }
  const fetchCategory = () => {
    // Make an API call to fetch categories from your backend
    fetch('http://localhost:8080/api/category/all')
      .then((response) => response.json())
      .then((data) => {
        setCategory(data.categories)
        //console.log(data.categories) // Update the state with fetched categories
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
  }

  const handleAddAttributeValue = (index) => {
    const updatedInputs = [...attributeInputs]
    updatedInputs[index].values.push({ value: '', price: '' }) // Push an empty value and price to the values array
    setAttributeInputs(updatedInputs)
  }

  const handleDeleteAttributeValue = (index, valueIndex) => {
    const updatedInputs = [...attributeInputs]
    updatedInputs[index].values.splice(valueIndex, 1)
    setAttributeInputs(updatedInputs)
  }

  const handleDeleteValue = (index) => {
    setupdateAttributeData((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }))
  }

  // const handleAttributeInputChange = (index, subName, value) => {
  //   const updatedInputs = [...attributeInputs]
  //   updatedInputs[index].values[subName] = value
  //   setAttributeInputs(updatedInputs)
  // }
  // const handleAttributeInputChange = (index, subName, value) => {
  //   const updatedInputs = [...attributeInputs];
  //   updatedInputs[index][subName] = value; // Change attributeName to subName
  //   setAttributeInputs(updatedInputs);
  // };
  const handleAttributeInputChange = (index, subIndex, subName, value) => {
    const updatedInputs = [...attributeInputs]

    if (subIndex !== undefined) {
      updatedInputs[index].values[subIndex] = {
        ...updatedInputs[index].values[subIndex],
        [subName]: value,
      }
    } else {
      updatedInputs[index] = {
        ...updatedInputs[index],
        [subName]: value,
      }
    }

    setAttributeInputs(updatedInputs)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setUpdatedData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const handleChangeOfAdd = (e) => {
    const { name, value } = e.target

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  useEffect(() => {
    fetchAttributes()
    fetchCategory()
  }, [])

  const fetchAttributes = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/attributes/all')
      const resjson = await res.json()

      if (Array.isArray(resjson)) {
        setAttributes(resjson)
      } else {
        console.error('Invalid data format from API:', resjson)
        setAttributes([])
      }
    } catch (error) {
      console.error('Error fetching attributes:', error)
    }
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
  const handleAttributeChange = (attributeId, selectedValue) => {
    // Find the attribute object in the attributes array using its ID
    const selectedAttribute = attributes.find((attribute) => attribute._id === attributeId)

    if (selectedAttribute) {
      const attributeName = selectedAttribute.name

      setSelectedAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attributeName]: selectedValue,
      }))
    }
  }
  const handleRemoveAttributeInput = (index) => {
    const updatedInputs = attributeInputs.filter((_, i) => i !== index)
    setAttributeInputs(updatedInputs)
  }
  const handleAttributeSubmit = async (e) => {
    e.preventDefault()

    const attributesToSubmit = attributeInputs.map((input) => ({
      name: input.attributeName,
      value: input.attributeValue,
    }))

    try {
      const response = await fetch('http://localhost:8080/api/attributes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attributesToSubmit),
      })

      const data = await response.json()
      console.log('Attributes created successfully:', data)

      // Assuming the response from the API contains the IDs of the created attributes
      const createdAttributeIds = data.map((attribute) => attribute._id)

      // Update selectedAttributes with the newly created attributes
      const updatedSelectedAttributes = { ...selectedAttributes }
      for (let i = 0; i < attributeInputs.length; i++) {
        updatedSelectedAttributes[attributeInputs[i].attributeName] =
          attributeInputs[i].attributeValue
      }
      setSelectedAttributes(updatedSelectedAttributes)

      // Update the attributeInputs to clear them for the next round
      setAttributeInputs([])
    } catch (error) {
      console.error('Error creating attributes:', error)
    }
  }

  //handling add product here
  const handleAddProduct = (e) => {
    e.preventDefault()
    setAttributeInputs([])
    // Transform attributeInputs into the desired format
    // const attributesToSend = {} // Create an empty object to store the attributes

    // attributeInputs.forEach((input) => {
    //   const attributeValues = {} // Create an empty object to store attribute values
    //   input.values.forEach((value) => {
    //     if (value.value && value.price) {
    //       attributeValues[value.value] = value.price // Add value-price pair to the attributeValues object
    //     }
    //   })

    //   if (Object.keys(attributeValues).length > 0) {
    //     attributesToSend[input.attributeName] = attributeValues // Add attribute with its values to the attributesToSend object
    //   }
    // })
    const attributesToSend = attributeInputs.map((input) => ({
      name: input.attributeName,
      values: input.values.map((value) => ({
        value: value.value,
        price: value.price,
      })),
    }))

    const requestData = {
      ...addData,
      Category: addData.Category, // Add Category here
      Attributes: attributesToSend,
    }

    const updatedAddData = { ...addData } // Merge the selected attributes

    fetch('http://localhost:8080/api/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData), // Use the updatedAddData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product created successfully:', requestData)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error creating product:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })

    props.setAddProduct(false)
    props.setIsModalOpen(false)
    props.setGetData(true)

    setSelectedAttributes({}) // Clear selected attributes
    // Clear selected attributes
    setAttributeInputs([])
    setAddData({
      Name: '',
      Price: '',
      Description: '',
      Category: '', // Reset Category
      Attributes: [], // Reset Attributes
    })
  }
  const handleAddAttribute = () => {
    setAttributeInputs((prevInputs) => [
      ...prevInputs,
      { attributeName: '', values: [{ value: '', price: '' }] },
    ])
  }

  const popup = {
    marginTop: '25px',
  }

  const inputbox = {
    width: '300px',
    marginTop: '-5px',
    height: '35px',
  }

  const updatebox = {
    width: '300px',
    marginTop: '-5px',
    height: '35px',
    marginLeft: '10px',
  }

  //content to be show in pop up
  const Content = () => {
    console.log('categories in popUP', props.categories)
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
                <p className="popup">
                  <label>
                    Name
                    <input
                      className="inputbox"
                      name="Name"
                      placeholder="Name"
                      onChange={handleChange}
                      value={updatedData.Name}
                    />
                  </label>
                </p>
                <p className="popup">
                  <label>
                    Price
                    <input
                      className="inputbox"
                      name="Price"
                      placeholder="Price"
                      onChange={handleChange}
                      value={updatedData.Price}
                    />
                  </label>
                </p>
                <p className="popup">
                  <label>
                    Description
                    <input
                      className="inputbox"
                      name="Description"
                      placeholder="Description"
                      onChange={handleChange}
                      value={updatedData.Description}
                    />
                  </label>
                </p>
                <CForm onSubmit={handleAttributeSubmit}>
                  {attributeInputs.map((input, index) => (
                    <div key={index}>
                      <CFormInput
                        size="sm"
                        type="text"
                        placeholder="Attribute Name"
                        value={updateAttributeData.attributeName}
                        onChange={(e) =>
                          handleAttributeInputChange(
                            index,
                            undefined,
                            'attributeName',
                            e.target.value,
                          )
                        }
                      />
                      {updateAttributeData.values.map((value, valueIndex) => (
                        <div key={valueIndex}>
                          <CFormInput
                            size="sm"
                            type="text"
                            placeholder="Value"
                            value={value.value}
                            onChange={(e) =>
                              handleAttributeInputChange(index, valueIndex, 'value', e.target.value)
                            }
                          />
                          <CFormInput
                            size="sm"
                            type="text"
                            placeholder="Price"
                            value={value.price}
                            onChange={(e) =>
                              handleAttributeInputChange(index, valueIndex, 'price', e.target.value)
                            }
                          />
                          <CButton
                            type="button"
                            color="secondary"
                            size="sm"
                            onClick={() => handleDeleteAttributeValue(index, valueIndex)}
                          >
                            Remove Value
                          </CButton>
                        </div>
                      ))}
                      <CButton
                        type="button"
                        color="secondary"
                        size="sm"
                        onClick={() => handleAddAttributeValue(index)}
                      >
                        Add Value
                      </CButton>
                    </div>
                  ))}
                  <CButton
                    onClick={() =>
                      setAttributeInputs([
                        ...attributeInputs,
                        { name: '', values: [{ value: '', price: '' }] }, // Modify the structure
                      ])
                    }
                  >
                    Add Attribute
                  </CButton>
                  {/* <CButton color="success" shape="rounded-pill" type="submit">
                      Add Attribute
                    </CButton> */}
                </CForm>
                <p></p>
                <CButton color="primary" type="submit" style={{ marginTop: '25px' }}>
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
              <h2 style={{ marginTop: '-15px' }}> Enter Product Details</h2>
              <CForm onSubmit={handleAddProduct}>
                <div>
                  <p className="popup"></p>
                  <label>
                    Name
                    <input
                      className="inputbox"
                      name="Name"
                      placeholder="Name"
                      onChange={handleChangeOfAdd}
                      value={addData.Name}
                    />
                  </label>
                  <p className="popup"></p>
                  <label>
                    Price
                    <input
                      className="inputbox"
                      name="Price"
                      placeholder="Price"
                      onChange={handleChangeOfAdd}
                      value={addData.Price}
                    />
                  </label>
                  <p className="popup"></p>
                  <label>
                    Description
                    <input
                      className="inputbox"
                      name="Description"
                      placeholder="Description"
                      onChange={handleChangeOfAdd}
                      value={addData.Description}
                    />
                  </label>
                  <p className="popup"></p>
                  <form>
                    <CInputGroup className="mb-3">
                      <CInputGroupText htmlFor="inputGroupSelect01">Category</CInputGroupText>
                      <select
                        name="Category"
                        className="form-select"
                        onChange={handleChangeOfAdd}
                        value={addData.Category}
                      >
                        {category && category.length > 0 ? (
                          <>
                            <option value="" disabled>
                              Select a Category
                            </option>
                            {category.map((category) => (
                              <option key={category._id} value={category.name}>
                                {category.name}
                              </option>
                            ))}
                          </>
                        ) : (
                          <option value="" disabled>
                            No Category available. Please create one first.
                          </option>
                        )}
                      </select>
                    </CInputGroup>
                  </form>
                  <p></p>
<<<<<<< HEAD
                  <CButton color="primary"  type="submit" style={{marginTop: '20px'}}>
=======
                  <div>
                    {attributeInputs.map((input, index) => (
                      <div key={index}>
                        <CFormInput
                          size="sm"
                          type="text"
                          placeholder="Attribute Name"
                          value={input.attributeName}
                          onChange={(e) =>
                            handleAttributeInputChange(
                              index,
                              undefined,
                              'attributeName',
                              e.target.value,
                            )
                          }
                        />
                        {input.values.map((value, valueIndex) => (
                          <div key={valueIndex}>
                            <CFormInput
                              style={{ marginTop: '10px' }}
                              size="sm"
                              type="text"
                              placeholder="Value"
                              value={value.value}
                              onChange={(e) =>
                                handleAttributeInputChange(
                                  index,
                                  valueIndex,
                                  'value',
                                  e.target.value,
                                )
                              }
                            />
                            <CFormInput
                              style={{ marginTop: '10px' }}
                              size="sm"
                              type="text"
                              placeholder="Price"
                              value={value.price}
                              onChange={(e) =>
                                handleAttributeInputChange(
                                  index,
                                  valueIndex,
                                  'price',
                                  e.target.value,
                                )
                              }
                            />
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                              <CButton
                                type="button"
                                color="secondary"
                                size="sm"
                                onClick={() => handleDeleteAttributeValue(index, valueIndex)}
                              >
                                Remove Value
                              </CButton>
                              <CButton
                                type="button"
                                color="secondary"
                                size="sm"
                                onClick={() => handleAddAttributeValue(index)}
                              >
                                Add Value
                              </CButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <CButton style={{ marginTop: '10px' }} onClick={handleAddAttribute}>
                      Add Attribute
                    </CButton>
                  </div>
                  <CButton
                    color="success"
                    shape="rounded-pill"
                    type="submit"
                    style={{ marginTop: '15px' }}
                  >
>>>>>>> 6fafcbcf1152d659960572e73c8d300552825e97
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
          <Button style={{ marginTop: '20px', borderRadius: '8px'}}
            onClick={() => {
              props.setDeletePop(false)
              handleToClose()
            }}
            variant="primary"
          >
            Cancel
          </Button>

          <Button
          style={{marginLeft: '20px', marginTop: '20px', borderRadius: '8px'}}
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
            // gurleen changes here
            //             <div className='popup'>
            //               <p>Name: {props.selectedProduct.name || ""}</p>
            //               <p>Price: {props.selectedProduct.price || ""} </p>
            //               <p>Description:{props.selectedProduct.description || ""}</p>

            <div style={popup}>
              <p>Name: {props.selectedProduct.name || ''}</p>
              {/* <p>Price: {props.selectedProduct.price || ''} </p> */}
              <p>Description:{props.selectedProduct.description || ''}</p>
              <p>Attributes:</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Attribute Name</th>
                    <th>Value-Price</th>
                  </tr>
                </thead>
                <tbody>
                  {(props.selectedProduct.attributes || []).map((attribute) => (
                    <tr key={attribute.name}>
                      <td>{attribute.name}</td>
                      <td>
                        {(attribute.values || []).map((value) => (
                          <div key={value.value}>
                            {value.value} - {value.price}
                          </div>
                        ))}
                      </td>
                      <td></td> {/* Add price column here if needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
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
            padding: '30px',
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
{
  /* <Product
selectedAttributes={selectedAttributes}
viewPop={viewPop} // Pass viewPop state
      setViewPop={setViewPop}
      setSelectedAttributes={setSelectedAttributes}/> */
}

export default PopUp
