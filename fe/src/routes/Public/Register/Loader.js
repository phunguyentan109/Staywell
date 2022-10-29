import React, { Suspense, lazy } from 'react'
import PublicLayout from 'layout/PublicLayout'

const Register = lazy(() => import('./index').then((module) => module))

const Loadable = () => <PublicLayout darken={0.1}>
  <Suspense fallback={<div>Loading...</div>}>
    <Register/>
  </Suspense>
</PublicLayout>

export default Loadable
