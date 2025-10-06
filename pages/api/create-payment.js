import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const preference = await mercadopago.preferences.create({
        items: [
          {
            title: "Produto de teste",
            unit_price: 10,
            quantity: 1,
          },
        ],
      });

      return res.status(200).json({ id: preference.body.id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
