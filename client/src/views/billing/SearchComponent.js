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
        product === item && product.quantity > 0
          ? { ...product, Addquantity: product.Addquantity + 1, show: true }
          : product,
      ),
    )

    const Item = {
      itemName: item.name,
      unitPrice: item.price,
      Addquantity: item.Addquantity + 1,
      discount: '',
    }

    props.setInvoiceData((prevState) => ({
      ...prevState,
      items: [...prevState.items, Item],
    }))
  }

  const handleIncrement = (item) => {
    props.setdata((prevData) =>
      prevData.map((product) => {
        if (product.quantity == item.Addquantity) {
          alert('dont have enough quantity')
          return { ...product }
        } else if (item.Addquantity >= 0 && product === item) {
          props.setInvoiceData((prevItem) => {
            return {
              ...prevItem,
              items: prevItem.items.map((prod) =>
                prod.itemName == item.name
                  ? { ...prod, Addquantity: prod.Addquantity + 1 }
                  : { ...prod },
              ),
            }
          })
          return { ...product, Addquantity: item.Addquantity + 1 }
        } else {
          return { ...product }
        }
      }),
    )
  }

  const handleDecrement = (item) => {
    props.setdata((prevData) =>
      prevData.map((product) =>
        product.Addquantity >= 0 && product === item
          ? { ...product, Addquantity: item.Addquantity - 1 }
          : { ...product },
      ),
    )

    if (item.Addquantity == 1) {
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
            prod.itemName == item.name
              ? { ...prod, Addquantity: prod.Addquantity - 1 }
              : { ...prod },
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
            {console.log(item)}
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>{item.name}</CTableDataCell>
            <CTableDataCell>{item.weight ? item.weight : <>not Available</>}</CTableDataCell>
            <CTableDataCell>{item.quantity ? item.quantity : <>not Available</>}</CTableDataCell>
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
              {item.Addquantity == 0 ? (
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

                  {item.Addquantity}
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
