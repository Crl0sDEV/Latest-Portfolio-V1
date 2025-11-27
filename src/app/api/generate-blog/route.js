import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// IMPORTANT: Force dynamic para laging fresh ang content na i-generate
export const dynamic = 'force-dynamic';

export async function GET() {
  const modelName = "gemini-3-pro-preview";

  try {
    console.log("🚀 Starting Blog Generation Cron/API...");

    // 1. Validation
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    // 2. Initialize Clients
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    );

    // 3. Topic Selection (Maintained your list)
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

    // 4. Prompt Construction
    const prompt = `
      Write a high-quality, SEO-ready blog post about: "${topic}".
      
      Structure Requirements:
      - A compelling title (First line, no "Title:" prefix)
      - Introduction
      - 3–5 subheadings
      - Examples
      - Practical tips
      - Conclusion

      Tone: Friendly and professional.
      Length: 600–1200 words.
      Format: Markdown (but do NOT wrap in code blocks like \`\`\`markdown).
    `;

    // 5. Generate Content
    console.log("⏳ Waiting for Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();

    // 6. Safe Title Extraction
    // Hanapin ang unang linyang may laman, tanggalin ang '#' o '*' kung meron
    const cleanTitle = output
      .split("\n")
      .find((line) => line.trim().length > 0)
      ?.replace(/^#|\*|Title:/g, "")
      .trim() || topic;

    if (!output || output.length < 50) {
      throw new Error("Generated content was too short or empty.");
    }

    console.log(`✅ Generated: "${cleanTitle}"`);

    // 7. Save to Supabase
    const { error: dbError } = await supabase.from("blog_posts").insert({
      title: cleanTitle,
      content: output,
      topic: topic, // Optional: kung may topic column ka, pwede mo i-save
      is_published: true, // Optional: depende sa database schema mo
      created_at: new Date().toISOString()
    });

    if (dbError) {
      console.error("❌ Database Insert Error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 8. Success Response
    return NextResponse.json({
      success: true,
      title: cleanTitle,
      topic: topic,
      word_count: output.split(/\s+/).length
    });

  } catch (error) {
    console.error("❌ Generation Error:", error);

    // Specific Error Handling
    if (error.status === 429 || error.message?.includes("429")) {
      return NextResponse.json({ error: "Rate Limit Exceeded (Quota). Try again later." }, { status: 429 });
    }

    return NextResponse.json({ 
      error: error.message || "Internal Server Error",
      details: error.toString()
    }, { status: 500 });
  }
}