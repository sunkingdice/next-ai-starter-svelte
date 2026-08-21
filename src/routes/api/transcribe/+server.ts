/**
 * Groq Whisper transcription endpoint. Accepts multipart audio uploads.
 */
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY ?? "",
});

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return json({ error: "No file uploaded" }, { status: 400 });
    }

    const transcription = await groq.audio.transcriptions.create({
      file,
      model: "distil-whisper-large-v3-en",
    });

    return json({ text: transcription.text });
  } catch (error) {
    console.error("Transcription error:", error);
    return json({ error: "Transcription failed" }, { status: 500 });
  }
};
