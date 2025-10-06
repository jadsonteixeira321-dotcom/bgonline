import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id, type } = req.body;

    // O Mercado Pago envia vários tipos de eventos, filtramos "payment"
    if (type === "payment") {
      // Consultar os detalhes do pagamento
      const response = await fetch(https://api.mercadopago.com/v1/payments/${id}, {
        headers: {
          Authorization: Bearer ${process.env.MP_ACCESS_TOKEN},
        },
      });

      const payment = await response.json();

      if (payment.status === "approved") {
        console.log("💰 Pagamento aprovado:", payment);

        // Aqui você vai salvar no banco (Supabase, etc.)
        // Exemplo: adicionar créditos/cartelas para o usuário
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
