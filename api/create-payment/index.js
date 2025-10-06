import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    // Cria a preferência de pagamento
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${process.env.MP_ACCESS_TOKEN}, // sua chave do Mercado Pago
      },
      body: JSON.stringify({
        items: [
          {
            title: "Cartela Bingo",
            quantity: body.quantity || 1,
            currency_id: "BRL",
            unit_price: body.amount || 5.0,
          },
        ],
        external_reference: body.userId || "anon",
        back_urls: {
          success: process.env.SITE_URL + "/success",
          failure: process.env.SITE_URL + "/failure",
          pending: process.env.SITE_URL + "/pending",
        },
        auto_return: "approved",
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao criar pagamento:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
