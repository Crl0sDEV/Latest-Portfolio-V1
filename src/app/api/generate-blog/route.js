import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const modelName = "gemini-3-pro-preview";

  try {
    console.log("🚀 Starting Blog Generation Cron/API...");

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    );

    const topics = [
      "Modern Web Development",
      "Artificial Intelligence",
      "Mobile App Trends",
      "Cybersecurity Basics",
      "React + Next.js Tutorials",
      "Programming Best Practices",
      "Freelancing Tips",
      "Beginner Coding Roadmaps",
      "Tech News Summary",
      "Software Engineering Lessons"
    ];

    const topic = topics[Math.floor(Math.random() * topics.length)];
    console.log(`📝 Selected Topic: "${topic}"`);

    const prompt = `
      Write a concise, high-value tech blog post about: "${topic}".
      
      Structure Requirements:
      - A catchy, short title (First line, no "Title:" prefix)
      - A short Introduction (hook the reader in 2 sentences)
      - "Key Takeaways" or "Quick Tips" section (use bullet points)
      - A short code snippet or real-world example (if applicable to the topic)
      - A 1-sentence inspiring Conclusion

      Style Guidelines:
      - Keep paragraphs short (1-3 sentences max).
      - Use bullet points often for readability.
      - Tone: Enthusiastic, expert, and direct to the point.
      - Length: 300–450 words maximum.
      - Format: Markdown (but do NOT wrap in code blocks like \`\`\`markdown).
    `;

    console.log("⏳ Waiting for Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();

    const cleanTitle = output
      .split("\n")
      .find((line) => line.trim().length > 0)
      ?.replace(/^#|\*|Title:/g, "")
      .trim() || topic;

    if (!output || output.length < 50) {
      throw new Error("Generated content was too short or empty.");
    }

    console.log(`✅ Generated: "${cleanTitle}"`);

    const { error: dbError } = await supabase.from("blog_posts").insert({
      title: cleanTitle,
      content: output,
      topic: topic,
      is_published: true,
      created_at: new Date().toISOString()
    });

    if (dbError) {
      console.error("❌ Database Insert Error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      title: cleanTitle,
      topic: topic,
      word_count: output.split(/\s+/).length
    });

  } catch (error) {
    console.error("❌ Generation Error:", error);

    if (error.status === 429 || error.message?.includes("429")) {
      return NextResponse.json({ error: "Rate Limit Exceeded (Quota). Try again later." }, { status: 429 });
    }

    return NextResponse.json({ 
      error: error.message || "Internal Server Error",
      details: error.toString()
    }, { status: 500 });
  }
}