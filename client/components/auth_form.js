import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small className="form-names">Email</small>
          </label>
          <input className="info-input" name="email" type="text" />
        </div>

        <div>
          <label htmlFor="password">
            <small className="form-names">Password</small>
          </label>
          <input className="info-input" name="password" type="password" />
        </div>

        {displayName != 'Login' ? (
          <div>
            <div>
              <label htmlFor="name">
                <small className="form-names">Name</small>
              </label>
              <input className="info-input" name="name" type="text" />
            </div>

            <div>
              <label htmlFor="Address">
                <small className="form-names">Address</small>
              </label>
              <input className="info-input" name="Address" type="text" />
            </div>

            <div>
              <label htmlFor="City">
                <small className="form-names">City</small>
              </label>
              <input className="info-input" name="City" type="text" />
            </div>

            <div>
              <label htmlFor="Zip">
                <small className="form-names">Zip Code</small>
              </label>
              <input className="info-input" name="Zip" type="text" />
            </div>
          </div>
        ) : null}

        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
