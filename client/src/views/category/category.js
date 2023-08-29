import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import CategoryPopUp from './categoryPopUp';
import {
  CButton,
  CForm,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';

import FloatingButton from '../FloatingButton'

Modal.setAppElement('#root');

const Category = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [deletePop, setDeletePop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [getData, setGetData] = useState(false);

  useEffect(() => {
    getDataFromDB();
  }, [getData]);

  const getDataFromDB = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/category/all');
      const resjson = await res.json();
      if (resjson.success && Array.isArray(resjson.categories)) {
        setData(resjson.categories);
      } else {
        console.error('Invalid data format from API:', resjson);
        setData([]);
      }
      setGetData(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = () => {
    const filteredCategories = data.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredCategories);
  };

  const handleClickToOpen = (category, key) => {
    setSelectedCategory(category);
    if (key === 'update') {
      setEdit(true);
    }
    if (key === 'delete') {
      setDeletePop(true);
    }
    setIsModalOpen(true);
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
    setAddCategory(true);
  };

  const product_button_style = {
    height: '40px',
    width: '150px',
  }

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Categories</strong>
        </CCardHeader>
        <CCardBody>
          <div className="d-flex">
            <div className="container">
              {/* Search bar */}
              <div className="input-group mb-3">
                <input style={{borderRadius: '5px'}}
                  type="text"
                  className="form-control"
                  placeholder="Search for Categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary search-button" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>

              {/* Category table */}
              <CTable className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {searchResults.length > 0
                    ? searchResults.map((category, index) => (
                        <CTableRow key={category._id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{category.name}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="success"
                              shape="rounded-pill"
                              onClick={() => handleClickToOpen(category, 'update')}
                            >
                              Update
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              shape="rounded-pill"
                              onClick={() => handleClickToOpen(category, 'delete')}
                            >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    : data.map((category, index) => (
                        <CTableRow key={category._id}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{category.name}</CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="success"
                              shape="rounded-pill"
                              onClick={() => handleClickToOpen(category, 'update')}
                            >
                              Update
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              shape="rounded-pill"
                              onClick={() => handleClickToOpen(category, 'delete')}
                            >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                </CTableBody>
              </CTable>
            </div>
            <button style={product_button_style} className="btn btn-primary" onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
        </CCardBody>
      </CCard>
      <FloatingButton />
      {/* Rendering CategoryPopUp */}
      <CategoryPopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        getData={getData}
        setGetData={setGetData}
        edit={edit}
        setEdit={setEdit}
        addCategory={addCategory}
        setAddCategory={setAddCategory}
        deletePop={deletePop}
        setDeletePop={setDeletePop}
      />
    </div>
  );
};

 

export default Category;
