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
      <div className="form_info">
        <form onSubmit={handleSubmit} name={name}>
          <div className="form-input">
            <label htmlFor="email">
              <small className="form-names">Email</small>
            </label>
            <input className="info-input" name="email" type="text" required />
          </div>

          <div className="form-input">
            <label htmlFor="password">
              <small className="form-names">Password</small>
            </label>
            <input
              className="info-input"
              name="password"
              type="password"
              required
            />
          </div>

          {displayName != 'Login' ? (
            <div>
              <div className="form-input">
                <label htmlFor="name">
                  <small className="form-names">Name</small>
                </label>
                <input
                  className="info-input"
                  name="full_name"
                  type="text"
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="Address">
                  <small className="form-names">Address</small>
                </label>
                <input
                  className="info-input"
                  name="Address"
                  type="text"
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="City">
                  <small className="form-names">City</small>
                </label>
                <input
                  className="info-input"
                  name="City"
                  type="text"
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="state">
                  <small className="form-names">State</small>
                </label>
                <input className="info-input" name="state" type="text" />
              </div>

              <div className="form-input">
                <label htmlFor="zipCode">
                  <small className="form-names">Zip Code</small>
                </label>
                <input
                  className="info-input"
                  name="zipCode"
                  type="text"
                  required
                />
              </div>
            </div>
          ) : null}

          <div className="form-input">
            <button className="login_button" type="submit">
              {displayName}
            </button>
          </div>
          <h3>
            {error && error.response && <div> {error.response.data} </div>}
          </h3>
        </form>
      </div>
      <hr />
      <div className="oauth_signin">
        <a className="individual_oauth_signin" href="/auth/google">
          <img
            className="auth_logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABZVBMVEX////qQzU0qFNChfT7vAUxffTQ4PI4gPSdu/j7ugCxyPrqQDH7uAD/vQAwp1DpOSkaokPpLhr86ejpMyHqPS4ho0fpNyZDg/zpLBb8wgAcokT4yMX7393zoJo9gvQzqkPy+fT97+7xjYbymZPrSDr3vrvsWk/tYVf+6sFSsmrW69vm8+l8woyf0arI5M6t2Lf1tbH0qKPrUUXucmr50c/whH38yVHpNzf81X+50fD80XFRkuj92oxBhvD//PPm7/ZNju2Qy55tvIC838RFrmDO6NTtaWDwhn/94Jv4pw3uZjn95a/yhzT3piftXDvxfjf1lzH+9uHxgDj5sx78xkD926L7wShsn+2tyfGPsvX+8tWVuex0perk15b8zWOMsDxTq03S3vyZuPjOtyepszZ1rkbjuhu5tTFsrkqztTSLsUM/jNk8lbU4nok1pWM+kcY6m5s2o3A7mKg3oH1Ai9w8k7s5nY4txSLFAAAK70lEQVR4nO2b+XfbxhGAIYiyIoMEAQFgKR4SKFKSSYoiKUq5bNniIcmNm+ZqZDt10yRt0jttev39xcGb2MXuAnvA5fdTXt6zgc8zOzO7WErSmjVr1qxZs2ZNTFRKxaNOt3roUi13u0fFi9JuhfdbxULpqHx5cp7VdcPI5bITcjnDMPRc7aRXPirxfkViKhfdy1peN7KmomwEoyhm1tDztctO4jQrxcNzJ2gmSG1J1MzpuZPyBe+3RqZUPs4bWTS5Oc2sYfQ6CViaF9UNHdtugpkzTrq7vBVglKo1cr1xKHP5W1EjWemeR9WbSOo9Addk6dLIxaHnY+rnXd5GixSP82Zseh5Oth6Kk6ydcyO+8M3IGndiVJ1OjYqf55i/5O94RCd+U0edc65eHFP18x3L/PwqlzptP5dcrchJsGtkGfg5KHqPR6penBts/FzMPPv2WM2zSNAZxjHbDVaplmPq56AwDWOZSYVZxjhhtRp3TxiuwHlM/YiJYDEX8wiKgX7IQLCc5+bnkDumPsb1OGXoBNOg2/4r54yaPIR8h6JgieMSnKHfURMscmkSKyh5Wmuxw7XGTFEUWoJdQQSztATLOm83D8WkJVhdCzKBnuBbn6JdQQSpFZkjQaootTZxIUgEc7QEdwWJILU1KNXEGNWorUHplv9uYoNqBKuc94M+FAWLQixCioKVGA8NFcU0x9dpTMRLGvQFpeNYdrz+rZmN28u7arXcLVcP7y5Pcv5NG6Q/Tq/ISIcxhNCRq/XKxZWXrJSK3d6GHn5qQDOCkVu9ktXNw1W5OUqdXsjdG3qN3gFvtayQ1Y/LKB8bLg4VAxhJmhGU7qJ0QsXIVdHfrdjLBweS5hqULiI0ClM/xjyAr5SVgM/JVCMYYVoz9VuSGz+djeXpgmoEpTJpHVXI/Fw62YWFQVdwl7SORvvqXp07kqWbotItWa9X8hFvTpSOJ6lKN4JSkSyERgyfhrp+GClHUDonKTORA+hTOs+53YauYIdkz5StxXWZwFmNlCMobRCE0OjF9/wjyhGUugSdIp4MZQXBVd88m0sEMfH85zVMP0UX8NoyhFQq9dF7WIJGsn4R8iKdSu39AkMxaYLS/Y4TxL2P0TM1aYKPnBC6iulfIoYxn6w1KEnv7qR89j5BUkxWFXX4LJ2asPcxgqJR5f3GuDzZSc0UvwjN1GyMkwwjUguEZapS4/2+2DxKLyl+ClXMJ6yMOny9k1pS/KIGdjQSNYx6PF0WTMEGHPOE9/vi8yIdYAgccKhdMKPISpKO20bggJNLXo5KT4NCCMrUBNbR1UoKzVSd1491ovB+YJIGZ6p5y/ttSUiBDVdGcT15rXBhJg10/HxO0UzeuObwJdzQGXDmOkUSQwjoFfOK01FcSWCzl5an7mDH8ShO+WcPlAhZhpNM9RSzvF+WiMCRLSBTnbaRTeA4I0G74SIfvacncCJ1+BWq4d6nyawzElKS+nxJ/JBnD+jyDPJspELjk/6M2PDhFl0eQ54NHruX2UkRC0oPtzepsg959nN0w/fFNdyCpOmHqIUmlX4ksOEH4Gcjl9JU+qm4htvvgJ8N2zotJuk9uSD9dfgS+OjAY7Zgww8FNty8Bj4avVmkn4tsuAV89Ffohl8JbQgspujtMEK/Z2H4LejRaDsLzzCCIH3D7VegRyM3/CgTDQvDX4Me/QS5WbwrtuFr0KORd4c7XwttCG6IyENbpHbIwBC4u0A3fCK24fXbbrh59f9riF5pBDfcjG4YYf+7NoyDGLJU7G4BNnyCPLUJ3vGvQY9Gn0vFntrAhsh7i0iHGDxnGozjUrENgXMpxg44wlEbA8M3oEe/LacY4N0T+LbQimGEA2GeO2CM08QoYxvHUwyME+Eo7YL+SRT4WB/5VD/SQQ19wwfAZ4feNZkS5TiR43kp+lFUKv1CZEPws9EPTKPM3tQNgYM3TkOMMtVQ//YE+cyN3hCj9HzqhsCRRsJoF6n0b4Q13H4IeThqMc1kfjsiN9zaJmEf1RD2lRt1h5i5/0bWmqSG3373DgmvURVhNxUQdxeZ38myrPZJDQn5YAvV0Ib8LSilxslQ2cVipTbmNeLyBe/wPe5DF2Im9UfZNxyyMZtwjRjCfeDeySP0uC3zgzxGJa81JDxDTVLIzsIlbCFmfi9P0W4YyXm8Qu0xkLnbBb4QM6nvZ4KyWmck5/EStZTCrrW5wDZQswxlH0TkJIXNbB6Q7UXmD4uCTIOInKTgI4wxwOE7k/mzvIzGrpxeI/d7+DKUgL9HyPzwzYqgrMos5FweoCYpvN97BPcLb4xZxWI12KDXmbBlGNwvJmPMKuTTKRbIdQa+sRgTIHgfkKFMi80b9I0FbOwes5KmgAwd52mLvh/GKoSdYExZqqaZ+TEmKE8b1AWlx8ghhN0PnrEwfU8HbWCeyjZlP/R9E0qvcJnfBi+PMUGKA8qCNrIfWpIuzKaZP4UK0m8ZL9HPddCSdHZzKJP5PtzPXYptmoIYOYqYpNNag5ChE8UzeoLorXATdod9CW+DsTJowxTpFVTkgXQTrd37OHNN0KDNQxFjEaLMpFPuIWMMU8U3ODkKPexe4gVsjAEo0liL3+EIItcZD6eRYyvGX1FfYwmGHCMuMSxgG8pa3H3xJZYg/DR/lRF+EGUr3unmMZ4g4jwzhSSITmrHV2+eXWF+ogo5J12lThBEWdXi2ky9wgzgJvjaLIgbjcDQydR6LLt+zCVIEkJJGpAEMZ4wDq9+hh1BzFXo0iRZiV4Y5WiHjI26Jv8FV3ELP4SS1LIIFdVCnfw0vHmqqbJ68FdMRYIQSmQdY+yo1clGHM/P5eBv+xgjN24vnNAgKzZjxxF+rt4MtOk/qvXjNXoYIT9uhtMnzVPP0bL6OO2x2ZIL80mjHvwdWRHlDDEYgvF0QVIbtdCaR7NV16zlhx38A1FxK+xrDJgoeeo7Wpp1OoRbNtqn1qqep/jTFdJiJCszPsT1dNFSHrTOmvbyX243b9r9uhps5/9RpLaBtWtagWh4W31TZ1FqmlUfnPb7rVar3z8d1Efu/7FU+N+P0jbA17qRsGMI4pyoq2q5XmqI2pSDf22GZGqUHHU5i7oUo2L9+G9oGKPlqEuklhEH8LYR+lUbgQFvRbdtgDIV7+gCBPn0FhfWT9eA/fA+ca+fxwaXc1aoanDbiL4IfRqkG6kYOfhngCLRnikQ7gVVDmwbWxhHwGEMBVC0RkttYzv83gUGbQEU1YP/zCvGU0ZntARQlA/+O7vuvX8VSxkVTdHZF0/aRjx9QjxF1RoPONvxCwqiOG4b2zE1wiVEKDfuvnhzm0KK+pxp3Kcb2RtwaAk60w3/Ac69Q0/zvqAtwBhO+7Yg781UgfYdLGdLzLXexP6lOYgzfotRZXS13K5zylSLao1ZoM+lbWinrPwcGjLzMLLK0Cmsw1gY2GwFnTCOGIZRpXvFE0SLVRhVjX0AfZoDJo6WTPECaxg39QJtx/gu6RAypLscVe3U5ivo0FapDTmOH7MeD6UtU8lVYfxchqO4a45qaX1x/Fwap1aMyaoWRi2bt9IKdjumQDrhG3DsD1AafTXqinT06m2btwiMG0eSOF1VqzBqi7X6Aml4939wLR07a5AEPR972B85b4yoqTqpqdZbDH7KGC/2TWsg+5dmQKKqf9NmFHZvSmTsxrDlXw8qWJO7NP5/FJxMHtVPW8PEhS4Q227eDNvudSiXVqs9PLtp2jbv11qzZs2aNWvWvDX8D7tUr2lS+uu6AAAAAElFTkSuQmCC"
          />
          {displayName} with Google
        </a>

        <a className="individual_oauth_signin" href="/auth/facebook">
          <img
            className="auth_logo"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEU8Wpn///8jSpHw8vcfSJA5WJgoTZPV2udNaKHt7/QrT5T7+/00VZYxUpWeqseBkbl6i7VTbKOMm76rtc/Z3ulcc6eWo8Pj5u9vgrCIl7z19/re4uylsMxpfa1VbqSDkrjByNq1vtRDYJzAx9oAO4vK0OAQQY7hk5OjAAAEW0lEQVR4nO3d63aiMBSGYcAEEIIHPJ/Gatu5/0ucWqu1rZqNaRJ25nt/di0rz0JAIYEoDr3I9wJY7/8TLjvcW94RZnUuRMI9keT1+KowGyZKRiEkKzFZ/RRORRi8Y0qsvwsHqe+F+uWS+qtwGhrwjTi6FGbC9/JYSMwuhMOQtsFTavMpzBLfS2Ol40p8F9bK98JYqeqdhXmIH9LTx/RdGOJ+5pA8CZehCpOTsBPmjuZtVwMh+yDkH4T8g5B/EPIPQv5ByD8I+Qch/1ovlJFUF0kpD39rUJuFUhVpUkV/NoPtYrHYbvuD+WYyzPeyKpIkTYuqUoRLga0VqkLki13WLeOflcvObJw9jXqLuf5SRCuFUiVR/fr9SvX1FrpT9S0UyiL9coX6fn12QpnmOzKPoVAW++cmPnZClY6a+bgJ03mnKZCVUIpdYx8roZIrDYa5UOW04x9bYTV5yMdHqIYPArkI5f5RIBdh0Q1cKF4fBvIQFtPHgSyEBhshE6Gg/1TiKVR9EyAHoWj+bZuXsKo1BPbCxGwVtl9ouBUyECZGO1IGQrNjIQfhcQRvyMJkFrhQms+aa7lQGR4M2y8snoyF23YLG3xjK8e7dd0ffK+fa9/Dq5C6GZajyeF6obqS9i28CtWcBuyJ4vHJIF6FFenHfWdfmLyJV2GxowAJn8R7eRWmGUE4NJyP5VVI+UazM5326XcdEi5VNBtaciW/26EeaD4r0qdQVnrhtDJ9F79HfL1wYjwr0us6JPz8NTjUf+RVmGuBS/MJ9C0Xds2XquXCVfDrcBy8MINQH4Q2gxBCWhDaDEIIaUFoMwghpAWhzSCEkBaENgtEqO7cCld/zjt70dxO1/8sWTXtdG+nFZZ3Xnxoqb8Xom2h+bCu++mnOjMXEpaauZBwxpi58Ek/TIO5cKS/gMpcSLhxLnPhPHjhXr8EzIWEG+fyFlIuEfMWUr6Y8xY+E0Yt8hauCeOJeAu1N6dhL6SMmOIt3IcuLCnnOFgLZ5RlZi0knadiLdxRBvGzFvYow2tZC7WzutgL/1CG17IWVqELaQOIOQtJh0PWwlfSjC/OQsKpROZC2mwTzkLCqUTmQtqj8BwIy9vpFXdeXJIOhw6uARc3S/WzgrK/t19OnDuL6/g2gxBCWhDaDEIIaUFoMwghpAWhzSCEkBaENoMQQloQ2gxCCGlBaDMIIaQFoc0ghJAWhDaDEEJaENoMQghpQWgzCCGkBaHNIISQFoQ2gxBCWhDaDEIIaUFoMwghpAWhzSCEkBaENoMQQloQ2gzCXxYuCbcC/eXcCJOTMA51HUZnof7+7b+dE6HanIW18ZN3m+ZEWK3PwrHzDdGJUHTPwnhi+BDzxrkQqkH8KVy5XokOhPK4Cj+E8cjx7tSBUDzHl8K4dku0LpRiHX8VxiPhclu0LVSnNXghjGcbUTlDWhWqSgw+n/Jy+USbWW8jE+EmqRe+PPafk2izvnyKjf6ZPdyDkH/hC/8BSRtrY1GtLbMAAAAASUVORK5CYII="
          />
          {displayName} with Facebook
        </a>

        <a className="individual_oauth_signin" href="/auth/twitter">
          <img
            className="auth_logo"
            src="data:image/png;base64,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"
          />
          {displayName} with Twitter
        </a>
      </div>
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
        const state = evt.target.state.value
        const zipCode = evt.target.zipCode.value
        dispatch(
          auth(email, password, formName, name, addy, city, state, zipCode)
        )
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
