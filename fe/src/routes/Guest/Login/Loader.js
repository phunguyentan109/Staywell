import { lazy } from 'react'

const Login = lazy(() =>
  import('./index').then((module) => module)
)

export default Login
