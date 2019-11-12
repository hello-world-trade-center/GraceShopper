import React from 'react'

const Checkout = props => {
  const orderInformation = JSON.parse(localStorage.getItem('completedCart'))
  const userInfo = JSON.parse(localStorage.getItem('userInfo')).data
  console.log(orderInformation)
  return (
    <div className="thank-you-page">
      <h1>THANK YOU FOR YOUR ORDER!</h1>
      <h2>Order Number:{orderInformation.id}</h2>
      <h2>Total:${orderInformation.total} USD</h2>
      <h3>Your potatoes will be sent to the address we have on file:</h3>
      <ul>Name:{userInfo.name}</ul>
      <ul>Address:{userInfo.address}</ul>
      <ul>
        {userInfo.city}, {userInfo.zipCode}{' '}
      </ul>
    </div>
  )
}

export default Checkout
