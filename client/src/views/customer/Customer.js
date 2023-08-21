import React from 'react'
import  { useState,useEffect } from 'react'
import Modal from 'react-modal';
import { Container, Row, Col } from 'react-bootstrap';
import {FloatingButton} from './FloatingButton'





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
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import FloatingButton from '../FloatingButton'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { DocsExample } from 'src/components'
import { FloatingButton } from '../FloatingButton';
Modal.setAppElement('#root')

 const Customer = () => {
    
    const [data, setdata] = useState(null)

    
  
  
  
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  
    const progressExample = [
      { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
      { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
      { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
      { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
      { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
    ]
  
    const progressGroupExample1 = [
      { title: 'Monday', value1: 34, value2: 78 },
      { title: 'Tuesday', value1: 56, value2: 94 },
      { title: 'Wednesday', value1: 12, value2: 67 },
      { title: 'Thursday', value1: 43, value2: 91 },
      { title: 'Friday', value1: 22, value2: 73 },
      { title: 'Saturday', value1: 53, value2: 82 },
      { title: 'Sunday', value1: 9, value2: 69 },
    ]
  
    const progressGroupExample2 = [
      { title: 'Male', icon: cilUser, value: 53 },
      { title: 'Female', icon: cilUserFemale, value: 43 },
    ]
  
    const progressGroupExample3 = [
      { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
      { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
      { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
      { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
    ]
  
    const tableExample = [
      {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: 'Yiorgos Avraamu',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'USA', flag: cifUs },
        usage: {
          value: 50,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: { name: 'Mastercard', icon: cibCcMastercard },
        activity: '10 sec ago',
      },
      {
        avatar: { src: avatar2, status: 'danger' },
        user: {
          name: 'Avram Tarasios',
          new: false,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Brazil', flag: cifBr },
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'info',
        },
        payment: { name: 'Visa', icon: cibCcVisa },
        activity: '5 minutes ago',
      },
      {
        avatar: { src: avatar3, status: 'warning' },
        user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
        country: { name: 'India', flag: cifIn },
        usage: {
          value: 74,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'warning',
        },
        payment: { name: 'Stripe', icon: cibCcStripe },
        activity: '1 hour ago',
      },
      {
        avatar: { src: avatar4, status: 'secondary' },
        user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
        country: { name: 'France', flag: cifFr },
        usage: {
          value: 98,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'danger',
        },
        payment: { name: 'PayPal', icon: cibCcPaypal },
        activity: 'Last month',
      },
      {
        avatar: { src: avatar5, status: 'success' },
        user: {
          name: 'Agapetus Tadeáš',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Spain', flag: cifEs },
        usage: {
          value: 22,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'primary',
        },
        payment: { name: 'Google Wallet', icon: cibCcApplePay },
        activity: 'Last week',
      },
      {
        avatar: { src: avatar6, status: 'danger' },
        user: {
          name: 'Friderik Dávid',
          new: true,
          registered: 'Jan 1, 2021',
        },
        country: { name: 'Poland', flag: cifPl },
        usage: {
          value: 43,
          period: 'Jun 11, 2021 - Jul 10, 2021',
          color: 'success',
        },
        payment: { name: 'Amex', icon: cibCcAmex },
        activity: 'Last week',
      },
    ]
    const [categories,setCategories] = useState([
      {id: 1, name: 'Cake', order: 300},
      {id: 2, name: 'Puff', order: 100},
      {id: 3, name: 'Pastries', order: 500}
    ])
    const sortedCategories =  [...categories].sort((a, b) => b.order - a.order)
  
    const products = [
      { id: 1, name: 'Jeans' },
      { id: 2, name: 'Shoes' },
      { id: 3, name: 'Belts' },
    ];

  
  
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false)
    const [customers, setCustomers] = useState( [
    {
        id: 1,
        name: 'Omkar',
        country: 'India',
        Age: '21'
    },
    {
        id: 2,
        name: 'Kartik',
        country: 'India',
        Age: '21'
    },
    {
        id: 3,
        name: 'Dacosta',
        country: 'Ghana',
        Age: '27'
    }
])

const [newCustomerData, setNewCustomerData] = useState({
    id: customers.length > 0 ? Math.max(...customers.map((customer) => customer.id)) + 1 : 1,
    name: '',
    country: '',
    Age: '',
  });

    
  const handleClickToOpen = (Product) => {
    setIsModalOpen(true);
    setSelectedCustomer(Product);
  };

  const handleToClose = () => {
    setIsModalOpen(false);
  };
  
  
  const handleSearch = () => {
      const filterdProd = products.filter( product =>
        product.name.toLowerCase().includes(search.toLowerCase))
  
    }

    const handleDelete = (id) => {
        const updatedCustomers = customers.filter((customer) => customer.id !== id);
  
        setCustomers(updatedCustomers);
    }
  
    //const openInPopup = item => {
    //       setRecordForEdit(item)
    //     setOpenPopup(true)
    //}
    
    const addCustomer = (e) => {
       e.preventDefault();
       const info = {
        id: customers.length > 0 ? Math.max(...customers.map((customer) => customer.id)) + 1 : 1,
        name: newCustomerData.name,
        country: newCustomerData.country,
        Age: newCustomerData.Age
       }
       setCustomers((prevCustomers) => [...prevCustomers, info]);
  setNewCustomerData({ name: '', country: '', Age: '' });
    }

   

    const handleAddCustomer = () => {
        addCustomer(newCustomerData);
        setNewCustomerData({ name: '', country: '', Age: '' });
    }

    const handleInputChange = (e) => {
        e.persist();
        setNewCustomerData({...newCustomerData, [e.target.name]: e.target.value})
      };
    
    
    return(
    <>
    <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Customers</strong>
            </CCardHeader>
            <CCardBody>
            <div className='d-flex'>   
       <div className='container' style={{zIndex: 0}}>
        <div className=' row '>
          <div className='col-md-8'>
            <div className='input-group mb-3'>
            <input type='text'
            className='form-control'
            placeholder='Search for Customer...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}>
            </input>
            <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div >
          <button className=' btn btn-primary ms-5' onClick={handleClickToOpen}>Add Customer</button>
        </div>
        </div>
          </div>
          {searchResults.length > 0 && (
            <div className='row justify-content-center'>
              <div col-md-8>
                {searchResults.map((customer)=> (
                  <div key={customer.id} className='card mb-2'>
                    <div className='card-body'>{customer.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
       </div>
       </div>
            
       <CTable className='customer-table mt-4'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Age</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {customers &&
                    customers.map(
                      (
                        item,
                        index, // Check if data is available before mapping
                      ) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.country}</CTableDataCell>
                          <CTableDataCell>{item.Age}</CTableDataCell>
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
                            <CButton color="primary" shape="rounded-pill" >
                              View
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="danger" shape="rounded-pill" onClick={() => handleDelete(item.id)} >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ),
                    )}
                </CTableBody>
              </CTable>

              <Modal
        isOpen={isModalOpen}
        onRequestClose={handleToClose}
        contentLabel="Customer Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            width: '50%', // Adjust the width as needed
            maxHeight: '100%', // Adjust the height as needed
            maxWidth: '800px', // Limit the maximum width of the modal
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Translate to center
            zIndex: 1,
          },
        }}
      >
       <Container >
      <Row className="justify-content-center align-items-center overflow-hidden">
        <Col xs={12} md={8} lg={8}>
          <div className='d-flex'>
          <h2 className="text-center" style={{textAlign: 'center'}}>New Customer</h2>
          <div className="d-flex justify-content-center">
          </div>
          </div>
          <div className="d-flex flex-column mt-4">
            <form onSubmit={addCustomer}>
            <input className="mb-3 form-control" type="text"  name='name' value={customers.name} placeholder="Name" onChange={handleInputChange}/>
            <input className="mb-3 form-control" type="text"  name='country' value={customers.country} placeholder="Country" onChange={handleInputChange}/>
            <input className="form-control" type="text"  name='Age' value={customers.Age} placeholder="Age" onChange={handleInputChange}/>
            </form>          
          </div>
          <button type='submit ' className='btn btn-primary mt-4 overflow-hidden' style={{marginLeft: '100px'}}
          onClick={addCustomer}>Add Customer</button>
        </Col>
      </Row>
    </Container>
      </Modal>
              
              
              
              
              {/* watch
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Age</CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    
                  </CTableRow>
                </CTableHead>
                </CTable>
                <CTableBody>

                  {customers &&
                    customers.map(
                      (
                        item,
                        index, // Check if data is available before mapping
                      ) => (
                        <CTableRow key={index}>
                          <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                          <CTableDataCell>{item.name}</CTableDataCell>
                          <CTableDataCell>{item.country}</CTableDataCell>
                          <CTableDataCell>{item.Age}</CTableDataCell>

                          
                          <CTableDataCell>
                            <CButton color="info" shape="rounded-pill" onClick={() => addCustomer(item.id)}>
                              Info
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="success" shape="rounded-pill" onClick={() => alert(item.id)}>
                              Update
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="primary" shape="rounded-pill" onClick={() => alert(item.id)}>
                              View
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton color="danger" shape="rounded-pill" onClick={() => handleDelete(item.id)}>
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ),
                      <CTableRow>
                      </CTableRow>
                    )}
                </CTableBody>
               {/*} <CDropdown  className='mt-3'>
          <CDropdownToggle color="primary">Add New Customer</CDropdownToggle>
          <CDropdownMenu>         
              <CDropdownItem >
                <div className='mb-3'>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newCustomerData.name}
                  onChange={handleInputChange}
                  name="name"
                />
                </div>
              </CDropdownItem>       
          </CDropdownMenu>
        </CDropdown>8
              </CTable>
              

              {/* <CTableRow>
                      <CTableHeaderCell scope="row">2</CTableHeaderCell>
                      <CTableDataCell>Jacob</CTableDataCell>
                      <CTableDataCell>Thornton</CTableDataCell>
                      <CTableDataCell><CButton color="info" shape="rounded-pill">Info</CButton></CTableDataCell>
                      <CTableDataCell><CButton color="success" shape="rounded-pill">Update</CButton></CTableDataCell>
                      <CTableDataCell><CButton color="primary" shape="rounded-pill">View</CButton></CTableDataCell>
                      <CTableDataCell><CButton color="danger" shape="rounded-pill">Delete</CButton></CTableDataCell>
                    
                    </CTableRow>
                    <CTableRow>
                      <CTableHeaderCell scope="row">3</CTableHeaderCell>
                      <CTableDataCell colSpan="2">Larry the Bird</CTableDataCell>
                      <CTableDataCell><CButton color="info" shape="rounded-pill">Info</CButton></CTableDataCell>
                      <CTableDataCell><CButton color="success" shape="rounded-pill">Update</CButton></CTableDataCell>
                      <CTableDataCell><CButton color="primary" shape="rounded-pill">View</CButton></CTableDataCell>
                      <CTableDataCell><CButton color="danger" shape="rounded-pill">Delete</CButton></CTableDataCell>
                   
                    </CTableRow> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> 
      <FloatingButton />
      
    </>
);
};
export default Customer;