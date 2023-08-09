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

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [categories, setCategories] = useState([
    { id: 1, name: 'Cake', order: 300 },
    { id: 2, name: 'Puff', order: 100 },
    { id: 3, name: 'Pastries', order: 500 },
  ])

  const product_button_style = {
    marginRight: '75px',
    height: '42px',
    width: '158px',
  }

  const sortedCategories = [...categories].sort((a, b) => b.order - a.order)

  const getDataFromDB = async () => {
    const res = await fetch('http://localhost:8080/api/products/all').catch((err) => {
      console.log(err)
    })

    const resjson = await res.json()
    console.log(resjson)
    setdata(resjson)
    props.setGetData(false)
  }

  const handleSearch = () => {
    console.log(search)
    const filterdProd = data.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
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
  }, [props.getData])

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
                <CDropdownToggle color="primary">Category</CDropdownToggle>
                <CDropdownMenu>
                  {sortedCategories.map((category) => (
                    <CDropdownItem key={category.id} href="#">
                      {category.name}
                      <span style={{ marginLeft: '5px', color: '#800808' }}>
                        {category.order} Orders
                      </span>
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
              <div className="container">
                <div className=" row justify-content-center">
                  <div className="col-md-8">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search for Product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      ></input>
                      <div className="input-group-append">
                        <button className="btn btn-primary search-button" onClick={handleSearch}>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="row justify-content-center">
                      <div col-md-8>
                        {searchResults.map((product) => (
                          <div key={product._id} className="card mb-2">
                            <div className="card-body">{product.name}</div>
                            <div className="card-body">{product.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

            <CTable>
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
              <CTableBody>
                {data &&
                  data.map(
                    (
                      item,
                      index, // Check if data is available before mapping
                    ) => (
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
                    ),
                  )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Product
