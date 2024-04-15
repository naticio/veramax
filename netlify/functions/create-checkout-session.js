// netlify/functions/create-checkout-session.js
const stripe = require("stripe")(
  process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY_PROD
  //process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY_TEST //temporary march-26
);

exports.handler = async (event) => {
  try {
    // Parse the incoming request body to get the dynamic priceId
    const { priceId } = JSON.parse(event.body);

    // Ensure priceId is provided, otherwise return an error
    if (!priceId) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Price ID is required" }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Replace 'price_1Hxxxxxx' with your actual price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://veramaxi.com/?session_id={CHECKOUT_SESSION_ID}&priceId=${priceId}`,
      cancel_url: "https://veramaxi.com/",
      metadata: {
        product_id: priceId, // Or any other identifier you need
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
