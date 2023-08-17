import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCol,
  CDropdown,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const Product = (props) => {
  const [data, setdata] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [categories, setCategories] = useState([])
  const fetchCategories = () => {
    // Make an API call to fetch categories from your backend
    fetch('http://localhost:8080/api/category/all')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories)
        console.log(data.categories) // Update the state with fetched categories
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
  }
  const filteredProducts = selectedCategory
    ? data.filter((product) => product.category && product.category._id === selectedCategory)
    : data

  const product_button_style = {
    height: '40px',
    width: '150px',
  }

  const sortedCategories = Array.isArray(categories)
    ? [...categories].sort((a, b) => b.order - a.order)
    : []

  const getDataFromDB = async () => {
    const res = await fetch('http://localhost:8080/api/products/all').catch((err) => {
      console.log(err)
    })

    const resjson = await res.json()
    console.log(resjson)
    setdata(resjson)
    props.setGetData(false)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const filterdProd = data.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setSearchResults(filterdProd)
  }

  const handleClickToOpen = (Product, key) => {
    props.setSelectedProduct(Product)
    if (key == 'update') {
      props.setEdit(true)
    }
    if (key == 'delete') {
      props.setDeletePop(true)
    }
    props.setIsModalOpen(true)
  }

  const handleAddProduct = () => {
    props.setIsModalOpen(true)
    props.setAddProduct(true)
  }

  const handleDeleteConfirmation = (product) => {
    props.setSelectedProduct(product)
    props.setDeletePop(true)
  }

  useEffect(() => {
    getDataFromDB()
    fetchCategories()
  }, [props.getData])
  useEffect(() => {
    // Log the category.$oid value for each product
    if (data && data._id) {
      data.forEach((product) => {
        console.log('Product ID:', product._id)
        console.log('Category ID:', product.category._id)
      })
    }
  }, [data])

  const AllProduct = () => {
    return (
      <>
        {data &&
          filteredProducts &&
          filteredProducts.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.price}</CTableDataCell>

              <CTableDataCell>
                <CButton
                  color="info"
                  shape="rounded-pill"
                  onClick={() => {
                    openInPopup(item)
                  }}
                >
                  Info
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="success"
                  shape="rounded-pill"
                  onClick={() => handleClickToOpen(item, 'update')}
                >
                  Update
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="primary"
                  shape="rounded-pill"
                  onClick={() => handleClickToOpen(item, 'view')}
                >
                  View
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="danger"
                  shape="rounded-pill"
                  onClick={() => handleClickToOpen(item, 'delete')}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
      </>
    )
  }

  const SearchComponent = () => {
    return (
      <>
        {/* {searchResults?.map((product) => (
              <div key={product._id} className="card mb-2">
                <div className="card-body">{product.name}</div>
                <div className="card-body">{product.price}</div>
              </div>
            ))} */}
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{item.price}</CTableDataCell>

              <CTableDataCell>
                <CButton
                  color="info"
                  shape="rounded-pill"
                  onClick={() => {
                    openInPopup(item)
                  }}
                >
                  Info
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="success"
                  shape="rounded-pill"
                  onClick={() => handleClickToOpen(item, 'update')}
                >
                  Update
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="primary"
                  shape="rounded-pill"
                  onClick={() => handleClickToOpen(item, 'view')}
                >
                  View
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="danger"
                  shape="rounded-pill"
                  onClick={() => handleClickToOpen(item, 'delete')}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <>no Products found</>
        )}
      </>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex">
              <CDropdown>
                <CDropdownToggle color="primary" style={{ height: '40px' }}>
                  Category
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => setSelectedCategory(null)}>All</CDropdownItem>
                  {sortedCategories.length > 0 &&
                    sortedCategories.map((category) => (
                      <CDropdownItem
                        key={category._id}
                        onClick={() => setSelectedCategory(category._id)}
                      >
                        {category.name}
                      </CDropdownItem>
                    ))}
                </CDropdownMenu>
              </CDropdown>
              <div className="container">
                <div className=" row justify-content-center">
                  <div className="col-md-8">
                    <div className="input-group mb-3">
                      <input
                        style={{ borderRadius: '5px' }}
                        type="text"
                        className="form-control"
                        placeholder="Search for Product..."
                        value={search}
                        spellCheck="false"
                        onChange={handleSearch}
                      ></input>
                      <div className="input-group-append"></div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className=" btn btn-primary "
                onClick={handleAddProduct}
                style={product_button_style}
              >
                Add product
              </button>
            </div>

            <CTable className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>{search.length > 0 ? <SearchComponent /> : <AllProduct />}</CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Product
