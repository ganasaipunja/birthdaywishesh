"use client";

import { motion } from "framer-motion";

export default function CelebrationFooter() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-gradient-to-t from-black to-transparent relative overflow-hidden">
      
      {/* CSS Fireworks Base */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_50px_20px_#ec4899]"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_50px_20px_#3b82f6]"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_50px_20px_#eab308]"></div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="z-10 text-center px-4"
      >
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-glow leading-tight">
          You are the best <br className="md:hidden" /> brother ever 💙
        </h2>
        <p className="text-xl md:text-2xl mt-4 md:mt-6 text-white tracking-widest text-glow">
          Love you always!
        </p>

        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 text-5xl md:text-7xl mb-8"
        >
          🎇🍻🎇
        </motion.p>
        
        <button
          onClick={() => window.location.reload()}
          className="mt-6 md:mt-12 px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white font-bold text-lg md:text-xl backdrop-blur-md transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)] w-[80%] md:w-auto mx-auto"
        >
          Restart Experience 🔄
        </button>
      </motion.div>
    </div>
  );
}
