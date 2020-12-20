import React, { useEffect, useCallback } from 'react'
import useList from 'hooks/useList'
import Price from '../components/Price'
import { priceApi, call } from 'constants/api'
import { notify, offLoading, onLoading } from 'constants/func'

function PriceContainer() {
  const [listPrice, setListPrice, updateListPrice] = useList([], true)

  const load = useCallback(async() => {
    onLoading()
    let priceData = await call(...priceApi.get())
    priceData.status === 200 && setListPrice(priceData.data)
    offLoading()
  }, [setListPrice])

  useEffect(() => { load() }, [load])

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
      listPrice={listPrice}
      updateListPrice={updateListPrice}
      hdRemove={hdRemove}
    />
  )
}

export default PriceContainer
