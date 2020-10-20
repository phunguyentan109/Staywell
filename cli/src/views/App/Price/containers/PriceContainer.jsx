import React, { useRef, useEffect, useCallback } from 'react'

import useList from 'hooks/useList'
import useInitState from 'hooks/useInitState'
import Price from '../components/Price'
import { DEFAULT_PRICE } from '../modules/const'
import { notify, priceApi, call } from 'constants/api'

function PriceContainer() {
  const [listPrice, setListPrice, updateListPrice] = useList([])
  const [price, setPrice, clearPrice] = useInitState(DEFAULT_PRICE)
  const loadRef = useRef()

  const load = useCallback(async() => {
    let priceData = await call(...priceApi.get())
    loadRef.current.toggle()
    priceData.status === 200 && setListPrice(priceData.data)
    loadRef.current.toggle()
  }, [setListPrice])

  useEffect(() => { load() }, [load])

  const hdChange = useCallback((e) => {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }, [setPrice])

  const hdEdit = useCallback(async () => {
    let data = await call(...priceApi.update(price._id), price)
    loadRef.current.toggle()
    updateListPrice(data)
    loadRef.current.toggle()
    notify('success')
  }, [price, updateListPrice])

  const hdCreate = useCallback(async () => {
    let data = await call(...priceApi.create(), price)
    loadRef.current.toggle()
    updateListPrice(data)
    loadRef.current.toggle()
  }, [price, updateListPrice])

  const hdRemove = useCallback(async (price_id) => {
    loadRef.current.toggle()
    await call(...priceApi.remove(price_id))
    let updatePriceList = listPrice.filter(v => v._id !== price_id)
    setListPrice(updatePriceList)
    notify('success', 'Price data is removed successfully')
    loadRef.current.toggle()
  }, [listPrice, setListPrice])

  return (
    <Price
      price={price}
      setPrice={setPrice}
      listPrice={listPrice}
      hdChange={hdChange}
      hdEdit={hdEdit}
      hdCreate={hdCreate}
      hdRemove={hdRemove}
      clearPrice={clearPrice}
      loadRef={loadRef}
    />
  )
}

export default PriceContainer
