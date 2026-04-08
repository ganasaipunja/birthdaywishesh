"use client";

import { useState, useRef, useEffect } from "react";
import { FaMusic, FaPlay, FaPause } from "react-icons/fa";

interface MusicControllerProps {
  command?: 'play' | 'pause' | null;
}

export default function MusicController({ command }: MusicControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current || !command) return;
    if (command === 'pause') {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (command === 'play') {
      audioRef.current.play().catch(e => console.error("Autoplay prevented:", e));
      setIsPlaying(true);
    }
  }, [command]);

  useEffect(() => {
    try {
      const audio = new Audio();
      audio.loop = true;
      audio.src = "/__🎵 Song Title_ “Na Thammudu”__.mp3";
      audioRef.current = audio;

      const attemptPlay = () => {
        audio.play().then(() => {
          setIsPlaying(true);
          // Remove listeners once it successfully starts playing
          document.removeEventListener("click", attemptPlay);
          document.removeEventListener("keydown", attemptPlay);
          document.removeEventListener("touchstart", attemptPlay);
        }).catch((e) => {
          console.warn("Autoplay still blocked:", e);
        });
      };

      // 1. Try playing immediately (might work if browser allows it based on past visits)
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Autoplay blocked. Waiting for first user interaction.", e);
        // 2. If blocked, wait for the *very first* click/touch anywhere on the page (like clicking the password box)
        document.addEventListener("click", attemptPlay);
        document.addEventListener("keydown", attemptPlay);
        document.addEventListener("touchstart", attemptPlay);
      });

      return () => {
        document.removeEventListener("click", attemptPlay);
        document.removeEventListener("keydown", attemptPlay);
        document.removeEventListener("touchstart", attemptPlay);
      };
    } catch (e) {
      console.warn("Audio initialization issue", e);
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Handle autoplay policy restriction by capturing the promise
        audioRef.current.play().catch(e => console.error("Autoplay prevented:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center ${isPlaying ? 'bg-pink-500 animate-pulse text-white' : 'bg-white text-pink-500'}`}
    >
      {isPlaying ? <FaPause size={20} /> : <FaMusic size={20} />}
    </button>
  );
}
