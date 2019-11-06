import React from 'react'
import Routes from './routes'
import {Navbar} from './components'
import {AllProducts} from './components'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <AllProducts /> */}
      <Routes />
    </div>
  )
}

export default App
