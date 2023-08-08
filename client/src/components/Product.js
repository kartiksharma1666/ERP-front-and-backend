import React, { useState } from 'react'
import { setSelectedProduct, setIsModalOpen } from './PopUp'
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
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('');

  const [categories, setCategories] = useState([
    { id: 1, name: 'Cake', order: 300 },
    { id: 2, name: 'Puff', order: 100 },
    { id: 3, name: 'Pastries', order: 500 },
  ])

  const products = [
    { id: 1, name: 'Jeans' },
    { id: 2, name: 'Shoes' },
    { id: 3, name: 'Belts' },
  ]

  const sortedCategories = [...categories].sort((a, b) => b.order - a.order)

  const handleSearch = () => {
    const filteredProd = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const filteredByCategory = filteredProd.filter((product) =>
      sortedCategories.some((category) => category.name === selectedCategory && category.id === product.categoryId)
    );
  const handleCategoryChange = (categoryName) => {
      setSelectedCategory(categoryName);
      handleSearch();
  }
  
    setSearchResults(filteredByCategory);
  };

  const handleClickToOpen = (Product) => {
    props.setIsModalOpen(true)
    props.setSelectedProduct(Product)
  }
  const handleDeleteConfirmation = (product) => {
    
    // Set the selected product to be deleted and open the delete confirmation modal
    props.setSelectedProduct(product);
    props.setDeleteConfirmationOpen(true);
  };

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
                <CDropdownToggle color="primary">
                  {selectedCategory ? selectedCategory : 'Category'}
                </CDropdownToggle>
                <CDropdownMenu>
                  {sortedCategories.map((category) => (
                    <CDropdownItem
                      key={category.id}
                      onClick={() => handleCategoryChange(category.name)} // Update selectedCategory on click
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
                        type="text"
                        className="form-control"
                        placeholder="Search for Product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      ></input>
                      <div className="input-group-append">
                        <button className="btn btn-primary" onClick={handleSearch}>
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  {searchResults.length > 0 && (
                    <div className="row justify-content-center">
                      <div col-md-8>
                        {searchResults.map((product) => (
                          <div key={product.id} className="card mb-2">
                            <div className="card-body">{product.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
                {props.data &&
                  props.data.map(
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
                          <CButton color="success" shape="rounded-pill">
                            Update
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="primary"
                            shape="rounded-pill"
                            onClick={() => handleClickToOpen(item)}
                          >
                            View
                          </CButton>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton
                            color="danger"
                            shape="rounded-pill"
                            onClick={() => handleDeleteConfirmation(item)}
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
