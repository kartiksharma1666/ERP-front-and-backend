import React, { useState, useEffect } from 'react';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';

import './TotalSale.css';

function TotalSell() {
  const [invoices, setInvoices] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Total Sale');

  const getDataFromDB = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/Billing/getInvoices/all');
      const resjson = await res.json();
      console.log('frontend invoice', resjson);
      setInvoices(resjson);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  const aggregateTotalSellByItemName = () => {
    const itemTotals = {};

    invoices.forEach((invoice) => {
      invoice.items.forEach((item) => {
        const { itemName, Addquantity, unitPrice } = item;
        const totalSell = parseFloat(Addquantity) * parseFloat(unitPrice);

        if (!itemTotals[itemName]) {
          itemTotals[itemName] = {
            totalSell: 0,
            totalQuantity: 0,
          };
        }
        itemTotals[itemName].totalSell += totalSell;
        itemTotals[itemName].totalQuantity += parseInt(Addquantity, 10);
      });
    });

    return itemTotals;
  };

  const getCategoryTotalSells = () => {
    const categoryTotals = {};

    invoices.forEach((invoice) => {
      invoice.items.forEach((item) => {
        const { category, Addquantity, unitPrice } = item;
        const totalSell = parseFloat(Addquantity) * parseFloat(unitPrice);

        if (!categoryTotals[category]) {
          categoryTotals[category] = {
            totalSell: 0,
            totalQuantity: 0,
          };
        }
        categoryTotals[category].totalSell += totalSell;
        categoryTotals[category].totalQuantity += parseInt(Addquantity, 10);
      });
    });

    return categoryTotals;
  };

  const renderTable = () => {
    const itemTotals = aggregateTotalSellByItemName();

    return (
    
      <React.Fragment>
        <h4 className="table-heading">Total Sale Values by Product</h4>
        <CTable className="mb-0 border mt-4" hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
              
              <CTableHeaderCell scope="col">Total Quantity</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total Sale</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Object.entries(itemTotals).map(([itemName, totals], index) => (
              <CTableRow key={index}>
                <CTableDataCell>{itemName}</CTableDataCell>
                
                <CTableDataCell>{totals.totalQuantity}</CTableDataCell>
                <CTableDataCell>{totals.totalSell}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </React.Fragment>
      
    );
  };

  const renderCategoryTable = () => {
    const categoryTotals = getCategoryTotalSells();

    return (
      <React.Fragment>
        <h4 className="table-heading">Total Sale Values by Category</h4>
        <CTable className="mb-0 border mt-4" hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
              
              <CTableHeaderCell scope="col">Total Quantity</CTableHeaderCell>
              <CTableHeaderCell scope="col">Total Sale</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Object.entries(categoryTotals).map(([categoryName, totals], index) => (
              <CTableRow key={index}>
                <CTableDataCell>{categoryName}</CTableDataCell>
                
                <CTableDataCell>{totals.totalQuantity}</CTableDataCell>
                <CTableDataCell>{totals.totalSell}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </React.Fragment>
    );
  };

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="total-sell-container">
      <h1 className="total-sell-heading">Total Sale Values</h1>
      <CDropdown variant="btn-group" className="total-sell-dropdown">
        <CDropdownToggle color="primary" size="lg">
          {selectedOption}
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem onClick={() => handleDropdownChange('Total Sell')}>Total Sale</CDropdownItem>
          <CDropdownItem onClick={() => handleDropdownChange('By Product')}>By Product</CDropdownItem>
          <CDropdownItem onClick={() => handleDropdownChange('By Category')}>By Category</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      {selectedOption === 'Total Sale' && (
        <React.Fragment>
          {renderTable()}
          {renderCategoryTable()}
        </React.Fragment>
      )}
      {selectedOption === 'By Product' && renderTable()}
      {selectedOption === 'By Category' && renderCategoryTable()}
    </div>
  );
}

export default TotalSell;
