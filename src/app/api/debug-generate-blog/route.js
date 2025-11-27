import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Force dynamic para hindi i-cache ng Next.js ang response
export const dynamic = 'force-dynamic';

export async function GET() {
  // Boss, eto na, binalik ko sa PRO model.
  // Kung specific na "gemini-3-pro" ang kailangan, palitan mo lang yung string sa baba.
  const currentModelName = "gemini-3-pro-preview"; 

  try {
    console.log("🚀 Starting Gemini API Test...");

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Initialize Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    );

    const topics = [
      "Modern Web Development",
      "Artificial Intelligence Trends",
      "React vs Vue vs Angular",
    ];
    const topic = topics[Math.floor(Math.random() * topics.length)];

    const prompt = `
      Write a short, engaging blog post intro about: "${topic}".
      Return ONLY the plain text content.
      Structure:
      - Catchy Title (First line)
      - 2 Paragraphs of content
    `;

    console.log(`📝 Attempting to generate with model: ${currentModelName}`);

    // Direct fetch na, wala nang fallback para iwas lito sa errors
    const model = genAI.getGenerativeModel({ model: currentModelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();

    // Validation
    if (!output || output.trim().length < 10) {
      throw new Error("Empty response from Gemini");
    }

    // Parse Content (Get Title)
    const lines = output.split("\n").filter(l => l.trim() !== "");
    const cleanTitle = lines[0].replace(/^#|\*/g, "").trim();

    console.log(`✅ Gemini Success using [${currentModelName}]! Title:`, cleanTitle);

    // Save to Supabase
    const { data, error: dbError } = await supabase
      .from("blog_posts")
      .insert({
        title: cleanTitle,
        content: output,
      })
      .select();

    if (dbError) {
      console.error("❌ Supabase Error:", dbError);
      return NextResponse.json({ error: "Database error: " + dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "API is working!",
      model_used: currentModelName,
      generated_data: {
        title: cleanTitle,
        preview: output.substring(0, 100) + "..."
      }
    });

  } catch (error) {
    console.error("❌ API Route Error:", error);

    // Specific handling for Quota/Rate Limit (Error 429)
    if (error.message?.includes("429") || error.message?.includes("quota") || error.status === 429) {
      return NextResponse.json({ 
        error: "Quota Exceeded (Rate Limit).",
        details: "Masyadong mabilis o naubos na ang free request. Maghintay ng 1-2 minutes bago i-refresh.",
        model_tried: currentModelName
      }, { status: 429 });
    }

    // Specific handling for Model Not Found (Error 404)
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      return NextResponse.json({ 
        error: `Model '${currentModelName}' not found.`,
        details: "Double check your API Key permissions or try 'gemini-1.5-flash'.",
        model_tried: currentModelName
      }, { status: 404 });
    }

    return NextResponse.json({ 
      error: error.message || "Internal Server Error",
      details: "Check console logs for full error."
    }, { status: 500 });
  }
}