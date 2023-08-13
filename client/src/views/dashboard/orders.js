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
} from '@coreui/react';

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

  const order_button_style = {
    marginRight: '75px',
    height: '50px',
    width: '158px',
  };

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
            <div className="d-flex">
                <div className="container">
                  <div className=" row justify-content-center">
                    <div className="col-md-8">
                      <div className="input-group mb-3">
                        <input
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
                <button
                  className=" btn btn-primary "
                  onClick={handleAddOrder}
                  style={order_button_style}
                >
                  Add Order
                </button>
              </div>

              <CTable className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">OrderNumber</CTableHeaderCell>
                    <CTableHeaderCell scope="col">CustomerName</CTableHeaderCell>
                    <CTableHeaderCell scope="col">TotalAmount</CTableHeaderCell>
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
                          <CTableDataCell>{item.orderNumber}</CTableDataCell>
                          <CTableDataCell>{item.customerName}</CTableDataCell>
                          <CTableDataCell>{item.totalAmount}</CTableDataCell>
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
