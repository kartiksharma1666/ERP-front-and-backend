import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'

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
const CategoryPopUp = (props) => {
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [updatedData, setUpdatedData] = useState({
    name: '',
    subcategories: [],
  })
  const [categoryimage, setCategoryImage] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  // useEffect(() => {
  //   if (props.edit) {
  //     setUpdatedData({
  //       id: props.selectedCategory?._id,
  //       name: props.selectedCategory?.name,
  //     });
  //   }
  // }, [props.edit, props.selectedCategory]);
  // useEffect(() => {
  //   if (props.edit) {
  //     setUpdatedData({
  //       id: props.selectedCategory?._id,
  //       name: props.selectedCategory?.name,
  //     });
  //   }
  // }, [props.edit, props.selectedCategory]);
  useEffect(() => {
    if (props.edit) {
      setUpdatedData({
        id: props.selectedCategory?._id,
        name: props.selectedCategory?.name,
        subcategories: props.selectedCategory?.subcategories,
      })
    } else if (props.addCategory) {
      setUpdatedData({
        name: '',
        subcategories: [],
      })
    } else if (props.addSubCategory) {
      setUpdatedData({
        name: selectedCategoryName, // Set the name to selectedCategoryName
        subcategories: [],
      })
    }
  }, [
    props.edit,
    props.addCategory,
    props.addSubCategory,
    selectedCategoryName,
    props.selectedCategory,
  ])
  const handleToClose = () => {
    props.setIsModalOpen(false)
    props.setEdit(false)
    props.setAddCategory(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleAddSubcategory = () => {
    const newSubcategory = {
      name: '', // Initialize with an empty name
    }
    setUpdatedData((prevData) => ({
      ...prevData,
      subcategories: [...prevData.subcategories, newSubcategory],
    }))
  }
  const handleSubcategoryChange = (index, e) => {
    const { name, value } = e.target
    const updatedSubcategories = [...updatedData.subcategories]
    updatedSubcategories[index] = {
      ...updatedSubcategories[index],
      name: value, // Update the name property
    }
    setUpdatedData((prevData) => ({
      ...prevData,
      subcategories: updatedSubcategories,
    }))
  }
  const renderSubcategoryInputs = () => {
    return updatedData.subcategories.map((subcategory, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="text"
          name={`subcategories[${index}].name`}
          value={subcategory.name}
          onChange={(e) => handleSubcategoryChange(index, e)}
          placeholder={`Subcategory ${index + 1} Name`}
          style={{ marginTop: '10px', width: '100%' }}
        />
        <CButton
          type="button"
          onClick={() => handleRemoveSubcategory(index)}
          color="danger"
          variant="outline"
          style={{ marginLeft: '10px', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
        >
          Remove
        </CButton>
      </div>
    ))
  }
  const handleAddMore = () => {
    const newSubcategory = {
      name: '',
    }
    setUpdatedData((prevData) => ({
      ...prevData,
      subcategories: [...prevData.subcategories, newSubcategory],
    }))
  }
  const handleCategoryImage = (e) => {
    const file = e.target.files[0]
    
    setFileToBase(file);
    
    
    console.log('inside handleImage')
    console.log(file)
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCategoryImage(reader.result)
      console.log('reader result', reader.result)
    }
  }
  const uploadImage = () => {
    console.log('inside upload image', uploadedImages)
    if (categoryimage) {
      // If there's an image, add it to the uploadedImages array
      setUploadedImages((prevImages) => [...prevImages, categoryimage])
      // setCategoryImage([]) // Clear the image state
    }
  }
  const handleRemoveSubcategory = (index) => {
    const updatedSubcategories = [...updatedData.subcategories]
    updatedSubcategories.splice(index, 1)
    setUpdatedData((prevData) => ({
      ...prevData,
      subcategories: updatedSubcategories,
    }))
  }
  const handleDelete = (category) => {
    fetch(`http://localhost:8080/api/category/delete/${category?._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Category deleted successfully:', data)
      })
      .catch((error) => {
        console.error('Error deleting category:', error)
      })
    props.setDeletePop(false)
    props.setSelectedCategory(null)
    props.setGetData(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    updatedData.name = props.selectedCategory.name
    const updatedDataWithId = {
      ...updatedData,
      id: props.selectedCategory?._id,
    }
    console.log('updated data', updatedDataWithId)
    fetch('http://localhost:8080/api/category/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDataWithId),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Category updated successfully:', updatedDataWithId)
      })
      .catch((error) => {
        console.error('Error updating category:', error)
      })
    props.setAddCategory(false)
    props.setGetData(true)
    props.setIsModalOpen(false)
    props.setEdit(false)
  }
  const handleAddCategory = (e) => {
    e.preventDefault()
    const requestData={
      ...updatedData,
      categoryimage: uploadedImages
    }
    fetch('http://localhost:8080/api/category/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Category created successfully:', data)
      })
      .catch((error) => {
        console.error('Error creating category:', error)
      })
    props.setAddCategory(false)
    props.setIsModalOpen(false)
    props.setGetData(true)
    setUploadedImages([])
  }
  // const popup = {
  //   marginTop : '25px'
  // }
  // const inputbox = {
  //   width: '300px',
  //   marginLeft: '10px',
  //   marginTop: '-5px',
  //   height: '35px'
  // }
  // const inpubox ={
  //   width: '300px',
  //   marginLeft: '10px',
  //   marginTop: '-5px',
  //   height: '35px',
  // }

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
              <p className="popup">
                <label>
                  Category Name
                  <input
                    className="inputbox"
                    name="name"
                    placeholder="Category Name"
                    onChange={handleChange}
                    value={updatedData.name}
                  />
                </label>
              </p>
              {updatedData.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                >
                  <input
                    type="text"
                    name={`subcategories[${index}].name`}
                    placeholder={`Subcategory ${index + 1} Name`}
                    onChange={(e) => handleSubcategoryChange(index, e)}
                    value={subcategory.name}
                    style={{ marginTop: '10px', width: '100%' }}
                  />
                  <CButton
                    type="button"
                    onClick={() => handleRemoveSubcategory(index)}
                    color="danger"
                    variant="outline"
                    style={{
                      marginLeft: '10px',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                    }}
                  >
                    Remove
                  </CButton>
                </div>
              ))}

              <CButton
                color="info"
                variant="ghost"
                style={{ marginTop: '10px' }}
                onClick={handleAddSubcategory}
              >
                Add More
              </CButton>

              <CButton color="primary" type="submit" style={{ marginTop: '10px' }}>
                Update Category
              </CButton>
            </div>
          </CForm>
        </div>
      )
    } else if (props.addCategory) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginTop: '-15px' }}>Add Category</h2>
          <CForm onSubmit={handleAddCategory}>
            <div>
              <p className="popup">
                <label>
                  <CInputGroup className="mb-3" style={{marginTop:'-5 px'}}>
                    <CInputGroupText id="inputGroup-sizing-default" style={{height: '38px'}}>Category </CInputGroupText>
                    <CFormInput
                      className="inputbox"
                      name="name"
                      placeholder="Category Name"
                      onChange={handleChange}
                      value={updatedData.name}
                      aria-label="Category Name"
                      aria-describedby="inputGroup-sizing-default"
                      style={{height: '36px', marginTop: '0.6px', width: '70%'}}
                    />
                  </CInputGroup>
                </label>

                <CInputGroup className="mb-3" style={{ marginTop: '10px' }}>
                  <CFormInput
                    type="file"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onClick={handleCategoryImage}
                  />
                  <CButton
                    type="button"
                    color="secondary"
                    variant="outline"
                    id="inputGroupFileAddon04"
                    onClick={uploadImage}
                  >
                    Upload
                  </CButton>
                </CInputGroup>
              </p>
              <CButton color="primary" type="submit" style={{ marginTop: '10px' }}>
                Add Category
              </CButton>
            </div>
          </CForm>
        </div>
      )
    } else if (props.addSubCategory) {
      return (
        <div>
          <button className="btn btn-primary close-button" onClick={handleToClose}>
            Close
          </button>
          <h2 style={{ marginTop: '-15px' }}>Add SubCategory</h2>
          <CForm onSubmit={handleSubmit}>
            <div>
              {updatedData.subcategories.map((subcategory, index) => (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                ></div>
              ))}
              <div>
                {renderSubcategoryInputs()}
                <CButton
                  color="info"
                  variant="ghost"
                  style={{ marginTop: '10px' }}
                  onClick={handleAddSubcategory}
                >
                  Add More
                </CButton>
                <CButton
                  color="success"
                  variant="outline"
                  type="submit"
                  style={{ marginTop: '10px' }}
                >
                  Add SubCategory
                </CButton>
              </div>
            </div>
          </CForm>
        </div>
      )
    } else if (props.deletePop) {
      return (
        <div>
          <h2>Confirm Delete</h2>
          <p>
            Are you sure you want to delete the Category:{' '}
            {props.selectedCategory && props.selectedCategory.name}?
          </p>
          <Button
            className="cancel-btn"
            onClick={() => {
              props.setDeletePop(false)
              handleToClose()
            }}
            variant="primary"
          >
            Cancel
          </Button>
          <Button
            className="delete-btn"
            onClick={() => {
              handleDelete(props.selectedCategory)
              handleToClose()
            }}
            variant="danger"
            autoFocus
          >
            Delete
          </Button>
        </div>
      )
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
              <p>Sub Categories</p>
              {props.selectedCategory.subcategories && (
                <ul>
                  {props.selectedCategory.subcategories.map((subcategory) => (
                    <li key={subcategory._id}>{subcategory.name}</li>
                  ))}
                </ul>
              )}
              <p>Images:</p>
              <div className="image-gallery">
                {props.categoryImageArray &&
                  props.categoryImageArray
                    .filter((image) => image.categoryId === props.selectedCategory._id)
                    .map((image, index) => (
                      <div key={index}>
                        {image.image.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img} // Display each image in the 'image' array
                            alt={`Image ${index}-${imgIndex}`}
                          />
                        ))}
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      )
    }
  }
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
  )
}
export default CategoryPopUp
