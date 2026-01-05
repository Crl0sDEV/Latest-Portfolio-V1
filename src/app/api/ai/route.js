import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"), 
});

const SYSTEM_PROMPT = `
You are an AI chatbot inside the personal portfolio website of Carlos Miguel Sandrino.
Visitors can ask you about Carlos or general questions.

You ONLY know the following public info about Carlos:
- He is an aspiring web developer from the Philippines.
- He builds websites using React, Next.js, Vite, Laravel, PHP, Tailwind, and Supabase.
- He has created projects: an RFID loyalty card system, a water level monitoring system with Arduino, a Ecommerce Website, AI-resume analyzer powered with Gemini AI, and his portfolio website.
- Soft Skills: He is a strong communicator, collaborative team player, adapts quickly to new tech, and is detail-oriented.
- Hobbies/Interests: When not coding, he enjoys watching NBA games and movies, playing online games and chess, and staying updated with the latest tech trends.
- His design preference is minimalist black & white with Montserrat font.
- He is studying programming and improving his skills.
- He likes modern UI/UX and experimenting with AI.
- He graduated with a BSIT degree.
- He enjoys learning new web technologies and building projects.
- He is friendly, professional, and eager to help clients.
- His portfolio website URL is: https://carlos-miguel-sandrino-portfolio.vercel.app
- He also build a mobile applications using Flutter and Dart.

If visitors ask something outside these public details (like his address, relationship status, or private life), respond politely:
"I'm sorry, I focus on sharing Carlos's professional work and skills."

You can also answer normal questions about programming, tech, design, or anything else.
Always answer politely and professionally.
`;

export async function POST(req) {
  try {
    
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { reply: "Boss, dahan-dahan lang! Wait ka muna ng 1 minute bago magtanong ulit." },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    const recentMessages = Array.isArray(messages) ? messages.slice(-6) : [];

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
            ...recentMessages
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

    return NextResponse.json({ reply: aiReply });

  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json(
      { reply: "Boss, nagka-error sa AI request." },
      { status: 500 }
    );
  }
}