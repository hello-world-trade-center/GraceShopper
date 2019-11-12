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
    <div className="forms">
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
              <input className="info-input" name="full_name" type="text" />
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
          <button type="submit">
            <h2>{displayName}</h2>
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <h2>
        <a href="/auth/google">
          Click here to {displayName} with{' '}
          <img
            id="google-logo"
            src="https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"
          />
        </a>
      </h2>
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
      if (formName === 'login') {
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, formName))
      } else if (formName === 'signup') {
        const email = evt.target.email.value
        const password = evt.target.password.value
        const name = evt.target.full_name.value
        const addy = evt.target.Address.value
        const city = evt.target.City.value
        const zip = evt.target.Zip.value
        dispatch(auth(email, password, formName, name, addy, city, zip))
      }
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
