export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Webhook recebido:", req.body);
    res.status(200).send("OK");
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
