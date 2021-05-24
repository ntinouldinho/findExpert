require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



// const charge = stripe.charges.create({
//   amount: servicePrice*100,
//   currency: 'eur',
//   customer: appointments.userId
// });

  // const account =  stripe.accounts.create({
  //   type: 'express',
  //   requested_capabilities: ['transfers','card_payments'],
  //   business_type: 'individual',
  // });


// const card =  stripe.customers.createSource(
//   'acct_1ItDZlJVZruv3Jo5',
//     {source: 'tok_mastercard',
//     }
// );

// const paymentIntent =  stripe.paymentIntents.create({
//   payment_method_types: ['card'],
//   card: card,
//   amount: 535353,//in cents
//   currency: 'eur',
//   application_fee_amount: 500,
//   transfer_data: {
//     destination: 'acct_1ItozeQvG4N2s3lW',
//   },
//   confirm: true,
// });





// async function accountLinks(){
//   return await stripe.accountLinks.create({
//     account: 'acct_1032D82eZvKYlo2C',
//     refresh_url: 'http://localhost:3000',
//     return_url: 'http://localhost:3000',
//     type: 'account_onboarding',
//   });
// } 

// var ccountLinks = accountLinks()

// const customer1 =  stripe.customers.update(
//   'cus_JWXxiD15VJ7Z9o',
//   {
//     name: 'Test Tester',
//   }
// );







// const payout = stripe.payouts.create({
//   amount: 1100,
//   currency: 'eur',
// });

// const balanceTransaction =  stripe.customers.createBalanceTransaction(
//   'cus_JWXxiD15VJ7Z9o',
//   {amount: -500, currency: 'eur'}
// );



// // Using Express
// const express = require('express');
// const bodyParser = require("body-parser");
// const app = express();
// app.use(express.json());

// // Use JSON parser for all non-webhook routes
// app.use((req, res, next) => {
//   if (req.originalUrl === "/webhook") {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });



// // If you are testing your webhook locally with the Stripe CLI you
// // can find the endpoint's secret by running `stripe listen`
// // Otherwise, find your endpoint's secret in your webhook settings in the Developer Dashboard
// const endpointSecret = 'whsec_...';

// app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   // Verify webhook signature and extract the event.
//   // See https://stripe.com/docs/webhooks/signatures for more information.
//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     return response.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'payment_intent.succeeded') {
//     const paymentIntent = event.data.object;
//     handleSuccessfulPaymentIntent(paymentIntent);
//   }

//   response.json({received: true});
// });

// const handleSuccessfulPaymentIntent = (paymentIntent) => {
//   // Fulfill the purchase.
//   console.log(JSON.stringify(paymentIntent));
// }

// app.listen(3000, () => console.log(`Node server listening on port ${3000}!`));



// const stripe2 = require('stripe')('sk_test_51ItDZlJVZruv3Jo51RC6y0CBKw3YnKEsc8lmHw9O1P6fjGmat2KpsidumDjqCVT5PmdFLbqVslKYVAHQtG8GQ9dR00hJuza53O');
// const customer =  stripe2.customers.create();
// const intent =  stripe2.paymentIntents.create({
//   amount: 1099,
//   currency: 'eur',
//   customer: customer.id,
// });








// const token =  stripe.tokens.create({
//   customer: 'cus_JWHHs6BJsqg5QH',
// }, {
//   stripeAccount: 'acct_1ItDZlJVZruv3Jo5',
// });


// const customer =  stripe.customers.create({
//   source: token.id,
// }, {
//   stripeAccount: 'acct_1ItDZlJVZruv3Jo5',
// });

// async function createUserAccount(){
//   const customer =  await stripe.customers.create({
//     name: "Kostas Mpallas",
//     email: 'kmpallas@example.com',
//     source: 'tok_mastercard'
//   });

  // const card =  stripe.customers.createSource(
  //   customer.id,
  //     {source: 'tok_mastercard'}
  // );

  // const paymentIntent =  await stripe.paymentIntents.create({
  //   amount: 69420666,
  //   currency: 'eur',
  //   payment_method_types: ['card'],
  //   payment_method: card,
  //   customer: customer.id,w
  //   application_fee_amount: 500,
  //   transfer_data: {
  //     destination: 'acct_1ItvZsQr0RFWHomr',
  //   },
  // }, {
  //   stripeAccount: 'acct_1ItDZlJVZruv3Jo5',
  // });


//   const accountLinks = await stripe.accountLinks.create({
//           account: customer.id,
//           refresh_url: 'https://example.com/reauth',
//           return_url: 'https://example.com/return',
//           type: 'account_onboarding',
//   });

//   const cost=500
//   const charge = await stripe.charges.create({
//       amount: cost*100,
//       currency: 'eur',
//       customer: customer.id,
//       // "application_fee_amount": cost*10,//10%
//     }
//     ,
//     // {
//     //   stripeAccount: 'acct_1ItDZlJVZruv3Jo5',
//     //   }
//     );
//   return customer
// }



// const newUser=createUserAccount()

// console.log(newUser)


async function createExpertAccount(){
//   const newExpert = await stripe.accounts.create({
//     business_type: "individual",
//     country: 'GR',
//     type: 'custom',
//     email: "test@test.gr",
//     "default_currency": "eur",
//     "email": "findexpert2323@hotmail.com",
//     "business_profile": {
//       "mcc": "7392",
//       "name": "Find Expert",
//       "product_description": "Find Expert",
//       "support_address": {
//         "city": "Athens",
//         "country": "GR",
//         "line1": "Patission 15",
//         "line2": null,
//         "postal_code": "15125",
//         "state": null
//       },
//       "support_email": "findexpert2323@hotmail.com",
//       "support_phone": "+306900000001",
//       "support_url": null,
//       "url": "findexpert.online"
//     },
//     "external_account": {
//       "object": "bank_account",
//       "data": [
//         {
//           "id": "ba_1ItDgZJVZruv3Jo5jd4szPAG",
//           "object": "bank_account",
//           "account": "acct_1ItDZlJVZruv3Jo5",
//           "account_holder_name": null,
//           "account_holder_type": null,
//           "available_payout_methods": [
//             "standard"
//           ],
//           "bank_name": "BARCLAYS BANK UK PLC",
//           "country": "GB",
//           "currency": "eur",
//           "default_for_currency": true,
//           "fingerprint": "LXWPmsIFXL8uiXLN",
//           "last4": "5555",
//           "metadata": {},
//           "routing_number": "BUKBGB22",
//           "status": "new"
//         }
//       ],
//       country: "GR",
//       currency: "eur",
//       account_number: "GR1601101250000000012300695",
//       "has_more": false,
//       "url": "/v1/accounts/acct_1ItDZlJVZruv3Jo5/external_accounts"
//     },
//     // "requirements": {
//     //   "disabled_reason": null,
//     //   "current_deadline": 1529085600,
//     //   "past_due": [],
//     //   "currently_due": [
//     //       "external_account",
//     //       "individual.dob.day",
//     //       "individual.dob.month",
//     //       "individual.dob.year",
//     //       "individual.first_name",
//     //       "individual.last_name",
//     //       "tos_acceptance.date",
//     //       "tos_acceptance.ip"
//     //   ],
//     //   "eventually_due": [
//     //       "external_account",
//     //       "individual.address.city",
//     //       "individual.address.line1",
//     //       "individual.address.postal_code",
//     //       "individual.address.state",
//     //       "individual.dob.day",
//     //       "individual.dob.month",
//     //       "individual.dob.year",
//     //       "individual.first_name",
//     //       "individual.last_name",
//     //       "individual.ssn_last_4",
//     //       "tos_acceptance.date",
//     //       "tos_acceptance.ip"
//     //   ],
//     // },
//     // "requirement": {
//     //   "current_deadline": null,
//     //   "currently_due": [],
//     //   "disabled_reason": null,
//     //   "errors": [],
//     //   "eventually_due": [
//     //     "individual.verification.document"
//     //   ],
//     //   "past_due": [],
//     //   "pending_verification": []
//     // },
//     requested_capabilities: ["card_payments", "transfers"],
//   });


  // const updateExpert = await stripe.accounts.update(
  //   'acct_1ItxEbDl1cLo2uQ4',
  //   {"external_account": {
  //     "object": "bank_account",
  //     "data": [
  //       {
  //         "id": "ba_1ItDgZJVZruv3Jo5jd4szPAG",
  //         "object": "bank_account",
  //         "account": "acct_1ItDZlJVZruv3Jo5",
  //         "account_holder_name": null,
  //         "account_holder_type": null,
  //         "available_payout_methods": [
  //           "standard"
  //         ],
  //         "bank_name": "BARCLAYS BANK UK PLC",
  //         "country": "GB",
  //         "currency": "eur",
  //         "default_for_currency": true,
  //         "fingerprint": "LXWPmsIFXL8uiXLN",
  //         "last4": "5555",
  //         "metadata": {},
  //         "routing_number": "BUKBGB22",
  //         "status": "new"
  //       }
  //     ],
  //     country: "GR",
  //     currency: "eur",
  //     account_number: "GR1601101250000000012300695",
  //     "has_more": false,
  //     "url": "/v1/accounts/acct_1ItDZlJVZruv3Jo5/external_accounts"},
  //   } )

  // console.log(newExpert.id)

    // const capability = await stripe.accounts.updateCapability(
    //   newExpert.id,
    //   'card_payments',
    // );


    
    // console.log(capability)

    // const accountLinks = await stripe.accountLinks.create({
    //   account: newExpert.id,
    //   refresh_url: 'https://example.com/reauth',
    //   return_url: 'https://example.com/return',
    //   type: 'account_onboarding',
    // });

    // const capabilities = await stripe.accounts.listCapabilities(
    //     newExpert.id
    // );

    // console.log(capabilities)




    // const newCustomer =  await stripe.customers.create({
    //       name: "Test Customer",
    //       email: 'test@example.com',
    //       source: 'tok_mastercard'
    // });
    
    // const card = await stripe.customers.createSource(
    //   'cus_JXPmkyZ9TBuAKB',
    //   {source: 'tok_mastercard'}
    // );

    const paymentMethodCreate = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 5,
        exp_year: 2022,
        cvc: '314',
      },
    });

    const paymentMethodAdd = await stripe.paymentMethods.attach(
      paymentMethodCreate.id,
      {customer: 'cus_JXPmkyZ9TBuAKB'}
    );

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ['card'],
      amount: 23222211,
      currency: 'eur',
      application_fee_amount: 123,
      transfer_data: {
        destination: 'acct_1ItppoHr2rEtPacs',
      },
      payment_method: paymentMethodAdd.id,
      customer: 'cus_JXPmkyZ9TBuAKB',
    });

    const paymentIntentConfirm = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      {payment_method: paymentIntent.payment_method}
    );

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{
    //     name: 'Tester Tester',
    //     amount: 420420,
    //     currency: 'eur',
    //     quantity: 1,
    //   }],
    //   payment_intent_data: {
    //     application_fee_amount: 123,
    //     transfer_data: {
    //       destination: 'acct_1ItppoHr2rEtPacs',
    //     },
    //   },
    //   mode: 'payment',
    //   success_url: 'https://example.com/success',
    //   cancel_url: 'https://example.com/failure',
    //   customer: 'cus_JXPmkyZ9TBuAKB'
    // });

    // const charge = await stripe.charges.create({
    //   amount: 222*100,
    //   currency: 'eur',
    //   payment_intent: paymentIntent.id,
    //   customer: 'cus_JXPmkyZ9TBuAKB'

    // });


    return 'cus_JXPmkyZ9TBuAKB'

    
    // return newExpert.id
}

const newExpert = createExpertAccount()

console.log(newExpert)
