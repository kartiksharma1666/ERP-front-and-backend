import { CRow,CCol } from '@coreui/react'
import React from 'react'
import {BiSolidUser} from 'react-icons/bi'
import {BiEnvelope} from 'react-icons/bi'
import {BsCalendarDate} from 'react-icons/bs'
import {AiOutlineNumber} from 'react-icons/ai'
import {PiNotepadThin} from 'react-icons/pi'
import {SiDialogflow} from 'react-icons/si'

 const Billing = () => {
     const billing ={
        id: 1,
        name: 'Gurleen',
        item: 'iphone 15 promax rose gold',
        quantity: 2,
        price: '$1300',
        totalAmount: '$2600',
        email: 'gurleen21@gmail.com',
        invoiceNumber: '#42D42-0001',
        date: '27th October 2023 19:00'
     }
    
    return(
        <CRow>
            <CCol xs={18}>
             
               <div className='billing-bar d-flex'>
               <div className='invoice' style={{border: '1px solid #fff', background: '#fff',
             width:'60%', padding:'10px',borderRadius:'8px', maxHeight: '300px',
             overflow:'auto'}}>
              <h5>Invoice <span style={{color:"#6681e8"}}>{billing.invoiceNumber} </span> <span
              style={{fontSize:'14px', color: '#c5c6d0'}}>for</span>  {billing.totalAmount}</h5>
              <div className='d-flex'>
                <p style={{fontSize: '15px', border: '1px solid #7f7d9c', borderRadius:'15px',
            background: '#7f7d9c', padding: '5px',color: '#fff'}}>Open</p>
            <p style={{marginLeft: '30px'}}>Due next month</p>
              </div>
              <div className='d-flex' style={{marginTop: '100px'}}>
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
               
                <button className='btn btn-primary' style={{alignItems: 'center', width:'100%'}}>Invoice PDF</button>
             </div>
               </div>
               <div className='d-flex'>
               <div className='invoice ' style={{border: '1px solid #fff', background: '#fff',
             width:'59%', padding:'10px',borderRadius:'8px', marginTop: '30px'}}>
              <h5>History</h5>
              <div style={{marginTop: '30px'}}>
              <div className='d-flex'>
                <BiEnvelope style={{background: '#6681e8', borderRadius: '50%',
            fontSize: '35px', color: "#fff", padding: '8px'}}/>
        <p style={{marginLeft: '20px', fontSize: '20px', fontWeight: '500px'}}>Invoice was sent to {billing.email} <br />
             <span style={{fontSize: '15px'}}>Jul 2, 2023 2:56 PM</span></p>
              </div>
              <div className='d-flex'>
                <PiNotepadThin style={{background: '#6681e8', borderRadius: '50%',
            fontSize: '35px', color: "#fff", padding: '8px'}}/>
        <p style={{marginLeft: '20px', fontSize: '20px', fontWeight: '500px'}}>Invoice was finalizes <br />
             <span style={{fontSize: '15px'}}>Jul 2, 2023 2:54 PM</span></p>
              </div>
              <div className='d-flex'>
                <PiNotepadThin style={{background: '#6681e8', borderRadius: '50%',
            fontSize: '35px', color: "#fff", padding: '8px'}}/>
        <p style={{marginLeft: '20px', fontSize: '20px', fontWeight: '500px'}}>Invoice {billing.invoiceNumber} <br />
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
                <div style={{marginTop: '20px'}}>
                    <h2 >Ask us</h2>
                    <p>If you have a question or encounter a problem, <br /> we can help you ant time</p>
                </div>
                <button className='btn btn-primary' style={{alignItems: 'center', width:'100%', marginTop:'50px'}}>Ask a question</button>
             </div>
               </div>
           
               
            </CCol>
        </CRow>
    )
  
}
export default Billing
