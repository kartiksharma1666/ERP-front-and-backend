import React from 'react'

const InvoiceInfo = (props) => {
  return (
    <>
      <div
        className="details ms-4"
        style={{
          border: '1px solid #fff',
          background: '#fff',
          width: '40%',
          padding: '10px',
          borderRadius: '8px',
          height: '211px',
        }}
      >
        <h5>
          Invoice <span style={{ color: '#6681e8' }}> #{props.invoiceNumber} </span>{' '}
          <span style={{ fontSize: '14px', color: '#c5c6d0' }}>for</span>
        </h5>
        <div className="d-flex">
          <p
            style={{
              fontSize: '15px',
              border: '1px solid #7f7d9c',
              borderRadius: '15px',
              background: '#7f7d9c',
              padding: '5px',
              color: '#fff',
              marginTop: '15px',
            }}
          >
            Open
          </p>
          <p style={{ marginLeft: '30px', marginTop: '15px' }}>Due next month</p>
        </div>
        <div className="d-flex" style={{ marginTop: '30px' }}>
          <button className="btn btn-dark">Send Invoice</button>
          <button className="btn btn-light ms-4">Edit Invoice</button>
          <button className="btn btn-light ms-4">Add note</button>
        </div>
      </div>
    </>
  )
}

export default InvoiceInfo
