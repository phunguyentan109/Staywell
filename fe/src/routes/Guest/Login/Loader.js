import React, { lazy, Suspense } from 'react'
import PublicLayout from 'layout/PublicLayout'

const Login = lazy(() => import('./index').then((module) => module))

const Loadable = () => <PublicLayout>
  <Suspense fallback={<div>Loading...</div>}>
    <Login/>
  </Suspense>
</PublicLayout>

export default Loadable
