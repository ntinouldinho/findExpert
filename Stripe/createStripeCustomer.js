
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createStripeCustomer(name, email){

    const newCustomer =  await stripe.customers.create({
        name: name,
        email: email,
        source: 'tok_mastercard'//default mastercard for all customers
    });

    return newCustomer.id
}

module.exports = createStripeCustomer