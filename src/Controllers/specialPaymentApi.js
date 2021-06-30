const { QueryTypes } = require("sequelize");
const sequelize = require("../Sequelize/modelingIndex");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
//Cruds relacionadas a la API de pagos

export const checkoutProducts = async (req, res) => {
  try {
    let session;
    console.log(req.body.url);
    if (req.body.empreId) {
      let time = 1;
      if (req.body.suscripcionData.pago === 10) {
        time = 1;
      }
      if (req.body.suscripcionData.pago === 60) {
        time = 7;
      }
      if (req.body.suscripcionData.pago === 120) {
        time = 14;
      }
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              product_data: {
                name: req.body.suscripcionData.objeto,
              },
              unit_amount: Math.round(req.body.suscripcionData.pago * 100),
            },
          },
        ],
        metadata: { empreId: req.body.empreId, time: time },
        mode: "payment",
        success_url: `http://localhost:3000/Manage/Emprendimiento`,
        cancel_url: `http://localhost:3000/Manage/Emprendimiento`,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: req.body.productArr.map((elem) => {
          return {
            quantity: 1,
            price_data: {
              currency: "usd",
              product_data: {
                name: elem.nombre,
              },
              unit_amount: Math.round((elem.price + elem.price * 0.1) * 100),
            },
          };
        }),
        metadata: { QR: req.body.qr },
        mode: "payment",
        success_url: `http://localhost:3000${req.body.url}?state=success&qr=${req.body.qr}&dr=${req.body.driveId}`,
        cancel_url: `http://localhost:3000${req.body.url}`,
      });
    }

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
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
    if (session.metadata.QR) {
      try {
        await sequelize.models.pedido.create({ qr: session.metadata.QR });
      } catch (err) {
        console.log(err);
        res.status(400).end();
      }
    } else {
      try {
        const doc1 = await sequelize.query(
          'SELECT MAX(fecha_fin) AS fecha FROM "public"."suscripcion" WHERE "public"."suscripcion"."emprendimientoIdNegocio" = (:idEmp)',
          {
            type: QueryTypes.SELECT,
            replacements: { idEmp: session.metadata.empreId },
          }
        );
        const fechaPrueba = new Date(doc1[0].fecha);
        if (doc1.length !== 0 && fechaPrueba.getFullYear() > 2015) {
          const fechita = doc1[0].fecha;
          const fechaObj = new Date(fechita);
          console.log(fechaObj.getMonth());

          if (fechaObj.getMonth() + session.metadata.time > 11) {
            console.log(fechaObj.getMonth());
            fechaObj.setMonth(fechaObj.getMonth() + session.metadata.time - 11);
            console.log(fechaObj.getMonth());
            fechaObj.setFullYear(fechaObj.getFullYear() + 1);
          } else {
            fechaObj.setMonth(fechaObj.getMonth() + session.metadata.time);
          }
          const doc2 = await sequelize.models.suscripcion.create({
            fecha_fin: fechaObj.toString(),
            emprendimientoIdNegocio: session.metadata.empreId,
          });
          return res
            .status(200)
            .json({ message: "Suscripcion Exitosa", data: [doc2] });
        } else {
          const fechaObj2 = new Date();
          console.log(fechaObj2.toString());
          console.log(fechaObj2.getMonth() + session.metadata.time);
          console.log(session.metadata.time);
          if (fechaObj2.getMonth() + session.metadata.time > 11) {
            fechaObj2.setMonth(
              fechaObj2.getMonth() + session.metadata.time - 11
            );
            fechaObj2.setFullYear(fechaObj2.getFullYear() + 1);
          } else {
            fechaObj2.setMonth(fechaObj2.getMonth() + session.metadata.time);
          }
          console.log(fechaObj2.toString());
          const doc3 = await sequelize.models.suscripcion.create({
            fecha_fin: fechaObj2.toString(),
            emprendimientoIdNegocio: session.metadata.empreId,
          });
          return res
            .status(200)
            .json({ message: "Suscripcion Exitosa", data: [doc3] });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).end();
      }
    }
  }
  res.status(200).end();
};
