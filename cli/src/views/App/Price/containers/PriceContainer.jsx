import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import useList from 'hooks/useList'
import useInitState from 'hooks/useInitState'
import Price from '../components/Price'
import { DEFAULT_PRICE } from '../modules/const'
import { notify, priceApi, call } from 'constants/api'

function PriceContainer({ loading }) {
  const [listPrice, setListPrice, updateListPrice] = useList([])
  const [price, setPrice, clearPrice] = useInitState(DEFAULT_PRICE)

  const load = useCallback(async() => {
    // let priceData = await apiPrice.get()
    let priceData = await call(...priceApi.get())
    priceData.status === 200 && setListPrice(priceData.data)
    loading(false)
  }, [setListPrice, loading])

  useEffect(() => { load() }, [load])

  const hdChange = useCallback((e) => {
    let { value, name } = e.target
    setPrice(prev => ({ ...prev, [name]: value }))
  }, [setPrice])

  const hdEdit = useCallback(async () => {
    // let data = await apiPrice.update({ price_id: price._id, data: price })
    let data = await call(...priceApi.update(price._id), price)
    updateListPrice(data)
    notify('success')
  }, [price, updateListPrice])

  const hdCreate = useCallback(async () => {
    // let data = await apiPrice.create({ data: price })
    let data = await call(...priceApi.create(), price)
    updateListPrice(data)
  }, [price, updateListPrice])

  const hdRemove = useCallback(async (price_id) => {
    loading(true)
    await call(...priceApi.remove(price_id))
    let updatePriceList = listPrice.filter(v => v._id !== price_id)
    setListPrice(updatePriceList)
    notify('success', 'Price data is removed successfully')
    loading(false)
  }, [listPrice, loading, setListPrice])

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

PriceContainer.propTypes = {
  loading: PropTypes.func,
}
