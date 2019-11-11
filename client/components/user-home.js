import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {update} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     name: this.props.user.name,
  //     address: this.props.user.address,
  //     city: this.props.user.city,
  //     zipCode: this.props.user.zipCode,
  //     email: this.props.user.email,
  //     password: this.props.user.password
  //   }
  //   this.handleChange = this.handleChange.bind(this)
  //   this.handleSubmit = this.handleSubmit.bind(this)
  // }
  // handleSubmit(event) {
  //   event.preventDefault()
  //   const name = event.target.name.value
  //   const address = event.target.address.value
  //   const city = event.target.city.value
  //   const zipCode = event.target.zipCode.value
  //   const email = event.target.email.value
  //   const password = event.target.password.value

  //   let updatedUser = {
  //     name: name,
  //     address: address,
  //     city: city,
  //     zipCode: zipCode,
  //     email: email,
  //     password: password
  //   }
  //   this.props.update(updatedUser)
  // }
  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  // componentDidMount() {
  //   this.props.update(this.props.user)
  // }

  render() {
    console.log('PROPS OF USERS', this.props.user)

    const props = this.props.user
    return (
      <div className="profile">
        <h3>Welcome!</h3>
        <h3>Name:</h3>
        <p>{props.name}</p>
        <h3>Email</h3>
        <p>{props.email}</p>
        <h3>Street Address</h3>
        <p>{props.address}</p>
        <h3>City</h3>
        <p>{props.city}</p>
        {props.zipcode !== null ? (
          <div>
            <h3>Zip</h3>
            <p>{props.zipcode}</p>{' '}
          </div>
        ) : null}

        <button type="submit">Edit Profile</button>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
    // name: state.user.name,
    // email: state.user.email,
    // password: state.user.password,
    // address: state.user.address,
    // city: state.user.city,
    // zipcode: state.user.zipCode
  }
}

const mapDispatch = dispatch => {
  return {
    update: user => dispatch(update(user))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
