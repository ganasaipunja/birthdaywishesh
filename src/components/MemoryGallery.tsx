"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaImage } from "react-icons/fa";

interface MemoryGalleryProps {
  onStartQuiz: () => void;
}

const memories = [
  { id: 1, caption: "Our best adventure 🌲", imageSrc: "/13.jpg", position: "object-top" },
  { id: 2, caption: "That crazy party 🎉", imageSrc: "/5.jpg", position: "object-center" },
  { id: 3, caption: "Childhood memories 👶", imageSrc: "/1.jpg", position: "object-center" },
  { id: 4, caption: "Just hanging out 🛋️", imageSrc: "/3.png", position: "object-center" },
  { id: 5, caption: "Unforgettable moments 🌟", imageSrc: "/14.jpg", position: "object-center" },
  { id: 6, caption: "Brothers forever 💙", imageSrc: "/11.jpg", position: "object-center" },
];

export default function MemoryGallery({ onStartQuiz }: MemoryGalleryProps) {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const handleReveal = (id: number) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className="py-12 md:py-16 w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-8 md:mb-12 text-center text-glow">
        Memory Lane
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-[90vw] mx-auto">
        {memories.map((item, index) => {
          const isRevealed = revealedIds.includes(item.id);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: isRevealed ? 1.05 : 1, rotate: index % 2 === 0 ? 2 : -2 }}
              onClick={() => handleReveal(item.id)}
              className={`relative p-[3px] overflow-hidden rounded-2xl shadow-lg md:shadow-2xl aspect-[4/5] ${isRevealed ? "cursor-default group" : "cursor-pointer"}`}
            >
              {/* Spinning Gradient Border */}
              <div 
                className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] pointer-events-none"
                style={{ background: 'conic-gradient(from 90deg at 50% 50%, #ec4899, #8b5cf6, #3b82f6, #06b6d4, #ec4899)' }}
              />

              {/* Inner content container */}
              <div className="relative h-full w-full bg-gray-900 rounded-[14px] overflow-hidden">
                {/* Actual Image Background */}
                <motion.div 
                  className="absolute inset-0"
                  initial={false}
                  animate={isRevealed ? { scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)" } : { scale: 0.5, rotate: 15, opacity: 0, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <img 
                    src={item.imageSrc} 
                    alt={item.caption}
                    className={`w-full h-full object-contain bg-black ${item.position} ${isRevealed ? 'group-hover:scale-110' : ''} transition-transform duration-700`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='rgba(255,255,255,0.1)'/><text x='50%' y='50%' fill='white' font-family='sans-serif' font-size='12' text-anchor='middle'>Image Not Found</text></svg>";
                    }}
                  />
                </motion.div>

              {/* Caption Overlay - Only shows after revealed */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6"
                  >
                    <p className="text-white font-semibold text-sm md:text-lg drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.caption}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secret Cover overlay with Pop effect */}
              <AnimatePresence>
                {!isRevealed && (
                  <motion.div
                    exit={{ scale: 2.5, opacity: 0, filter: "brightness(2)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-pink-900 flex flex-col items-center justify-center z-10 backdrop-blur-md"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-4xl md:text-5xl mb-3">🎈</span>
                      <p className="text-white font-bold text-base md:text-lg bg-black/30 px-4 py-2 rounded-full border border-white/20">
                        Click to Reveal
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            </motion.div>
          );
        })}
      </div>
      
      <motion.button
        onClick={onStartQuiz}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10 md:mt-16 sm:w-auto w-full max-w-sm px-6 py-4 md:px-8 md:py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 rounded-full text-white font-bold text-base md:text-lg shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all transform hover:scale-105 z-20"
      >
        Take the Brother Quiz 😂
      </motion.button>
    </div>
  );
}

