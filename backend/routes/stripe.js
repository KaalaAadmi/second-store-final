const express = require("express");
const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// router.post("/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "inr",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr.stack);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });
// localhost:5000/api/checkout/payment
router.post("/payment", async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.img],
          description: item.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 5000,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      // {
      //   shipping_rate_data: {
      //     type: "fixed_amount",
      //     fixed_amount: {
      //       amount: 1500,
      //       currency: "inr",
      //     },
      //     display_name: "Next day air",
      //     // Delivers in exactly 1 business day
      //     delivery_estimate: {
      //       minimum: {
      //         unit: "business_day",
      //         value: 1,
      //       },
      //       maximum: {
      //         unit: "business_day",
      //         value: 1,
      //       },
      //     },
      //   },
      // },
    ],
    // phone_number_collection: {
    //   enabled: true,
    // },
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  // console.log(session.id);
  // console.log(res);
  res.status(200).json({ id: session.id, url: session.url });
});
module.exports = router;
