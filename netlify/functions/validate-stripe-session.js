//const stripe = require("stripe")(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY_PROD);
const stripe = require("stripe")(
  process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY_PROD
); //temporary marh-26!

exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { sessionId } = JSON.parse(event.body);

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if the session is paid (use other criteria as needed)
    if (session.payment_status === "paid") {
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: true, session }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: false, session }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to validate session" }),
    };
  }
};
