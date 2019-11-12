const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_kvwYHvndJmIVAiOCaKlu26zr00HayEMsQz'
    : 'pk_test_kvwYHvndJmIVAiOCaKlu26zr00HayEMsQz'
module.exports = STRIPE_PUBLISHABLE
