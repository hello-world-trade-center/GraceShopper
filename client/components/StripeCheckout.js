import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import STRIPE_PUBLISHABLE from '../../constants/stripe'
import PAYMENT_SERVER_URL from '../../constants/server'
const CURRENCY = 'USD'
const fromUSDToCent = amount => amount * 100

const successPayment = checkout => {
  checkout()
}
const errorPayment = data => {
  alert('Payment Error')
}
const onToken = (amount, description, checkout) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(successPayment(checkout))
    .catch(errorPayment)

const Checkout = ({name, description, amount, checkout}) => {
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={fromUSDToCent(amount)}
      token={onToken(amount, description, checkout)}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  )
}
export default Checkout
