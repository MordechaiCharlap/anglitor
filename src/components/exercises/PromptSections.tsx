import { Text } from "@/components";
import { useExerciseStyles } from "@/styles/exerciseStyles";
import { SpeakerButton, SlowSpeakerButton } from "./index";
interface TextWithAudioPromptProps {
  text: string;
  onPlay: () => void;
}

interface AudioOnlyPromptProps {
  onPlay: () => void;
  onPlaySlow: () => void;
}

export function TextWithAudioPrompt({
  text,
  onPlay,
}: TextWithAudioPromptProps) {
  const styles = useExerciseStyles();

  return (
    <div className="flex items-center gap-4">
      <div className={`flex-[3] p-6 ${styles.textCard}`}>
        <Text
          variant="h3"
          className={`font-semibold text-xl text-center ${styles.text.primary}`}
        >
          {text}
        </Text>
      </div>
      <div className="flex-1 flex justify-center">
        <SpeakerButton onClick={onPlay} />
      </div>
    </div>
  );
}

export function AudioOnlyPrompt({ onPlay, onPlaySlow }: AudioOnlyPromptProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center gap-4">
        <SpeakerButton onClick={onPlay} />
        <SlowSpeakerButton onClick={onPlaySlow} />
      </div>
    </div>
  );
}
