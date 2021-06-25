const sequelize = require("../Sequelize/modelingIndex");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//Cruds relacionadas a la API de pagos

export const checkoutProducts = async (req, res) => {
  try {
    console.log(req.body.url);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.productArr.map((elem) => {
        return {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: elem.nombre,
            },
            unit_amount: Math.round(elem.price * 100),
          },
        };
      }),
      metadata: { QR: req.body.qr },
      mode: "payment",
      success_url: `http://localhost:3000${req.body.url}?state=success`,
      cancel_url: `http://localhost:3000${req.body.url}?state=fail`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.log(err);
    res.end();
  }
};

export const handlePayment = async (req, res) => {
  console.log(req.body);
  console.log(req.body.data.object.metadata);
  res.status(200);
};
