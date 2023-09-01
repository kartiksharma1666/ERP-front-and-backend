import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  CButton,
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
import AttributePopUp from './AttributePopUp'; // Create a separate component for the attribute popup
import FloatingButton from '../floatingbutton/FloatingButton';

Modal.setAppElement('#root');

const Attribute = () => {
  const [data, setData] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState({});
  const [deletePop, setDeletePop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addAttribute, setAddAttribute] = useState(false);
  const [getData, setGetData] = useState(false);

  useEffect(() => {
    getDataFromDB();
  }, [getData]);

  const getDataFromDB = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/attributes/all');
      const resjson = await res.json();
      if (Array.isArray(resjson)) {
        setData(resjson);
        console.log(resjson)
      } else {
        console.error('Invalid data format from API:', resjson);
        setData([]);
      }
      setGetData(false);
    } catch (error) {
      console.error('Error fetching attributes:', error);
    }
  };

  const handleClickToOpen = (attribute, key) => {
    setSelectedAttribute(attribute);
    if (key === 'update') {
      setEdit(true);
    }
    if (key === 'delete') {
      setDeletePop(true);
    }
    setIsModalOpen(true);
  };

  const handleAddAttribute = () => {
    setIsModalOpen(true);
    setAddAttribute(true);
  };

  const attribute_button_style = {
    height: '40px',
    width: '150px',
  };

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Attributes</strong>
        </CCardHeader>
        <CCardBody>
          <div className="d-flex">
            <div className="container">
              {/* Attribute table */}
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
                  {data.map((attribute, index) => (
                    <CTableRow key={attribute._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{attribute.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="success"
                          shape="rounded-pill"
                          onClick={() => handleClickToOpen(attribute, 'update')}
                        >
                          Update
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="danger"
                          shape="rounded-pill"
                          onClick={() => handleClickToOpen(attribute, 'delete')}
                        >
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>
            <button
              style={attribute_button_style}
              className="btn btn-primary"
              onClick={handleAddAttribute}
            >
              Add Attribute
            </button>
          </div>
        </CCardBody>
      </CCard>
      <FloatingButton />
      {/* Rendering AttributePopUp */}
      <AttributePopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedAttribute={selectedAttribute}
        setSelectedAttribute={setSelectedAttribute}
        getData={getData}
        setGetData={setGetData}
        edit={edit}
        setEdit={setEdit}
        addAttribute={addAttribute}
        setAddAttribute={setAddAttribute}
        deletePop={deletePop}
        setDeletePop={setDeletePop}
      />
    </div>
  );
};

export default Attribute;
