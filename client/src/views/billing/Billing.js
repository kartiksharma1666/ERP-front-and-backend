import { CRow,CCol } from '@coreui/react'
import React from 'react'

 const Billing = () => {
    
    
    return(
        <CRow>
            <CCol xs={18}>
               <div className='billing-bar d-flex' style={{width: '100%',
            background: '#fff', padding: '15px'}}>
                <h3>Customer Billing</h3>
                <div className='customer-search'>
                  <input  type="text"
                  placeholder="Search Customer..." aria-label="Search Customer..." 
                  aria-describedby="basic-addon1" style={{padding: '5px', marginLeft: '70px',
                  borderRadius: '5px', background: '#e5e5e5'}}></input>
                  <button className='btn btn-primary'>Search</button>
                 
                    <button className='btn btn-warning' style={{marginLeft: '200px'}}>Print</button>
              
                </div>
               </div>
               
            </CCol>
        </CRow>
    )
  
}
export default Billing
