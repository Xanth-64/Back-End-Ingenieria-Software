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
      cancel_url: `http://localhost:3000${req.body.url}`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.log(err);
    res.end();
  }
};

export const handlePayment = async (req, res) => {
  const payload = req.body;
  const signature = req.headers["stripe-signature"];
  let event;
  event = req.body;
  // try {
  //   console.log(payload);
  //   console.log(process.env.STRIPE_WEBHOOK_SECRET);
  //   event = stripe.webhooks.constructEvent(
  //     payload,
  //     signature,
  //     process.env.STRIPE_WEBHOOK_SECRET
  //   );
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).end();
  // }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log(session.metadata);
    try {
      await sequelize.models.pedido.create({ qr: session.metadata.QR });
    } catch (err) {
      console.log(err);
      res.status(400).end();
    }
  }
  res.status(200).end();
};
