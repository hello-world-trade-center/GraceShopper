import React from 'react'
import PropTypes from 'prop-types'
import {SearchBar} from './SearchBar'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import {Login, Signup} from './index'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <div id="navbar" className="navbar">
      <h1 id="title">
        <Link to="/home">Pommes de Terre</Link>
      </h1>
      <SearchBar />
      <nav>
        {isLoggedIn ? (
          <div className="nav-items">
            {/* The navbar will show these links after you log in */}
            <p>Welcome {user.name.split(' ')[0]}!</p>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to={`/home/${user.name}`}>Profile</Link>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
    </div>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
