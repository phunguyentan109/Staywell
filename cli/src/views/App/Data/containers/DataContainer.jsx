import React, { useState, useEffect, useCallback } from 'react'
import XLSX from 'xlsx'
import { message } from 'antd'
import Data from '../components/Data'
import { BILL_ELEMENTS } from '../const'

function DataContainer() {
  const [rowData, setRowData] = useState([])

  const getTail = useCallback((file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    const EXTENSIONS = ['xlsx', 'xls', 'csv']
    
    return EXTENSIONS.includes(extension) // return boolean
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
        const month = curr[0]

        for (const key in acc) {
          const currentRoom = acc[key]

          const sliceBill = sliceCurr.slice(key*5, key*5+5)
          const billNotIsEmpty = sliceBill.some(element => element)
          if (billNotIsEmpty) {
            sliceBill.unshift(month)
  
            const assignKeyOfBill = Object.fromEntries(
              BILL_ELEMENTS.map((val, index) => [val, sliceBill[index]])
            )

            Object.assign(assignKeyOfBill, { _key: month })
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
    />
  )
}

export default DataContainer