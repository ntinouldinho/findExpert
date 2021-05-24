
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPayment(customer, price){//customer id and price

    const customerCard = await stripe.customers.listSources(
        customer,
        {object: 'card', limit: 1}
    );

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: price*100,//Stripe is cents
      currency: 'eur',
      application_fee_amount: price*10,
      transfer_data: {
        destination: 'acct_1ItppoHr2rEtPacs',//default destination, one connected account for all Experts
      },
      payment_method: customerCard.data[0].id,
      customer: customer,
    });

    const paymentIntentConfirm = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {payment_method: paymentIntent.payment_method}
    );

    return paymentIntentConfirm.id

}

module.exports = createPayment