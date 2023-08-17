import { CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell, CTableBody, CFormTextarea, CDropdown, CDropdownToggle,  CDropdownMenu, CDropdownItem} from '@coreui/react'
import React from 'react'
import {BiSolidUser} from 'react-icons/bi'
import {BiEnvelope} from 'react-icons/bi'
import {BsCalendarDate} from 'react-icons/bs'
import {AiOutlineNumber} from 'react-icons/ai'
import {PiNotepadThin} from 'react-icons/pi'
import {SiDialogflow} from 'react-icons/si'
import {AiFillDelete} from 'react-icons/ai'
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

 const Billing = () => {    
     const billing ={
        id: 1,
        name: 'Gurleen',
        item: 'Chocolate Cake',
        quantity: 2,
        price: '350',
        totalAmount: '630',
        email: 'gurleen21@gmail.com',
        invoiceNumber: '#42D42-0001',
        date: '27th October 2023 19:00'
     }
    
    return(
        <CRow>
            <CCol xs={18}>
             
               <div className='billing-bar d-flex'>
               <div className='invoice' style={{border: '1px solid #fff', background: '#fff',
             width:'60%', padding:'10px',borderRadius:'8px', marginBottom: '45px',
             overflow:'auto'}}>
              <h5>Invoice <span style={{color:"#6681e8"}}>{billing.invoiceNumber} </span> <span
              style={{fontSize:'14px', color: '#c5c6d0'}}>for</span>  {billing.totalAmount}</h5>
              <div className='d-flex'>
                <p style={{fontSize: '15px', border: '1px solid #7f7d9c', borderRadius:'15px',
            background: '#7f7d9c', padding: '5px',color: '#fff', marginTop:'15px'}}>Open</p>
            <p style={{marginLeft: '30px', marginTop: '15px'}}>Due next month</p>
              </div>
              <div className='d-flex' style={{marginTop: '30px'}}>
                <button className='btn btn-dark' >Send Invoice</button>
                <button className='btn btn-light ms-4' >Edit Invoice</button>
                <button className='btn btn-light ms-4'>Add note</button>
              </div>
               </div>
               <div className='details ms-4' style={{border: '1px solid #fff', background: '#fff',
             width:'40%', padding:'10px',borderRadius:'8px'
             }}>
                <h5>Details</h5>
                
                <p><BiSolidUser style={{fontSize: '14px'}}/>  {billing.name}</p>
                <p><BiEnvelope style={{fontSize: '14px'}}/>  {billing.email}</p>
                <p><BsCalendarDate style={{fontSize: '14px'}}/>  {billing.date}</p>
                <p><AiOutlineNumber style={{fontSize: '14px'}}/>  {billing.invoiceNumber}</p>
               
                <button className='btn btn-primary' style={{alignItems: 'center', width:'100%', marginTop: '20px'}}>Invoice PDF</button>
             </div>
               </div>
               <div className='d-flex'>
               <div className='invoice ' style={{border: '1px solid #fff', background: '#fff', marginTop: '-18px', 
             width:'60%', padding:'10px',borderRadius:'8px'}}>
              <h5>History</h5>
              <div style={{marginTop: '25px'}}>
              <div className='d-flex'>
                <BiEnvelope style={{background: '#6681e8', borderRadius: '50%',
            fontSize: '40px', color: "#fff", padding: '8px'}}/>
        <p style={{marginLeft: '20px', fontSize: '18px', fontWeight: '500px'}}>Invoice was sent to {billing.email} <br />
             <span style={{fontSize: '15px'}}>Jul 2, 2023 2:56 PM</span></p>
              </div>
              <div className='d-flex'>
                <PiNotepadThin style={{background: '#6681e8', borderRadius: '50%',
            fontSize: '40px', color: "#fff", padding: '8px'}}/>
        <p style={{marginLeft: '20px', fontSize: '18px', fontWeight: '500px'}}>Invoice was finalizes <br />
             <span style={{fontSize: '15px'}}>Jul 2, 2023 2:54 PM</span></p>
              </div>
              <div className='d-flex'>
                <PiNotepadThin style={{background: '#6681e8', borderRadius: '50%',
            fontSize: '40px', color: "#fff", padding: '8px'}}/>
        <p style={{marginLeft: '20px', fontSize: '18px', fontWeight: '500px'}}>Invoice {billing.invoiceNumber} <br />
             <span style={{fontSize: '15px'}}>Jul 2, 2023 1:32 PM</span></p>
              </div>
               </div>  
               </div>
               <div className='details ms-4' style={{border: '1px solid #fff', background: '#fff',
             width:'40%', padding:'10px',borderRadius:'8px',
             marginTop:'27px'}}>
                <div>
                    <h5><SiDialogflow style={{color: '#6681e8', fontSize: '50px'}}/></h5>
                </div>
                <div style={{marginTop: '15px'}}>
                    <h4>Ask us</h4>
                    <p>If you have a question or encounter a problem, <br /> we can help you ant time</p>
                </div>
                <button className='btn btn-primary' style={{alignItems: 'center', width:'100%', marginTop:'10px'}}>Ask a question</button>
             </div>
               </div>

            <div className='billing-bar d-flex'>
                <div className='invoice' style={{border: '1px solid #fff', background: '#fff', marginTop: '28px', 
             width:'100%', padding:'10px',borderRadius:'8px', 
             overflow:'auto'}}>
                <h5>Items</h5>
                <div className='d-flex' style={{fontSize: '15px'}}>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                        <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                        <CTableHeaderCell scope="col">QTY</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Discount(%)</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Total Amount</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow>
                        <CTableDataCell>Chocolate Cake</CTableDataCell>
                        <CTableDataCell>2</CTableDataCell>
                        <CTableDataCell>350</CTableDataCell>
                        <CTableDataCell>10</CTableDataCell>
                        <CTableDataCell>630</CTableDataCell>
                        <CTableDataCell><AiFillDelete style={{background: '#6681e8', borderRadius: '50%',
            fontSize: '35px', color: "#fff", padding: '8px'}}/></CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
                </div>
            </div>
            </div>

            <div className='invoice' style={{marginTop: '15px', float:'right', 
             width:'40%', padding:'10px',borderRadius:'8px'}}>
                <h5>Invoice Summary</h5>
                <CTable>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Sub Total: </CTableDataCell>
                        </CTableRow>
                    </CTableBody> 
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>VAT(%)</CTableDataCell>
                        </CTableRow>
                    </CTableBody> 
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Total</CTableDataCell>
                        </CTableRow>
                    </CTableBody> 
                </CTable>
             </div>

             <div style={{marginTop: '190px'}}>

                <p style={{marginLeft: '8px'}}>Tax Rates(%)</p>
                <CTable style={{width: '20%'}}>
                    <CTableBody>
                        <CTableRow>
                            <CTableDataCell>0</CTableDataCell>
                        </CTableRow>
                    </CTableBody> 
                </CTable>

                <p style={{marginLeft: '540px', marginTop: '-75px'}}>Due Date</p>
                <DatePicker style={{width: '200px', marginLeft: '530px'}}></DatePicker>

                <p style={{marginLeft: '1100px', marginTop:'-120px', padding: '2px'}}>Currency</p>
                <CDropdown>
                <CDropdownToggle color='' style={{fontSize: '15px', marginLeft: '1095px', border: '1px solid #fff', background: '#fff', width: '200px', marginBottom: '-5px'}}>Select Currency</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem>Rupees</CDropdownItem>
                    <CDropdownItem>Dollars</CDropdownItem>
                    <CDropdownItem>Euros</CDropdownItem>\
                    <CDropdownItem>Pounds</CDropdownItem>
                </CDropdownMenu>
                </CDropdown>
             </div>

             <div className='invoice ' style={{border: '1px solid #fff', background: '#fff', marginTop: '28px', 
             width:'100%', padding:'10px',borderRadius:'8px'}}>
              <h5>Note/Payment Info</h5>
                <CFormTextarea rows={4} style={{marginTop: '15px', marginBottom: '10px'}}>Provide additional details or terms of service</CFormTextarea>
               </div>

            <div>
            <button className='btn btn-primary' style={{alignItems: 'center', width:'15%', marginTop:'25px', marginLeft: '550px'}}>Save and Continue</button>
            </div>
            </CCol>
        </CRow>
    )

}
export default Billing
