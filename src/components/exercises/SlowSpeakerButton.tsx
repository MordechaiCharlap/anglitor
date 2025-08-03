"use client";

interface SlowSpeakerButtonProps {
  onClick: () => void;
  className?: string;
}

export function SlowSpeakerButton({ onClick, className = "" }: SlowSpeakerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 transition-all duration-200 hover:scale-105 text-xl cursor-pointer ${className}`}
    >
      🐢
    </button>
  );
}