import Stripe from "stripe";

export const stripeController = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { cartItems } = req.body;
  console.log("Stripe Controller Products:", cartItems);

  try {
    const line_items = cartItems.map((product) => {
      const priceInCents = Math.round(Number(product.price) * 100);

      if (isNaN(priceInCents)) {
        throw new Error(`Invalid price for product: ${product.name}`);
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: priceInCents,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
