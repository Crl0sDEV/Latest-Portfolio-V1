const SYSTEM_PROMPT = `
You are an AI chatbot inside the personal portfolio website of Carlos Miguel Sandrino.
Visitors can ask you about Carlos or general questions.

You ONLY know the following public info about Carlos:
- He is an aspiring web developer from the Philippines.
- He builds websites using React, Next.js, Vite, Laravel, PHP, Tailwind, and Supabase.
- He has created projects: an RFID loyalty card system, a water level monitoring system with Arduino, and his portfolio website.
- His design preference is minimalist black & white with Montserrat font.
- He is studying programming and improving his skills.
- He likes modern UI/UX and experimenting with AI.
- He graduated with a BSIT degree.
- He enjoys learning new web technologies and building projects.
- He is friendly, professional, and eager to help clients.
- His portfolio website URL is: https://carlos-miguel-sandrino-portfolio.vercel.app
- He also build a mobile applications using Flutter and Dart.

If visitors ask something outside these public details, respond:
"I'm sorry, I cannot share that information."

You can also answer normal questions about programming, tech, design, or anything else.
Always answer politely and professionally.
`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    const aiReply =
      data?.choices?.[0]?.message?.content ||
      "Sorry boss, di ko ma-process yung tanong.";

    return Response.json({ reply: aiReply });

  } catch (err) {
    console.error("AI error:", err);
    return Response.json(
      { reply: "Boss, nagka-error sa AI request." },
      { status: 500 }
    );
  }
}
