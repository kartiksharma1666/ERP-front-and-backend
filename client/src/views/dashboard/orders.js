import React, { useEffect, useState } from 'react'
import OrderPopUp from './orderPopUp' // Import the appropriate OrderPopUp component

import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CDropdownItem,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import FloatingButton from '../floatingbutton/FloatingButton'

const Orders = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedOrder, setSelectedOrder] = useState({})
  const [deletePop, setDeletePop] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [addOrder, setAddOrder] = useState(false)
  const [getData, setGetData] = useState(false)
  const [orders, setOrders] = useState('')

  const product_button_style = {
    height: '40px',
    width: '150px',
  }

  const getDataFromDB = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/Billing/getInvoices/all')
      const resjson = await res.json()
      console.log(resjson)
      setOrders(resjson)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearch = () => {
    const filteredOrders = data.filter((order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()),
    )
    setSearchResults(filteredOrders)
  }

  const handleClickToOpen = (order, key) => {
    setSelectedOrder(order)
    if (key === 'update') {
      setEdit(true)
    }
    if (key === 'delete') {
      setDeletePop(true)
    }
    setIsModalOpen(true)
  }

  const handleAddOrder = () => {
    setIsModalOpen(true)
    setAddOrder(true)
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
              <strong>Orders</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-flex mt-2">
                <div className="container ">
                  <div className=" row justify-content-center" style={{ marginRight: '50px' }}>
                    <div className="col-md-8">
                      <div className="input-group mb-3">
                        <input
                          style={{ borderRadius: '5px' }}
                          type="text"
                          className="form-control"
                          placeholder="Search for Customers..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          stye={{ width: '81%' }}
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
                          {searchResults.map((order) => (
                            <div key={order._id} className="card mb-2">
                              <div className="card-body">{order.orderNumber}</div>
                              <div className="card-body">{order.customerName}</div>
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
                    onClick={handleAddOrder}
                    style={product_button_style}
                  >
                    Add Order
                  </button>
                </div>
              </div>

              <CTable className="mb-0 border mt-4" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">OrderNumber</CTableHeaderCell>
                    <CTableHeaderCell scope="col">CustomerName</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TotalAmount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">OrderStatus</CTableHeaderCell>
                    <CTableHeaderCell scope="col">OrderMedium</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {orders &&
                    orders
                      .slice(0)
                      .reverse()
                      .map(
                        (
                          item,
                          index, // Check if data is available before mapping
                        ) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{item.invoiceNumber}</CTableDataCell>
                            <CTableDataCell>{item.client?.name}</CTableDataCell>
                            <CTableDataCell>{item.total}</CTableDataCell>
                            <CTableDataCell>{item.status}</CTableDataCell>
                            <CTableDataCell> order medium</CTableDataCell>
                            {/* <CTableDataCell>
                            <button
                              className='crud-button'
                              
                            >
                              Info
                            </button>
                          </CTableDataCell> */}
                            <CTableDataCell>
                              <CButton
                                color="success"
                                variant="outline"
                                onClick={() => handleClickToOpen(item, 'update')}
                              >
                                Update
                              </CButton>
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                color="warning"
                                variant="outline"
                                onClick={() => handleClickToOpen(item, 'view')}
                              >
                                View
                              </CButton>
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton
                                color="danger"
                                variant="outline"
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
      <OrderPopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        getData={getData}
        setGetData={setGetData}
        edit={edit}
        setEdit={setEdit}
        addOrder={addOrder}
        setAddOrder={setAddOrder}
        deletePop={deletePop}
        setDeletePop={setDeletePop}
      />
    </div>
  )
}

export default Orders
