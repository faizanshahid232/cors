const express = require('express');
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.listen(process.env.PORT || 3000);
app.use(express.static('public'))
app.use(express.json());


const stripe = require("stripe")('sk_test_51NOz1fIi4beyPjru1XAPSAdxY1x8zH8fJMOghajQGbgq2SVgE3R2tLTj8fhoZ8kCJHq7wX0PKgstks4S6NUBwRYA006SNgD679');

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
/*const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)
  
module.exports = [
    'strapi::errors',
    'strapi::security',
    'strapi::poweredBy',
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        headers: '*',
        origin: ['https://payment-ten-sooty.vercel.app/']
      }
    },
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];

const stripe = require("stripe")('sk_test_51NOz1fIi4beyPjru1XAPSAdxY1x8zH8fJMOghajQGbgq2SVgE3R2tLTj8fhoZ8kCJHq7wX0PKgstks4S6NUBwRYA006SNgD679');

var whitelist = [
    'https://payment-ten-sooty.vercel.app/',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return items;
  };
  
  app.post("/payment/create", async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
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
    res.json({
      clientSecret: paymentIntent.client_secret,
      
    });
  });
  
app.post('/cors-post', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://payment-ten-sooty.vercel.app/');
    const url = 'https://carboncompensate.climatepositive.com/api/v1/calculate';
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "CPF5A58B2108704667ACABF945230F0D61:WQ3ibsd3EQfNuvQmoLR5ygrd8mCUVfSuk47fufXs8Jnziu5fIeXFDXVFPPhJRiq2",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body.json),
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        res.send(data)
    })
    
})

app.post('/cors-post-email', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://payment-ten-sooty.vercel.app/');
    console.log(req.body);
    const url = 'https://carboncompensate.climatepositive.com/api/v1/vend';
    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "CPF5A58B2108704667ACABF945230F0D61:WQ3ibsd3EQfNuvQmoLR5ygrd8mCUVfSuk47fufXs8Jnziu5fIeXFDXVFPPhJRiq2",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body.mergedObj),
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        res.send(data)
    })
    
})
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'https://payment-ten-sooty.vercel.app/');
    
    const url = 'https://carboncompensate.starcb.com/api/v1';
    fetch(url, {
        headers: {
            "Authorization": "CPF5A58B2108704667ACABF945230F0D61:WQ3ibsd3EQfNuvQmoLR5ygrd8mCUVfSuk47fufXs8Jnziu5fIeXFDXVFPPhJRiq2",
        },
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        res.send('This has CORS enabled 🎈'+ data)
    })
    
})

module.exports = app;*/
app.get('/', (req, res) => {
  res.send('Welcome to CORS server 😁')
});
module.exports = app;