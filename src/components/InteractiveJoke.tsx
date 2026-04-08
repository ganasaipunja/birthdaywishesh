"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const jokes = [
  "You're adopted. (Just kidding!) 😂",
  "Remember when you ate sand as a kid? Yeah, me too.",
  "You're my favorite brother... mostly because you're the only one.",
  "Happy Birthday! I was going to buy you a gift, but my presence is enough. 🎁",
  "I smile because you are my brother. I laugh because there is nothing you can do about it! 😈",
];

interface InteractiveJokeProps {
  isQuizFinished: boolean;
}

export default function InteractiveJoke({ isQuizFinished }: InteractiveJokeProps) {
  const [jokeIndex, setJokeIndex] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const revealJoke = () => {
    if (!isQuizFinished) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    setShowWarning(false);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * jokes.length);
    } while (nextIndex === jokeIndex && jokes.length > 1);
    setJokeIndex(nextIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 md:my-12 p-6 md:p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl w-[90%] md:max-w-xl mx-auto relative overflow-hidden">
      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center text-glow z-10">
        Time for a Surprise!
      </h3>
      
      <button
        onClick={revealJoke}
        className="text-base sm:text-lg px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(236,72,153,0.5)] cursor-pointer z-10 w-full sm:w-auto"
      >
        Click me for a surprise 😂
      </button>

      <div className="h-32 md:h-24 mt-4 md:mt-6 flex items-center justify-center relative w-full z-10">
        <AnimatePresence mode="wait">
          {showWarning ? (
            <motion.p
              key="warning"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-lg md:text-xl text-red-400 font-bold text-center absolute px-2"
            >
              Wait a second... Complete the Brother Quiz first! 🧐
            </motion.p>
          ) : jokeIndex !== null ? (
            <motion.p
              key={`joke-${jokeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-lg md:text-xl text-yellow-300 font-medium text-center italic absolute px-2"
            >
              "{jokes[jokeIndex]}"
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
