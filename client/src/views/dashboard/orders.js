import React, { useEffect, useState } from 'react';
import OrderPopUp from './orderPopUp'; // Import the appropriate OrderPopUp component

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
  CDropdownToggle
} from '@coreui/react';

import FloatingButton from '../FloatingButton'

const Orders = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [deletePop, setDeletePop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addOrder, setAddOrder] = useState(false);
  const [getData, setGetData] = useState(false);

  const product_button_style = {
    height: '40px',
    width: '150px',
  };

  const initialState = {
    items: [],
    total: 0,
    notes: 'new of notess',
    rates: '',
    vat: 0,
    currency: '',
    invoiceNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Invoice',
    creator: '',
  }

  const orders = [{
    id: 1,
    name: 'Dacosta',
    total: '123',
    status: 'ok',
    currency: 'INR',
    items: ["cake", "drinks"]
  },
  {
    id: 2,
    name: 'Gurleen',
    total: '156',
    status: 'ok',
    currency: 'USD',
    items: ["pastry", "book"]
  },
  {
    id: 3,
    name: 'Omkar',
    total: '868',
    status: 'ok',
    currency: 'pounds',
    items: ["book", "drinks", "cake"]
  },
  {
    id: 4,
    name: 'Kartik',
    total: '5688',
    status: 'ok',
    currency: 'Euros',
    items: ["chocolate"]
  }]

  const getDataFromDB = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/order/all');
      const resjson = await res.json();
      if (resjson.success && Array.isArray(resjson.orders)) {
        setData(resjson.orders);
        console.log("inside orders")
      } else {
        console.error('Invalid data format from API:', resjson);
        setData([]); // Set an empty array to prevent map errors
      }
      setGetData(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const filteredOrders = data.filter((order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredOrders);
  };

  const handleClickToOpen = (order, key) => {
    setSelectedOrder(order);
    if (key === 'update') {
      setEdit(true);
    }
    if (key === 'delete') {
      setDeletePop(true);
    }
    setIsModalOpen(true);
  };

  const handleAddOrder = () => {
    setIsModalOpen(true);
    setAddOrder(true);
  };

  useEffect(() => {
    getDataFromDB();
  }, [getData]);

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
                  <div className=" row justify-content-center" style={{marginRight: '50px'}}>
                    <div className="col-md-8">
                      <div className="input-group mb-3">
                        <input style={{borderRadius: '5px'}}
                          type="text"
                          className="form-control"
                          placeholder="Search for Customers..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          stye={{width: '81%'}}
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
                {/* <div>
                <button
                  className=" btn btn-primary"
                  onClick={handleAddOrder}
                  style={product_button_style}
                >
                  Add Order
                </button>
                </div> */}
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
                    {/* <CTableHeaderCell>
                    <CDropdown>
                      <CDropdownToggle color="primary">Items</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>
                            {initialState.items}
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableHeaderCell> */}
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {orders &&
                    orders.map(
                      (
                        item,
                        index, // Check if data is available before mapping
                      ) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item.id}</CTableDataCell>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.total}</CTableDataCell>
                          <CTableDataCell>{item.status}</CTableDataCell>
                          <CTableDataCell>{item.currency}</CTableDataCell>
                          {/* <CTableDataCell>{orders.name}</CTableDataCell> */}
                          {/* <CTableDataCell>
                            <button
                              className='crud-button'
                              
                            >
                              Info
                            </button>
                          </CTableDataCell> */}
                          {/* <CTableDataCell>
                          <CDropdown>
                            <CDropdownToggle color="primary">Items</CDropdownToggle>
                            <CDropdownMenu>
                              
                            </CDropdownMenu>
                          </CDropdown>
                          </CTableDataCell> */}
                          <CTableDataCell>
                            <CDropdown>
                              <CDropdownToggle color="primary">Items</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem>
                                    {item.items}
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                          </CTableDataCell>
                          <CTableDataCell>
                            <button
                             className="crud-button2"
                              onClick={() => handleClickToOpen(item, 'update')}
                            >
                              Update
                            </button>
                          </CTableDataCell>
                          <CTableDataCell>
                            <button
                             className='crud-button3'
                              onClick={() => handleClickToOpen(item, 'view')}
                            >
                              View
                            </button>
                          </CTableDataCell>
                          <CTableDataCell>
                            <button
                              className='crud-button4'
                              onClick={() => handleClickToOpen(item, 'delete')}
                            >
                              Delete
                            </button>
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
  );
};

export default Orders;