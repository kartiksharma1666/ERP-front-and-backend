// AddProduct.js
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root') // Set the root element for the modal

const AddProduct = (props) => {
  const [addData, setAddData] = useState({
    Name: '',
    Price: '',
    Description: '',
    Category: '', // Initialize Category in addData
    Attributes: [],
    image: '', // Initialize Attributes in addData
  })
  const [attributes, setAttributes] = useState([])
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [category, setCategory] = useState([])
  const [image, setImage] = useState([])

  const [attributeInputs, setAttributeInputs] = useState([
    { attributeName: '', values: [{ value: '', price: '' }] }, // Initialize with an empty value and price
  ])
  const [selectedImages, setSelectedImages] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [addAttributeClicked, setAddAttributeClicked] = useState(false)
  const [openAttributeInputs, setOpenAttributeInputs] = useState([])

  useEffect(() => {
    fetchCategory()
  }, [])

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

  const handleChangeOfAdd = (e) => {
    const { name, value } = e.target

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleToClose = () => {
    props.setAddProduct(false)
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    setAttributeInputs([])
    const imageUrls = selectedImages.map((image) => URL.createObjectURL(image))
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
      image: uploadedImages,
    }
    console.log('frontend product data', requestData)
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
      Attributes: [],
      image: [], // Reset Attributes
    })
    setSelectedImages([])
    setUploadedImages([])
  }
  const uploadImage = () => {
    console.log('inside upload image', uploadedImages)
    if (image) {
      // If there's an image, add it to the uploadedImages array
      setUploadedImages((prevImages) => [...prevImages, image])
      setImage([]) // Clear the image state
    }
  }
  const handleAddAttribute = () => {
    console.log('inside add attribute')
    setAddAttributeClicked(true)
    setOpenAttributeInputs((prev) => [...prev, true])
    console.log('inside add attribute', setAddAttributeClicked)
    setAttributeInputs((prevInputs) => [
      ...prevInputs,
      { attributeName: '', values: [{ value: '', price: '' }] },
    ])
  }
  const handleCloseAttribute = (index) => {
    setOpenAttributeInputs((prev) => {
      const updatedOpenInputs = [...prev]
      updatedOpenInputs[index] = false
      return updatedOpenInputs
    })
    console.log('props.addProduct:', props.addProduct)
   
  }

  const product_button_style = {
    height: '40px',
    width: '150px',
  }
  return (
    // <div style={{ background: "red"}}>

    //   <Modal
    //     isOpen={props.addProduct}

    //     onRequestClose={handleToClose}
    //     contentLabel="Add Product Modal"
    //     style={{
    //       overlay: {
    //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       },
    //       content: {
    //         width: '50%', // Adjust the width as needed
    //         height: '400px', // Adjust the height as needed
    //         maxWidth: '700px', // Limit the maximum width of the modal
    //         border: '1px solid #ccc',
    //         background: '#fff',
    //         overflow: 'auto',
    //         WebkitOverflowScrolling: 'touch',
    //         borderRadius: '4px',
    //         outline: 'none',
    //         padding: '30px',
    //         top: '50%', // Center vertically
    //         left: '50%', // Center horizontally
    //         transform: 'translate(-50%, -50%)', // Translate to center
    //       },
    //     }}
    //   >
    //     <div>
    //       <button className="btn btn-primary close-button" onClick={handleToClose}>
    //         Close
    //       </button>
    //       <h2 style={{ marginTop: '-15px' }}> Enter Product Details</h2>
    //       <CForm onSubmit={handleAddProduct}>
    //         <div>
    //           <p className="popup"></p>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText id="inputGroup-sizing-default" style={{ marginTop: '-5px' }}>
    //               Name
    //             </CInputGroupText>
    //             <CFormInput
    //               aria-label="Name"
    //               aria-describedby="inputGroup-sizing-default"
    //               className="inputbox"
    //               name="Name"
    //               placeholder="Name"
    //               onChange={handleChangeOfAdd}
    //               value={addData.Name}
    //               style={{ height: '39px' }}
    //             />
    //           </CInputGroup>

    //           <p className="popup"></p>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText id="inputGroup-sizing-default" style={{ marginTop: '-5px' }}>
    //               Price
    //             </CInputGroupText>
    //             <CFormInput
    //               aria-label="Price"
    //               aria-describedby="inputGroup-sizing-default"
    //               className="inputbox"
    //               name="Price"
    //               placeholder="Price"
    //               onChange={handleChangeOfAdd}
    //               value={addData.Price}
    //               style={{ height: '39px' }}
    //             />
    //           </CInputGroup>

    //           <p className="popup"></p>
    //           <CInputGroup className="mb-3">
    //             <CInputGroupText id="inputGroup-sizing-default" style={{ marginTop: '-5px' }}>
    //               Description
    //             </CInputGroupText>
    //             <CFormInput
    //               aria-label="Description"
    //               aria-describedby="inputGroup-sizing-default"
    //               className="inputbox"
    //               name="Description"
    //               placeholder="Description"
    //               onChange={handleChangeOfAdd}
    //               value={addData.Description}
    //               style={{ height: '39px' }}
    //             />
    //           </CInputGroup>

    //           <p className="popup"></p>
    //           <form>
    //             <CInputGroup className="mb-3">
    //               <CInputGroupText htmlFor="inputGroupSelect01">Category</CInputGroupText>
    //               <select
    //                 name="Category"
    //                 className="form-select"
    //                 onChange={handleChangeOfAdd}
    //                 value={addData.Category}
    //               >
    //                 {category && category.length > 0 ? (
    //                   <>
    //                     <option value="" disabled>
    //                       Select a Category
    //                     </option>
    //                     {category.map((category) => (
    //                       <option key={category._id} value={category.name}>
    //                         {category.name}
    //                       </option>
    //                     ))}
    //                   </>
    //                 ) : (
    //                   <option value="" disabled>
    //                     No Category available. Please create one first.
    //                   </option>
    //                 )}
    //               </select>
    //             </CInputGroup>
    //           </form>
    //           <CInputGroup className="mb-3">
    //             <CFormInput
    //               type="file"
    //               id="inputGroupFile04"
    //               aria-describedby="inputGroupFileAddon04"
    //               aria-label="Upload"
    //               onChange={handleImage}
    //             />
    //             <CButton
    //               type="button"
    //               color="secondary"
    //               variant="outline"
    //               id="inputGroupFileAddon04"
    //               onClick={uploadImage}
    //             >
    //               Upload
    //             </CButton>
    //           </CInputGroup>
    //           {selectedImages.map((image, index) => (
    //             <div key={index}>
    //               <img src={image} alt={`Image ${index}`} />
    //             </div>
    //           ))}

    //           <p></p>
    //           <CForm>
    //             {/* Render the "Add Attribute" button */}

    //             <CButton style={{ marginTop: '10px' }} onClick={handleAddAttribute}>
    //               Add Attribute
    //             </CButton>

    //             {/* Render attribute input fields when the button is clicked */}
    //             {addAttributeClicked &&
    //               attributeInputs.map(
    //                 (input, index) =>
    //                   openAttributeInputs[index] && (
    //                     <div key={index}>
    //                       <CButton
    //                         type="button"
    //                         color="secondary"
    //                         size="sm"
    //                         onClick={() => handleCloseAttribute(index)}
    //                         style={{ marginTop: '10px', marginBottom: '10px' }}
    //                       >
    //                         Close Attribute
    //                       </CButton>
    //                       <CFormInput
    //                         size="sm"
    //                         type="text"
    //                         placeholder="Attribute Name"
    //                         value={input.attributeName}
    //                         onChange={(e) =>
    //                           handleAttributeInputChange(
    //                             index,
    //                             undefined,
    //                             'attributeName',
    //                             e.target.value,
    //                           )
    //                         }
    //                       />
    //                       {input.values.map((value, valueIndex) => (
    //                         <div key={valueIndex}>
    //                           <CFormInput
    //                             size="sm"
    //                             type="text"
    //                             placeholder="Value"
    //                             value={value.value}
    //                             onChange={(e) =>
    //                               handleAttributeInputChange(
    //                                 index,
    //                                 valueIndex,
    //                                 'value',
    //                                 e.target.value,
    //                               )
    //                             }
    //                           />
    //                           <CFormInput
    //                             size="sm"
    //                             type="text"
    //                             placeholder="Price"
    //                             value={value.price}
    //                             onChange={(e) =>
    //                               handleAttributeInputChange(
    //                                 index,
    //                                 valueIndex,
    //                                 'price',
    //                                 e.target.value,
    //                               )
    //                             }
    //                           />
    //                           <CButton
    //                             type="button"
    //                             color="secondary"
    //                             size="sm"
    //                             onClick={() => handleDeleteAttributeValue(index, valueIndex)}
    //                             style={{
    //                               marginTop: '10px',
    //                               marginBottom: '10px',
    //                               marginRight: '10px',
    //                             }}
    //                           >
    //                             Remove Value
    //                           </CButton>
    //                           <CButton
    //                             type="button"
    //                             color="secondary"
    //                             size="sm"
    //                             onClick={() => handleAddAttributeValue(index)}
    //                           >
    //                             Add Value
    //                           </CButton>
    //                         </div>
    //                       ))}
    //                     </div>
    //                   ),
    //               )}
    //           </CForm>
    //           <div className="d-grid gap-2">
    //             <CButton
    //               color="success"
    //               shape="rounded-pill"
    //               type="submit"
    //               style={{ marginTop: '15px' }}
    //             >
    //               Add Product
    //             </CButton>
    //           </div>
    //         </div>
    //       </CForm>
    //     </div>
    //   </Modal>
    //   </div>
    <div>
      <button
        className=" btn btn-primary "
        onClick={props.handleAddProduct}
        style={product_button_style}
      >
        Add product
      </button>
    </div>
  )
}

export default AddProduct
