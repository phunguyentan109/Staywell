import React, { useEffect, useCallback } from 'react'

import useList from 'hooks/useList'
import useInitState from 'hooks/useInitState'
import Price from '../components/Price'
import { DEFAULT_PRICE } from '../modules/const'
import { priceApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'

function PriceContainer() {
  const [listPrice, setListPrice, updateListPrice] = useList([], true)
  const [price, setPrice, clearPrice] = useInitState(DEFAULT_PRICE)

  const load = useCallback(async() => {
    onLoading()
    let priceData = await call(...priceApi.get())
    priceData.status === 200 && setListPrice(priceData.data)
    offLoading()
  }, [setListPrice])

  useEffect(() => { load() }, [load])

  const hdChange = useCallback((e) => {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }, [setPrice])

  const hdEdit = useCallback(async () => {
    onLoading()  
    let rs = await call(...priceApi.update(price._id), price)
    if (rs.status === 200) {
      updateListPrice(rs.data)
      notify('success')
    }
    offLoading()
  }, [price, updateListPrice])

  const hdCreate = useCallback(async () => {
    onLoading()
    let rs = await call(...priceApi.create(), price)
    if (rs.status === 200) {
      updateListPrice(rs.data)
      notify('success')
    }
    offLoading()
  }, [price, updateListPrice])

  const hdRemove = useCallback(async (price_id) => {
    onLoading()
    await call(...priceApi.remove(price_id))
    let updatePriceList = listPrice.filter(v => v._id !== price_id)
    setListPrice(updatePriceList)
    notify('success', 'Price data is removed successfully')
    offLoading()
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
    />
  )
}

export default PriceContainer
