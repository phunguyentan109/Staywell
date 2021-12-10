import axios from 'axios'
import useSWR from 'swr'
import { useState } from 'react'
import { notify } from 'constants/func'
import _ from 'lodash'
import { call } from 'constants/api'

const fetcher = (url, method, data) => axios[method || 'get'](`/api/${url}`, data)

const revalidateOptions = { revalidateOnFocus: false }

export default function useFetch (args, mutators = {}, revalidate = revalidateOptions) {
  const { data, error, mutate } = useSWR(args, fetcher, revalidate)
  const [mutating, setMutating] = useState(false)

  if (error) notify('error', 'Oops! Something went wrong...')

  const mutateFn = async(key, ...data) => {
    if (mutators[key]) {
      setMutating(true)

      const { successMsg, exec, revalidate = true } = mutators[key] || {}

      await call(_.isEmpty(data) ? exec() : exec(...data))

      if (revalidate) await mutate()

      if (successMsg) notify('success', successMsg)

      return setMutating(false)
    }

    console.error(`useFetch: No mutating function called "${key}" is found.`)
  }

  return {
    data: data?.data,
    error,
    isFetching: !error && !data,
    mutate: mutateFn,
    isMutating: mutating
  }
}
