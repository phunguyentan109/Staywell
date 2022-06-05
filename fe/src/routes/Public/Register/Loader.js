import { lazy } from 'react'

const Register = lazy(() =>
  import('./index').then((module) => module)
)

export default Register
