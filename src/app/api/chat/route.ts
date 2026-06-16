import { NextRequest, NextResponse } from "next/server";
import { generateMentorResponse, ChatMessage, MentorContext } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory, userContext } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const context: MentorContext = {
      userName: userContext?.name,
      userLevel: userContext?.level,
      userInterests: userContext?.interests,
      conversationHistory: conversationHistory || [],
    };

    const response = await generateMentorResponse(message, context);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
