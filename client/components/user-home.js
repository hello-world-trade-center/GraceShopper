import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {update, getUserCartInfo} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.user
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const id = this.state.id
    const name = this.state.name
    const address = this.state.address
    const city = this.state.city
    const state = this.state.state
    const zipCode = this.state.zipCode
    const email = this.state.email
    const password = this.state.password

    let updatedUser = {
      id: id,
      name: name,
      address: address,
      state: state,
      city: city,
      zipCode: zipCode,
      email: email,
      password: password
    }
    this.props.update(updatedUser, this.props.history)
    // this.setState({})
  }
  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    try {
      this.props.getUserCartInfo(this.props.user)
      this.setState({})
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    console.log(this.props, 'props')
    const props = this.props.user
    const orders = this.props.user.orders

    return (
      <div className="profile">
        <div className="profile-info">
          <h2>Welcome, {props.name}!</h2>
          <h3>Name</h3>
          <p>{props.name}</p>
          <h3>Email</h3>
          <p>{props.email}</p>
          <h3>Street Address</h3>
          <p>{props.address}</p>
          <h3>City</h3>
          <p>{props.city}</p>
          <h3>State</h3>
          <p>{props.state}</p>
          <h3>Zip</h3>
          <p>{props.zipCode}</p>
        </div>

        <div className="update-form-container">
          <form id="todo-form" onSubmit={this.handleSubmit}>
            <h3>
              <label htmlFor="name">Update Name:</label>
            </h3>
            <input
              name="name"
              type="text"
              placeholder={props.name}
              onChange={this.handleChange}
            />

            <h3>
              <label htmlFor="email">Update Email:</label>
            </h3>
            <input
              name="email"
              type="text"
              placeholder={props.email}
              onChange={this.handleChange}
            />

            <h3>
              <label htmlFor="address">Update Street Address:</label>
            </h3>
            <input
              name="address"
              type="text"
              placeholder={props.address}
              onChange={this.handleChange}
            />

            <h3>
              <label htmlFor="city">Update City:</label>
            </h3>
            <input
              name="city"
              type="text"
              placeholder={props.city}
              onChange={this.handleChange}
            />

            <h3>
              <label htmlFor="state">Update State :</label>
            </h3>
            <input
              name="state"
              type="text"
              placeholder={props.state}
              onChange={this.handleChange}
            />
            <h3>
              <label htmlFor="zipCode">Update Zip:</label>
            </h3>
            <input
              name="zipCode"
              type="text"
              placeholder={props.zipCode}
              onChange={this.handleChange}
            />
          </form>
          <div className="update-button-container">
            <button
              className="update-button"
              onClick={this.handleSubmit}
              type="submit"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="order-history">
          <h2>{props.name}'s Order History:</h2>

          {orders.map(item => {
            console.log('item', item)
            if (item.complete !== false) {
              if (!item.order_items) {
                item.order_items = []
              }
              return (
                <div key={item.id}>
                  {item.order_items.map(info => {
                    {
                      /* console.log('TCL: UserHome -> render -> info', info) */
                    }
                    return (
                      <div key={info.id}>
                        <img
                          className="order-history-img"
                          src={info.product.imageUrl}
                        />
                        <h3>Item: {info.product.name}</h3>
                        <p>Price: {info.product.price / 100} USD</p>
                        <p> Quantity Bought: {info.amount}</p>
                      </div>
                    )
                  })}
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log('STATE', state)
  return {
    user: state.user,
    cart: state.cart.order_items,
    orders: state.user.orders
  }
}

const mapDispatch = dispatch => {
  return {
    update: user => dispatch(update(user)),
    getUserCartInfo: user => dispatch(getUserCartInfo(user))
  }
}
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
