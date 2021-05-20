const stripe = require('stripe')('pk_test_51ItDZlJVZruv3Jo5YTj7ffFnlttYvNojyYUum9Y1IYXMR6wZxsQkUn9seC8Ed4qh7QvsND6NUsm73LKgr1BlIRSW008PnDRx61');//secret key

const account = await stripe.accounts.create({
  type: 'express',
});

const accountLinks = await stripe.accountLinks.create({
  account: 'acct_1ItDZlJVZruv3Jo5',
  refresh_url: 'http://localhost:3000',
  return_url: 'http://localhost:3000',
  type: 'account_onboarding',
});

const paymentIntent = await stripe.paymentIntents.create({
  payment_method_types: ['card'],
  amount: 1000,//in cents
  currency: 'eur',
  application_fee_amount: 500,
  transfer_data: {
    destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
  },
});

// Using Express
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/apikeys
const Stripe = require('stripe');
const stripe = Stripe('pk_test_51ItDZlJVZruv3Jo5YTj7ffFnlttYvNojyYUum9Y1IYXMR6wZxsQkUn9seC8Ed4qh7QvsND6NUsm73LKgr1BlIRSW008PnDRx61');

// If you are testing your webhook locally with the Stripe CLI you
// can find the endpoint's secret by running `stripe listen`
// Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
const endpointSecret = 'whsec_...';

app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  // Verify webhook signature and extract the event.
  // See https://stripe.com/docs/webhooks/signatures for more information.
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    handleSuccessfulPaymentIntent(paymentIntent);
  }

  response.json({received: true});
});

const handleSuccessfulPaymentIntent = (paymentIntent) => {
  // Fulfill the purchase.
  console.log(JSON.stringify(paymentIntent));
}

app.listen(4242, () => console.log(`Node server listening on port ${3000}!`));