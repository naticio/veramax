const stripe = require("stripe")(process.env.EXPO_PUBLIC_STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { type, data } = JSON.parse(event.body);

  switch (type) {
    case "checkout.session.completed":
      // Handle successful checkout session
      const sessionId = data.object.id;
      // Grant credits or benefits based on the session ID
      break;
    case "payment_intent.failed":
      // Handle failed payment intent
      // Remove credits or rollback changes
      break;
    case "charge.refunded":
      // Extract necessary information, such as the amount refunded
      const { amount_refunded, metadata } = data.object;
      // Use metadata or other identifiers to find the user or transaction in your system
      // Then, reverse the credits or benefits granted
      break;
    // Handle other event types as needed
    // Add more cases as needed for other event types
  }

  // Respond to Stripe to acknowledge receipt of the event
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
