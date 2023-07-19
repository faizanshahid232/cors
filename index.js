const express = require("express");
var cors = require('cors')
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51NOz1fIi4beyPjru1XAPSAdxY1x8zH8fJMOghajQGbgq2SVgE3R2tLTj8fhoZ8kCJHq7wX0PKgstks4S6NUBwRYA006SNgD679');

app.use(express.static("public"));
app.use(express.json());

var whitelist = [
    '*',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return items;
};

app.post("/create-payment-intent", async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { items } = req.body;
    console.log("here1", items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log("Payment:", paymentIntent.client_secret);
  res.send({
    clientSecret: paymentIntent.client_secret,
    
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));