export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { prompt } = req.body;
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.DEEPSEEK_API_KEY
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "生成失败";
  res.status(200).json({ text });
}