import { lazy } from 'react'

const Login = lazy(() =>
  import('./index').then((module: any) => module)
)

export default Login
