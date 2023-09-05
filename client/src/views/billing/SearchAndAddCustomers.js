import React, { useState, useEffect } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import { BiEnvelope } from 'react-icons/bi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { GiCancel } from 'react-icons/gi'

import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'

const SearchAndAddCustomers = (props) => {
  const [search, setSearch] = useState('')
  const [customers, setCustomers] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (e) => {
    setSearch(e.target.value)

    const filterdProd = customers?.filter((product) =>
      product.phone.toLowerCase().includes(e.target.value.toLowerCase()),
    )

    setSearchResults(filterdProd)
  }

  const getDataFromDB = async () => {
    const res = await fetch('http://localhost:8080/api/customer/all').catch((err) => {
      console.log(err)
    })

    const resjson = await res.json()

    setCustomers(resjson.customers)
  }

  const handleClick = (customer) => {
    setSearch('')
    props.setDropDown(false)
    console.log(customer)
    props.setClient(customer)
  }

  const handleCancel = () => {
    props.setDropDown(true)
    props.setClient('')
  }
  useEffect(() => {
    getDataFromDB()
  }, [props.getData])

  const handleModalClick = () => {
    props.setIsModalOpen((prev) => !prev)
    props.setAddCustomer((prev) => !prev)
  }

  return (
    <div
      className="invoice"
      style={{
        border: '1px solid #fff',
        background: '#fff',
        width: '60%',
        padding: '36px',
        borderRadius: '8px',
        marginBottom: '45px',
        // overflow: 'auto',
      }}
    >
      <h5>Customer Details</h5>

      {/* <input
        style={{ borderRadius: '5px', margin: '20px 0' }}
        type="text"
        className="form-control"
        placeholder="Search for Customers..."
        value={search}
        spellCheck="false"
        onChange={handleSearch}
      ></input> */}

      {props.dropDown ? (
        <input
          style={{ borderRadius: '5px', margin: '20px 0 0 0' }}
          type="text"
          className="form-control"
          placeholder="Search for Customers..."
          value={search}
          spellCheck="false"
          onChange={handleSearch}
        />
      ) : (
        <></>
      )}
      {search.length > 0 ? (
        <CDropdown style={{ width: '100%', height: '25%' }} visible={props.dropDown}>
          <CDropdownMenu>
            {searchResults.length > 0 ? (
              searchResults.map((customer) => (
                <>
                  <CDropdownItem onClick={() => handleClick(customer)}>
                    <h6>
                      {customer.name} {'(' + customer.phone + ')'}
                    </h6>
                  </CDropdownItem>
                </>
              ))
            ) : (
              <>No Customer Found</>
            )}
          </CDropdownMenu>
        </CDropdown>
      ) : (
        <></>
      )}

      {props.client && (
        <div style={{ marginTop: '10px' }}>
          <GiCancel
            onClick={handleCancel}
            style={{ fontSize: '19px', position: 'absolute', left: '45%' }}
          />
          <p>
            <BiSolidUser style={{ fontSize: '14px' }} /> {props.client.name}
          </p>
          <p>
            <BiEnvelope style={{ fontSize: '14px' }} /> {props.client.email}
          </p>
          <p>
            <BsFillTelephoneFill style={{ fontSize: '14px' }} /> {props.client.phone}
          </p>
          <p>
            <AiFillHome style={{ fontSize: '14px' }} /> {props.client.address}
          </p>
        </div>
      )}

      <button
        className="btn btn-primary"
        style={{ alignItems: 'center', width: '50%', marginTop: '20px' }}
        onClick={handleModalClick}
      >
        New Customer
      </button>
    </div>
  )
}

export default SearchAndAddCustomers
