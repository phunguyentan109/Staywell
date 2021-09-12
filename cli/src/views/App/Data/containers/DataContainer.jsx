import React, { useState, useEffect, useCallback } from 'react'
import XLSX from 'xlsx'
import _ from 'lodash'
import moment from 'moment'
import { message } from 'antd'
import Data from '../components/Data'
import { BILL_ELEMENTS, DEFAULT_PRICE } from '../const'
import { offLoading } from 'constants/func'
import { useStore } from 'hooks'

function DataContainer() {
  const [rowData, setRowData] = useState([])
  const [price, repPrice] = useStore(_.cloneDeep(DEFAULT_PRICE))

  useEffect(() => {
    offLoading()
  }, [])

  const clearImportData = useCallback(() => {
    // onLoading()
    setRowData([])
    // offLoading()
  }, [])

  const getTail = useCallback((file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    const EXTENSIONS = ['xlsx', 'xls', 'csv']
    
    return EXTENSIONS.includes(extension) // return boolean
  }, [])

  const formatBillDate = useCallback((billDate) => {
    const selectBillDate = billDate.contract.split('-')[0]
    const endOfMonth = moment(selectBillDate, 'DD/MM/YY').endOf('month')

    const updateBills = billDate.bills.map((bill, index) => {
      const billDate = moment(endOfMonth).add(index, 'month').format('DD/MM/YYYY')
      Object.assign(bill, { billDate })
      return bill
    })
    Object.assign(billDate, { bills: updateBills })
    return billDate
  }, [])

  const onChange = useCallback(async (e) => {
    const file = e.file.originFileObj
    const reader = new FileReader()
  
    if (file) {
      if (getTail(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        message.error('Invalid file input, Select Excel, CSV file')
      }
    } else {
      setRowData([])
    }
  
    reader.onload = async (event) => {
      //parse data
      const resultData = event.target.result
      const workBook = XLSX.read(resultData, { type: 'binary' })
  
      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
        
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1, defval: null })
  
      const filterData = fileData[0].reduce((acc, curr, index) => {
        if (curr) {
          acc.push({
            _id: curr,
            room: curr,
            contract: fileData[1][index],
            deposit: fileData[1][index+1],
            bills: []
          })
        }
        return acc
      }, [])

      const filterBills = fileData.slice(3).reduce((acc, curr) => {
        const sliceCurr = curr.slice(1)
        const billDate = curr[0]

        for (const key in acc) {
          let currentRoom = acc[key]
          currentRoom= formatBillDate(currentRoom)

          const sliceBill = sliceCurr.slice(key*5, key*5+5)
          const billNotIsEmpty = sliceBill.some(element => element)
          if (billNotIsEmpty) {
            sliceBill.unshift(billDate)
  
            const assignKeyOfBill = Object.fromEntries(
              BILL_ELEMENTS.map((val, index) => [val, sliceBill[index]])
            )

            Object.assign(assignKeyOfBill, { _key: billDate })
            currentRoom.bills.push(assignKeyOfBill)
            acc[key] = currentRoom
          }
        }
        return acc
      }, [...filterData])
      setRowData(filterBills)
    }
  }, [getTail])

  return (
    <Data
      onChange={onChange}
      rowData={rowData}
      clearImportData={clearImportData}
      price={price}
    />
  )
}

export default DataContainer