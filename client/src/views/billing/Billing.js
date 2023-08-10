import { CRow, CCol, CTable, CTableHead, CTableRow,CTableHeaderCell, CTableDataCell } from '@coreui/react'
import React from 'react'

const Billing = () => {


    return (
        <><div>
            <CRow>
                <CCol xs={18}>
                    <div className='billing-bar d-flex' style={{
                        width: '100%',
                        background: '#fff', padding: '15px'
                    }}>
                        <h3>Customer Billing</h3>
                        <div className='customer-search'>
                            <input type="text"
                                placeholder="Search Customer..." aria-label="Search Customer..."
                                aria-describedby="basic-addon1" style={{
                                    padding: '5px', marginLeft: '310px',
                                    borderRadius: '5px', background: '#e5e5e5'
                                }}></input>
                            <button className='btn btn-primary'>Search</button>

                            <button className='btn btn-warning' style={{ marginLeft: '410px' }}>Print</button>

                        </div>
                    </div>

                </CCol>
            </CRow>
        </div>
        <br></br>
        <br></br>
        <div>
            <h3>Customer Ledger</h3>
            <CTable>
                <CTableHead>
                    <CTableRow>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Voucher No.</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Debit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Credit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Balance</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">Records</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableHead>
                    <CTableRow>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Grand Total</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Debit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Credit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Balance</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
            </CTable>
            </div></>

    )

}
export default Billing
