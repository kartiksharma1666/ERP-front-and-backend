import React, { useEffect, useState } from 'react'
import CustomerPopUp from './customerPopUp'
import FloatingButton from '../FloatingButton'

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

const Customer = () => {
  const [data, setdata] = useState(null)

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState({})
  const [deletePop, setDeletePop] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [addCustomer, setAddCustomer] = useState(false)
  const [getData, setGetData] = useState(false)

  const product_button_style = {
    height: '40px',
    width: '150px',
  }

  const getDataFromDB = async () => {
    const res = await fetch('http://localhost:8080/api/customer/all').catch((err) => {
      console.log(err)
    })

    const resjson = await res.json()
    console.log(resjson)

    if (resjson.success && Array.isArray(resjson.customers)) {
      setdata(resjson.customers)
    } else {
      console.error('Invalid data format from API:', resjson)
      setdata([]) // Set an empty array to prevent map errors
    }
    setGetData(false)
  }

  const handleSearch = () => {
    console.log(search)
    const filterdProd = data.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()),
    )
    setSearchResults(filterdProd)
  }

  const handleClickToOpen = (customer, key) => {
    setSelectedCustomer(customer)
    if (key == 'update') {
      setEdit(true)
    }
    if (key == 'delete') {
      setDeletePop(true)
    }
    setIsModalOpen(true)
  }

  const handleAddCustomer = () => {
    setIsModalOpen(true)
    setAddCustomer(true)
  }

  const handleDeleteConfirmation = (customer) => {
    setSelectedCustomer(customer)
    setDeletePop(true)
  }

  useEffect(() => {
    getDataFromDB()
  }, [getData])

  return (
    <div>
      
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Customers</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex mt-2">
                <div className="container">
                  <div className=" row justify-content-center">
                    <div className="col-md-8">
                      <div className="input-group mb-3">
                        <input style={{borderRadius: '5px', }}
                          type="text"
                          className="form-control"
                          placeholder="Search for Customers..."
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
                        <div className="col-md-8">
                          {searchResults.map((customer) => (
                            <div key={customer._id} className="card mb-2">
                              <div className="card-body">{customer.name}</div>
                              <div className="card-body">{customer.phone}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                <button
                  className=" btn btn-primary"
                  onClick={handleAddCustomer}
                  style={product_button_style}
                >
                  Add Customer
                </button>
                </div>
              </div>

              <CTable className="mb-0 border mt-4" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
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
                          <CTableDataCell>{item.email}</CTableDataCell>
                          <CTableDataCell>{item.phone}</CTableDataCell>
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
      <FloatingButton />
      <CustomerPopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        getData={getData}
        setGetData={setGetData}
        edit={edit}
        setEdit={setEdit}
        addCustomer={addCustomer}
        setAddCustomer={setAddCustomer}
        deletePop={deletePop}
        setDeletePop={setDeletePop}
      />
    </div>
    
  )
}

export default Customer
