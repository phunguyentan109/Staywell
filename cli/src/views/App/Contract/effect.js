import { offLoading, onLoading } from 'constants/func'
import { call, contractApi } from 'constants/api'

export const fetchContracts = async (query) => {
  onLoading()
  let rs = await call(...contractApi.get(), query)
  if (rs.status === 200) {
    offLoading()
    return rs.data
  }
}
