import React from 'react'
import Route from '@shopgate/pwa-common/components/Router/components/Route'
import Register from './index'

const RegisterRoute = (props) => (
  <Route
    path='/register'
    component={Register}
    {...props}
  />
)

export default RegisterRoute
