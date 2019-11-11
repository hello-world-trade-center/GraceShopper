import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {update, me} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.user
      // name: this.props.user.name,
      // address: this.props.user.address,
      // city: this.props.user.city,
      // zipCode: this.props.user.zipCode,
      // email: this.props.user.email,
      // password: this.props.user.password
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    console.log('EVENT', event.target)
    event.preventDefault()
    const name = event.target.name.value
    const address = event.target.address.value
    const city = event.target.city.value
    const zipCode = event.target.zipCode.value
    const email = event.target.email.value
    const password = event.target.password.value

    let updatedUser = {
      name: name,
      address: address,
      city: city,
      zipCode: zipCode,
      email: email,
      password: password
    }
    this.props.update(updatedUser)
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  async componentDidMount() {
    try {
      await this.props.me()
    } catch (error) {
      console.error(error)
    }
  }

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
        <h3>Zip</h3>
        <p>{props.zipcode}</p>
        {/* {props.zipcode !== null ? (
          <div>
            <h3>Zip</h3>
            <p>{props.zipcode}</p>{' '}
          </div>
        ) : null} */}
        <div className="update-form-container">
          <form id="todo-form" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Update Name:</label>
            <input
              name="name"
              type="text"
              placeholder={props.name}
              onChange={this.handleChange}
            />

            <label htmlFor="email">Update Email:</label>
            <input
              name="email"
              type="text"
              placeholder={props.email}
              onChange={this.handleChange}
            />

            <label htmlFor="address">Update Street Address:</label>
            <input
              name="address"
              type="text"
              placeholder={props.address}
              onChange={this.handleChange}
            />

            <label htmlFor="city">Update City:</label>
            <input
              name="city"
              type="text"
              placeholder={props.city}
              onChange={this.handleChange}
            />

            <label htmlFor="zipCode">Update Zip:</label>
            <input
              name="zipCode"
              type="text"
              placeholder={props.zipCode}
              onChange={this.handleChange}
            />
          </form>

          <button onClick={this.handleSubmit} type="submit">
            Edit Profile
          </button>
        </div>
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
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me()),
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
