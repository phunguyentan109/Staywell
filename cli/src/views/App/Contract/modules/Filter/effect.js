import { offLoading, onLoading } from 'constants/func'
import { call, roomApi } from 'constants/api'

export const fetchRooms = async () => {
  onLoading()
  let rs = await call(...roomApi.get())
  if (rs.status === 200) return rs.data
  offLoading()
}
