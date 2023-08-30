import React from 'react'
import { BiEnvelope } from 'react-icons/bi'
import { PiNotepadThin } from 'react-icons/pi'
import { SiDialogflow } from 'react-icons/si'

const HistoryAndHelp = () => {
  const billing = {
    id: 1,
    name: 'Gurleen',
    item: 'Chocolate Cake',
    quantity: 2,
    price: '350',
    totalAmount: '630',
    email: 'gurleen21@gmail.com',
    invoiceNumber: '#42D42-0001',
    date: '27th October 2023 19:00',
  }

  return (
    <>
      <div className="d-flex">
        <div
          className="invoice "
          style={{
            border: '1px solid #fff',
            background: '#fff',
            marginTop: '-18px',
            width: '60%',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <h5>History</h5>
          <div style={{ marginTop: '25px' }}>
            <div className="d-flex">
              <BiEnvelope
                style={{
                  background: '#6681e8',
                  borderRadius: '50%',
                  fontSize: '40px',
                  color: '#fff',
                  padding: '8px',
                }}
              />
              <p style={{ marginLeft: '20px', fontSize: '18px', fontWeight: '500px' }}>
                Invoice was sent to {billing.email} <br />
                <span style={{ fontSize: '15px' }}>Jul 2, 2023 2:56 PM</span>
              </p>
            </div>
            <div className="d-flex">
              <PiNotepadThin
                style={{
                  background: '#6681e8',
                  borderRadius: '50%',
                  fontSize: '40px',
                  color: '#fff',
                  padding: '8px',
                }}
              />
              <p style={{ marginLeft: '20px', fontSize: '18px', fontWeight: '500px' }}>
                Invoice was finalizes <br />
                <span style={{ fontSize: '15px' }}>Jul 2, 2023 2:54 PM</span>
              </p>
            </div>
            <div className="d-flex">
              <PiNotepadThin
                style={{
                  background: '#6681e8',
                  borderRadius: '50%',
                  fontSize: '40px',
                  color: '#fff',
                  padding: '8px',
                }}
              />
              <p style={{ marginLeft: '20px', fontSize: '18px', fontWeight: '500px' }}>
                Invoice {billing.invoiceNumber} <br />
                <span style={{ fontSize: '15px' }}>Jul 2, 2023 1:32 PM</span>
              </p>
            </div>
          </div>
        </div>
        <div
          className="details ms-4"
          style={{
            border: '1px solid #fff',
            background: '#fff',
            width: '40%',
            padding: '10px',
            borderRadius: '8px',
            marginTop: '27px',
          }}
        >
          <div>
            <h5>
              <SiDialogflow style={{ color: '#6681e8', fontSize: '50px' }} />
            </h5>
          </div>

          <div style={{ marginTop: '15px' }}>
            <h4>Ask us</h4>
            <p>
              If you have a question or encounter a problem, <br /> we can help you ant time
            </p>
          </div>
          <button
            className="btn btn-primary"
            style={{ alignItems: 'center', width: '100%', marginTop: '10px' }}
          >
            Ask a question
          </button>
        </div>
      </div>
    </>
  )
}

export default HistoryAndHelp
