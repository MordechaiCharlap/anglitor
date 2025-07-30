import { useCallback } from "react";

export function useSpeak(lang: string = "en-US") {
  return useCallback(
    (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    },
    [lang]
  );
}

export function speechToText() {
  return useCallback(
    (onResult: (text: string) => void, onError?: (error: string) => void) => {
      // Check if browser supports speech recognition
      if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
      ) {
        onError?.("Speech recognition not supported in this browser");
        return;
      }

      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.language = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        onError?.(event.error);
      };

      recognition.start();
    },
    []
  );
}

export function playCelebrationSound() {
  return useCallback(() => {
    // Create a cheerful celebration sound using Web Audio API
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Play a series of happy notes
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const duration = 0.15;

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = "sine";

      // Create a bell-like sound envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + index * duration + 0.01
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + index * duration + duration
      );

      oscillator.start(audioContext.currentTime + index * duration);
      oscillator.stop(audioContext.currentTime + index * duration + duration);
    });
  }, []);
}
export async function speakEnglish(text: string, voice: 'male' | 'female' = 'female') {
  const response = await fetch("/api/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: text,
      lang: "en",
      voice: voice,
    }),
  });
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
}
export async function speakHebrew(text: string, voice: 'male' | 'female' = 'female') {
  const response = await fetch("/api/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: text,
      lang: "he",
      voice: voice,
    }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.play();
}

export async function speakEnglishSlow(text: string, voice: 'male' | 'female' = 'female') {
  const words = text.split(' ');
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    
    try {
      const response = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: word,
          lang: "en",
          voice: voice,
        }),
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      // Set playback rate to half speed
      audio.playbackRate = 0.5;
      
      // Play the word and wait for it to finish
      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.play();
      });
      
      // Wait 0.3 seconds before next word (except for the last word)
      if (i < words.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } catch (error) {
      console.error('Error speaking word:', word, error);
    }
  }
}
