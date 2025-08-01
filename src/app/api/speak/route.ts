import { NextRequest, NextResponse } from "next/server";
import textToSpeech from "@google-cloud/text-to-speech";
import path from "path";

// Make sure the path is correct relative to the project root
const credsPath = path.resolve("secrets", "anglitor-e258faacab35.json");

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: credsPath,
});

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { text } = body;

//     if (!text) {
//       return NextResponse.json({ error: "Missing text" }, { status: 400 });
//     }

//     const [response] = await client.synthesizeSpeech({
//       input: { text },
//       voice: {
//         languageCode: "he-IL",
//         ssmlGender: "FEMALE",
//       },
//       audioConfig: {
//         audioEncoding: "MP3",
//       },
//     });

//     const audioBuffer = response.audioContent;

//     if (!audioBuffer) {
//       return NextResponse.json({ error: "No audio content" }, { status: 500 });
//     }

//     return new NextResponse(Buffer.from(audioBuffer), {
//       status: 200,
//       headers: {
//         "Content-Type": "audio/mpeg",
//         "Content-Length": String(audioBuffer.length),
//       },
//     });
//   } catch (err) {
//     console.error("TTS Error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, lang = "he", voice = "female" } = body;

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    // Convert voice parameter to Google Cloud TTS format
    const ssmlGender = voice === "male" ? "MALE" : "FEMALE";

    const voiceSettings: Record<
      "he" | "en",
      {
        languageCode: string;
        ssmlGender:
          | "FEMALE"
          | "MALE"
          | "NEUTRAL"
          | "SSML_VOICE_GENDER_UNSPECIFIED";
      }
    > = {
      he: {
        languageCode: "he-IL",
        ssmlGender,
      },
      en: {
        languageCode: "en-US",
        ssmlGender,
      },
    };

    const voiceConfig = voiceSettings[lang as "he" | "en"] ?? voiceSettings["he"];

    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: voiceConfig,
      audioConfig: {
        audioEncoding: "MP3",
      },
    });

    const audioBuffer = response.audioContent;

    if (!audioBuffer) {
      return NextResponse.json({ error: "No audio content" }, { status: 500 });
    }

    return new NextResponse(Buffer.from(audioBuffer), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(audioBuffer.length),
      },
    });
  } catch (err) {
    console.error("TTS Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
