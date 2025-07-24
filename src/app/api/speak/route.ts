import { NextRequest, NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient({
  // If using service account:
  // keyFilename: "google-creds.json"
});

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: "he-IL", // Hebrew - Israel
      ssmlGender: "FEMALE", // or 'MALE'
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  });

  return new NextResponse(response.audioContent, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}