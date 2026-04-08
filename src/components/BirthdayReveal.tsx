"use client";

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface BirthdayRevealProps {
  brotherName: string;
  onExplore: () => void;
}

export default function BirthdayReveal({ brotherName, onExplore }: BirthdayRevealProps) {
  const { width, height } = useWindowSize();

  const balloons = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    color: ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500', 'bg-green-500'][i % 6],
    left: `${Math.random() * 80 + 10}%`,
    delay: Math.random() * 2,
    duration: 10 + Math.random() * 5,
  }));

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-magical-gradient overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-50">
        {width > 0 && <Confetti width={width} height={height} numberOfPieces={200} gravity={0.1} />}
      </div>

      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className={`absolute bottom-[-100px] w-16 h-20 rounded-full ${balloon.color} opacity-80 shadow-lg`}
          style={{ left: balloon.left }}
          initial={{ y: 0 }}
          animate={{ y: -height - 200 }}
          transition={{ duration: balloon.duration, repeat: Infinity, delay: balloon.delay, ease: "linear" }}
        >
          <div className="absolute top-[100%] left-[50%] w-1 h-32 bg-white/20 transform -translate-x-[50%]"></div>
        </motion.div>
      ))}

      <motion.div
        className="z-10 text-center flex flex-col items-center"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, duration: 1 }}
      >
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] text-glow p-4">
          Happy Birthday
        </h1>
        <h2 className="text-3xl md:text-6xl font-bold text-white tracking-widest text-glow mb-12">
          {brotherName.toUpperCase()} 🎉🎂
        </h2>

        <motion.button
          onClick={onExplore}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          <span className="text-lg md:text-xl font-bold text-white flex items-center gap-2 md:gap-3">
            Click to see our memories 📸
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

