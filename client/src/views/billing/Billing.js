import {
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CFormTextarea,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CFormInput,
  CCardBody,
  CCard,
  CCardHeader,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'

import { AiFillDelete } from 'react-icons/ai'
import { DatePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import FloatingButton from '../floatingbutton/FloatingButton'

//local components
import HistoryAndHelp from './HistoryAndHelp'
import SearchComponent from './SearchComponent'
import SearchAndAddCustomers from './SearchAndAddCustomers'
import InvoiceInfo from './InvoiceInfo'
import CustomerPopUp from '../dashboard/customerPopUp'

const Billing = () => {
  const initialState = {
    items: [],
    total: 0,
    notes: 'new of notess',
    rates: '',
    vat: 0,
    currency: '',
    invoiceNumber: Math.floor(Math.random() * 100000),
    status: '',
    type: 'Invoice',
    creator: '',
  }

  const acronym = {
    Rupees: 'INR',
    Dollars: 'USD',
    Euros: 'ENR',
    Pounds: 'GBP',
  }
  const [data, setdata] = useState(null)
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  //
  const [invoiceNumber, setInvoiceNumber] = useState(null)
  const [invoiceData, setInvoiceData] = useState(initialState)
  const [rates, setRates] = useState(0)
  const [vat, setVat] = useState(0)
  const [currency, setCurrency] = useState('INR')
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  const [notes, setNotes] = useState('')
  const [client, setClient] = useState('')
  const [type, setType] = useState('Invoice')
  const [status, setStatus] = useState('Unpaid')
  //part of modal
  const [addCustomer, setAddCustomer] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [getData, setGetData] = useState(false)

  const getInvoiceNumber = async () => {
    fetch(`http://localhost:8080/api/Billing/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setInvoiceNumber(data + 1)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error getting invoice number', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })
  }

  const handleChange = (index, e) => {
    console.log(e.target.name)
    const values = [...invoiceData.items]
    values[index][e.target.name] = e.target.value
    setInvoiceData({ ...invoiceData, items: values })
  }

  const handleRemoveField = (index) => {
    const values = invoiceData.items
    values.splice(index, 1)
    setInvoiceData((prevState) => ({ ...prevState, values }))
    // console.log(values)
  }

  const handleAddProduct = () => {}

  const handleAddField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { itemName: '', unitPrice: '', quantity: '', discount: '', amount: '' },
      ],
    }))
  }

  const handleCurrencyClick = (currencyType) => {
    setCurrency(acronym[currencyType])
  }

  //getting all product data from db
  const getDataFromDB = async () => {
    const res = await fetch('http://localhost:8080/api/products/all').catch((err) => {
      console.log(err)
    })

    const resjson = await res.json()
    // console.log(resjson)

    const productsWithQuantity = resjson.map((product) => ({
      ...product,

      quantity: 0,
      // Add the "quantity" field with an initial value
    }))

    setdata(productsWithQuantity)
  }

  //getting all categories from db

  const fetchCategories = () => {
    // Make an API call to fetch categories from your backend
    fetch('http://localhost:8080/api/category/all')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories)
        // console.log(data.categories) // Update the state with fetched categories
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
      })
  }

  // sorting categories with all as first option
  const sortedCategories = Array.isArray(categories)
    ? [...categories].sort((a, b) => b.order - a.order)
    : []

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const filterdProd = data.filter((product) =>
      product.name?.toLowerCase().includes(e.target.value.toLowerCase()),
    )

    setSearchResults(filterdProd)
  }

  const handleRates = (e) => {
    setRates(e.target.value)
  }

  const calculateSubTotal = (invoicedata) => {
    let sum = 0

    invoiceData.items.length > 0 &&
      invoicedata.items.map((item) => {
        const total = parseInt(item?.quantity) * parseInt(item?.unitPrice)
        sum = sum + parseInt(total)
      })

    return sum
  }

  const calculateTotal = (subTot) => {
    if (subTot != 0) {
      const vatCal = parseFloat((subTot * (rates / 100)).toFixed(2))
      setVat(vatCal)

      const total = subTot + vatCal
      return total
    } else {
      return 0
    }
  }
  //saving the invoice to order
  const handleSave = () => {
    fetch('http://localhost:8080//api/Billing/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData), // Use the updatedAddData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product created successfully:', requestData)
        // Optionally, you can show a success message or redirect to another page.
      })
      .catch((error) => {
        console.error('Error creating product:', error)
        // Optionally, you can show an error message or handle the error in other ways.
      })
  }

  useEffect(() => {
    if (searchResults.length > 0) {
      const filterdProd = data.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()),
      )
      setSearchResults(filterdProd)
    }
  }, [data])

  useEffect(() => {
    setSubTotal(() => calculateSubTotal(invoiceData))
    console.log(invoiceData)
    // total,subtotal
  }, [invoiceData])

  useEffect(() => {
    setTotal(() => calculateTotal(subTotal))
  }, [subTotal, rates])

  useEffect(() => {
    getInvoiceNumber()
  }, [])

  useEffect(() => {
    getDataFromDB()
    fetchCategories()
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={18}>
          <div className="billing-bar d-flex">
            <SearchAndAddCustomers
              client={client}
              setClient={setClient}
              //modalChanges
              setIsModalOpen={setIsModalOpen}
              setAddCustomer={setAddCustomer}
              getData={getData}
            />
            <InvoiceInfo invoiceNumber={invoiceNumber} />
          </div>

          {/* history and help comes here <HistoryAndHelp /> */}

          <CRow className="mt-4">
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Products</strong>
                </CCardHeader>
                <CCardBody>
                  <div className="d-flex">
                    <CDropdown>
                      <CDropdownToggle color="primary" style={{ height: '40px' }}>
                        Category
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem onClick={() => setSelectedCategory(null)}>All</CDropdownItem>
                        {sortedCategories &&
                          sortedCategories.map((category) => (
                            <CDropdownItem
                              key={category._id}
                              onClick={() => setSelectedCategory(category._id)}
                            >
                              {category.name}
                            </CDropdownItem>
                          ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <div className="container">
                      <div className=" row justify-content-center">
                        <div className="col-md-8">
                          <div className="input-group mb-3">
                            <input
                              style={{ borderRadius: '5px' }}
                              type="text"
                              className="form-control"
                              placeholder="Search for Product..."
                              value={search}
                              spellCheck="false"
                              onChange={handleSearch}
                            ></input>
                            <div className="input-group-append"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className=" btn btn-primary "
                      onClick={handleAddProduct}
                      style={{
                        height: '40px',
                        width: '150px',
                      }}
                    >
                      Add product
                    </button>
                  </div>
                  {search.length > 0 && (
                    <CTable className="mb-0 border" hover responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">Sr. no</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                          <CTableHeaderCell scope="col" style={{ width: '10%' }}>
                            Weight(Kg)
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col" style={{ width: '15%' }}>
                            Quantity Available
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                          <CTableHeaderCell scope="col"></CTableHeaderCell>

                          <CTableHeaderCell scope="col"></CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {/* search component for doing search and addition of quantity //////////////////////////////// */}
                        <SearchComponent
                          data={data}
                          search={search}
                          setdata={setdata}
                          searchResults={searchResults}
                          setSearchResults={setSearchResults}
                          // invoice changes
                          invoiceData={invoiceData}
                          setInvoiceData={setInvoiceData}
                          handleRemoveField={(index) => handleRemoveField(index)}
                        />
                      </CTableBody>
                    </CTable>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <div className="billing-bar d-flex">
            <div
              className="invoice"
              style={{
                border: '1px solid #fff',
                background: '#fff',
                marginTop: '28px',
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                overflow: 'auto',
              }}
            >
              <h5>Items</h5>
              <div className="d-flex" style={{ fontSize: '15px' }}>
                {/* items description ////////////////////////////////////////////////////////////////////////// */}
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
                    {invoiceData.items && invoiceData.items.length > 0 ? (
                      invoiceData.items.map((itemField, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell scope="row" style={{ width: '40%' }}>
                            {' '}
                            <CFormInput
                              style={{ width: '100%' }}
                              outline="none"
                              sx={{ ml: 1, flex: 1 }}
                              type="text"
                              name="itemName"
                              onChange={(e) => handleChange(index, e)}
                              value={itemField?.itemName}
                              placeholder="Item name or description"
                            />{' '}
                          </CTableDataCell>
                          <CTableDataCell>
                            {' '}
                            <CFormInput
                              sx={{ ml: 1, flex: 1 }}
                              type="number"
                              name="quantity"
                              onChange={(e) => handleChange(index, e)}
                              value={itemField?.quantity}
                              placeholder="0"
                            />{' '}
                          </CTableDataCell>
                          <CTableDataCell>
                            {' '}
                            <CFormInput
                              sx={{ ml: 1, flex: 1 }}
                              type="number"
                              name="unitPrice"
                              onChange={(e) => handleChange(index, e)}
                              value={itemField?.unitPrice}
                              placeholder="0"
                            />{' '}
                          </CTableDataCell>
                          <CTableDataCell>
                            {' '}
                            <CFormInput
                              sx={{ ml: 1, flex: 1 }}
                              type="number"
                              name="discount"
                              onChange={(e) => handleChange(index, e)}
                              value={itemField?.discount}
                              placeholder="0"
                            />{' '}
                          </CTableDataCell>
                          <CTableDataCell>
                            {' '}
                            <CFormInput
                              sx={{ ml: 1, flex: 1 }}
                              type="number"
                              name="amount"
                              onChange={(e) => handleChange(index, e)}
                              value={
                                itemField?.quantity * itemField?.unitPrice -
                                (itemField?.quantity * itemField?.unitPrice * itemField?.discount) /
                                  100
                              }
                              disabled
                            />{' '}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton onClick={() => handleRemoveField(index)}>
                              <AiFillDelete
                                style={{
                                  background: '#6681e8',
                                  borderRadius: '50%',
                                  fontSize: '25px',
                                  color: '#fff',
                                  padding: '2px',
                                }}
                              />
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <>Search Products to Add </>
                    )}
                  </CTableBody>
                  {/* addition of field //// */}
                  <div className>
                    <CButton onClick={handleAddField}>+</CButton>
                  </div>
                </CTable>
              </div>
            </div>
          </div>
          <div
            className="invoice"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              borderRadius: '8px',
              alignItems: 'end',
              margin: '20px 188px',
            }}
          >
            <div>
              <CTable>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>
                      <h5>Invoice Summary</h5>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Sub Total: {subTotal}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>VAT(%) {vat}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>Total {total}</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <p className="billing-button-text">Tax Rates</p>
              <CFormInput
                type="number"
                name="rates"
                style={{ width: '70%' }}
                value={rates}
                onChange={handleRates}
              />
            </div>
            <div>
              <p className="billing-button-text">Due Date</p>
              <DatePicker value={selectedDate} onChange={setSelectedDate} oneTap></DatePicker>
            </div>
            <div>
              <p className="billing-button-text">Currency</p>
              <CDropdown>
                <CDropdownToggle
                  color=""
                  style={{
                    fontSize: '15px',
                    border: '1px solid #fff',
                    background: '#fff',
                  }}
                >
                  {currency}
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem onClick={() => handleCurrencyClick('Rupees')}>
                    Rupees
                  </CDropdownItem>
                  <CDropdownItem onClick={() => handleCurrencyClick('Dollars')}>
                    Dollars
                  </CDropdownItem>
                  <CDropdownItem onClick={() => handleCurrencyClick('Euros')}>Euros</CDropdownItem>
                  <CDropdownItem onClick={() => handleCurrencyClick('Pounds')}>
                    Pounds
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>

          {/* <p style={{ marginLeft: '540px', marginTop: '-75px' }}>Due Date</p>
          <DatePicker style={{ width: '200px', marginLeft: '530px' }}></DatePicker>

          <p style={{ marginLeft: '1100px', marginTop: '-120px', padding: '2px' }}>Currency</p>
          <CDropdown>
            <CDropdownToggle
              color=""
              style={{
                fontSize: '15px',
                marginLeft: '1095px',
                border: '1px solid #fff',
                background: '#fff',
                width: '200px',
                marginBottom: '-5px',
              }}
            >
              Select Currency
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>Rupees</CDropdownItem>
              <CDropdownItem>Dollars</CDropdownItem>
              <CDropdownItem>Euros</CDropdownItem>\<CDropdownItem>Pounds</CDropdownItem>
            </CDropdownMenu>
          </CDropdown> */}

          <div
            className="invoice "
            style={{
              border: '1px solid #fff',
              background: '#fff',
              marginTop: '28px',
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
            }}
          >
            <h5>Note/Payment Info</h5>
            <CFormTextarea
              placeholder="Provide additional details or terms of service"
              rows={4}
              style={{ marginTop: '15px', marginBottom: '10px' }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></CFormTextarea>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary" style={{ margin: '30px' }} onClick={handleSave}>
              Save and Continue
            </button>
            <button className="btn btn-primary" style={{ margin: '30px' }}>
              Invoice PDF
            </button>
          </div>
        </CCol>
        <FloatingButton />
      </CRow>
      <CustomerPopUp
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addCustomer={addCustomer}
        setAddCustomer={setAddCustomer}
        edit={edit}
        setEdit={setEdit}
        getData={getData}
        setGetData={setGetData}
      />
    </>
  )
}
export default Billing
