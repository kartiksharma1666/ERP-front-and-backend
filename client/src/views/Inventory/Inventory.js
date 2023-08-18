import React, { useEffect, useState } from "react";
import InventoryPopUp from "./InventoryPopUp"; // Import the appropriate InventoryPopUp component
import {
  CButton,
  CCard,
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
} from "@coreui/react";

import FloatingButton from '../FloatingButton'

const Inventory = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState({});
  const [deletePop, setDeletePop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addInventory, setAddInventory] = useState(false);
  const [getData, setGetData] = useState(false);

  const product_button_style = {
    height: '40px',
    width: '150px',
  }

  const getDataFromDB = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/inventory/all");
      const resjson = await res.json();
      console.log("data receive from backend",resjson);
      if (resjson.success && Array.isArray(resjson.inventory)) {
        // Map over the inventory items and extract nested properties
        const formattedInventory = resjson.inventory.map(item => ({
          ...item,
          product: item.product,
          category: item.category ? item.category.name : null
        }));
        setData(formattedInventory);
        console.log("this is frontend of inventory all: ",formattedInventory);
      } else {
        console.error("Invalid data format from API:", resjson);
        setData([]); // Set an empty array to prevent map errors
      }
      setGetData(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSearch = () => {
    const filteredInventory = data.filter((item) =>
      item.product.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredInventory);
  };

  const handleAddInventory = () => {
    setIsModalOpen(true);
    setAddInventory(true);
  };

  const handleUpdateInventory = (inventory) => {
    setIsModalOpen(true);
    setSelectedInventory(inventory);
    setEdit(true);
  };

  const handleDeleteInventory = (inventory) => {
    setIsModalOpen(true);
    setSelectedInventory(inventory);
    setDeletePop(true);
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
              <div className="d-flex justify-content-between align-items-center">
                <strong>Inventory</strong>
                <div className="input-group w-50">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary search-button"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={handleAddInventory}
                  style={product_button_style}
                >
                  Add Inventory
                </button>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Product</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Weight (kg)</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {searchResults.length > 0
                    ? searchResults.map((item, index) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">
                            {index + 1}
                          </CTableHeaderCell>
                          <CTableDataCell>{item.product}</CTableDataCell>
                          <CTableDataCell>{item.weight}</CTableDataCell>
                          <CTableDataCell>{item.quantity}</CTableDataCell>
                          <CTableDataCell>{item.category}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="success" shape="rounded-pill"
                              onClick={() => handleUpdateInventory(item)}
                            >
                              Update
                            </CButton>{" "}
                            <CButton
                              color="danger" shape="rounded-pill"
                              onClick={() => handleDeleteInventory(item)}
                            >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    : data.map((item, index) => (
                        
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">
                            {index + 1}
                          </CTableHeaderCell>
                          <CTableDataCell>{item.product}</CTableDataCell>
                          <CTableDataCell>{item.weight}</CTableDataCell>
                          <CTableDataCell>{item.quantity}</CTableDataCell>
                          <CTableDataCell>{item.category}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="success" shape="rounded-pill" 
                              onClick={() => handleUpdateInventory(item)}
                            >
                              Update
                            </CButton>{" "}
                            <CButton
                              color="danger" shape="rounded-pill" style={{marginLeft: '50px'}}
                              onClick={() => handleDeleteInventory(item)}
                            >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <FloatingButton />
      <InventoryPopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedInventory={selectedInventory}
        setSelectedInventory={setSelectedInventory}
        getData={getData}
        setGetData={setGetData}
        edit={edit}
        setEdit={setEdit}
        addInventory={addInventory}
        setAddInventory={setAddInventory}
        deletePop={deletePop}
        setDeletePop={setDeletePop}
      />
    </div>
  );
};

export default Inventory;
