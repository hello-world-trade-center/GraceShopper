import React from 'react'
import Routes from './routes'
import {Navbar} from './components'
import {connect} from 'react-redux'
import {getProducts} from './store/product'

class App extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts
  }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
