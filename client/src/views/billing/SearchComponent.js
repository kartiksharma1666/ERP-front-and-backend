import React, { useEffect, useState } from 'react'
import {
  CTableBody,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CForm,
  CFormInput,
} from '@coreui/react'
const SearchComponent = (props) => {
  const [addSub, setAddSub] = useState([])

  const handleButton = (item, index) => {
    props.setdata((prevProducts) =>
      prevProducts.map((product) =>
        product === item ? { ...product, quantity: product.quantity + 1, show: true } : product,
      ),
    )

    // const Item = {
    //   items: [
    //     { itemName: item.name, unitPrice: item.price, quantity: item.quantity + 1, discount: '' },
    //   ],
    //   total: 0,
    //   notes: 'new of notess',
    //   rates: 0,
    //   vat: 0,
    //   currency: 'INR',
    //   invoiceNumber: Math.floor(Math.random() * 100000),
    //   status: 'Paid',
    //   type: 'Invoice',
    //   creator: 'Omkar',
    // }

    const Item = {
      itemName: item.name,
      unitPrice: item.price,
      quantity: item.quantity + 1,
      discount: '',
    }

    props.setInvoiceData((prevState) => ({
      ...prevState,
      items: [...prevState.items, Item],
    }))
  }

  const handleIncrement = (item) => {
    props.setdata((prevData) =>
      prevData.map((product) =>
        product.quantity >= 0 && product === item
          ? { ...product, quantity: item.quantity + 1 }
          : { ...product },
      ),
    )
    props.setInvoiceData((prevItem) => {
      return {
        ...prevItem,
        items: prevItem.items.map((prod) =>
          prod.itemName == item.name ? { ...prod, quantity: prod.quantity + 1 } : { ...prod },
        ),
      }
    })
  }

  const handleDecrement = (item) => {
    props.setdata((prevData) =>
      prevData.map((product) =>
        product.quantity >= 0 && product === item
          ? { ...product, quantity: item.quantity - 1 }
          : { ...product },
      ),
    )

    if (item.quantity == 1) {
      props.setInvoiceData((prevItem) => {
        let index = 0
        prevItem.items.map((prod, indexVal) => {
          if (prod.itemName == item.name) {
            index = indexVal
          }
        })
        const values = prevItem.items
        values.splice(index, 1)
        console.log({ ...prevItem.items })
        return {
          ...prevItem,
          items: values,
        }
      })
    } else {
      props.setInvoiceData((prevItem) => {
        return {
          ...prevItem,
          items: prevItem.items.map((prod) =>
            prod.itemName == item.name ? { ...prod, quantity: prod.quantity - 1 } : { ...prod },
          ),
        }
      })
    }

    // props.setInvoiceData((prevItem) => {
    //   return {
    //     ...prevItem,
    //     items: [
    //       prevItem.items.map((prod) => {
    //         if (prod.itemName == item.name) {
    //           if (prod.quantity != 1) {
    //             return { ...prod, quantity: prod.quantity - 1 }
    //           }
    //         } else {
    //           return prod
    //         }
    //       }),
    //     ],
    //   }
    // })

    // props.setInvoiceData((prevItem) => {
    //   return {
    //     ...prevItem,
    //     items: [
    //       ...prevItem.item.map((prod) => {
    //         if (prod.itemName == item.itemName && prod.quantity) {
    //           return prod
    //         }
    //       }),
    //     ],
    //   }
    // })
  }

  return (
    <>
      {props.searchResults.length > 0 ? (
        props.searchResults.map((item, index) => (
          <CTableRow key={index}>
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{item.name}</CTableDataCell>
            <CTableDataCell>2.5 kg</CTableDataCell>
            <CTableDataCell>5</CTableDataCell>
            <CTableDataCell>{item.price}</CTableDataCell>

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
              <CButton
                color="primary"
                shape="rounded-pill"
                onClick={() => handleClickToOpen(item, 'view')}
              >
                View
              </CButton>
            </CTableDataCell>

            <CTableDataCell>
              {item.quantity == 0 ? (
                <CButton
                  color="primary"
                  shape="rounded-pill"
                  onClick={() => handleButton(item, index)}
                >
                  Add
                </CButton>
              ) : (
                <>
                  <CButton
                    color="primary"
                    shape="rounded-pill"
                    name="subtract"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </CButton>

                  {item.quantity}
                  <CButton
                    color="primary"
                    shape="rounded-pill"
                    name="subtract"
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </CButton>
                </>
              )}
            </CTableDataCell>
          </CTableRow>
        ))
      ) : (
        <>no Products found</>
      )}
    </>
  )
}

export default SearchComponent
