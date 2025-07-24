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
