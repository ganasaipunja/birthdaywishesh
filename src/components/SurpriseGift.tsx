"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const giftImages = [
  { id: 1, src: "/7.jpg", pos: "object-center" },
  { id: 2, src: "/15.jpg", pos: "object-center" },
  { id: 3, src: "/3.png", pos: "object-center" },
  { id: 4, src: "/hj.png", pos: "" }, 
];

interface SurpriseGiftProps {
  onVideoEnd?: () => void;
  onVideoPlay?: () => void;
}

export default function SurpriseGift({ onVideoEnd, onVideoPlay }: SurpriseGiftProps) {
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleReveal = (id: number) => {
    if (!revealedIds.includes(id)) {
      setRevealedIds((prev) => [...prev, id]);
    }
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
      if (onVideoPlay) onVideoPlay();
    }
  };

  return (
    <div className="py-12 md:py-24 px-4 sm:px-6 md:px-12 w-full max-w-5xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-pink-500 mb-4 md:mb-8 text-center text-glow">
          Your Ultimate Surprise 🎁
        </h2>
        
        <p className="text-center text-base md:text-xl text-slate-300 mb-12 md:mb-20 italic px-2">
          (A special video and moments dedicated just to you!)
        </p>

        {/* Cinematic Video Player with Light Waves */}
        <div className="relative w-full mb-20 md:mb-32 flex items-center justify-center">
          {/* Light Waves (Pulsing Rings) */}
          <AnimatePresence>
            {!isVideoPlaying && (
              <>
                <motion.div 
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 border-2 border-pink-500/50 rounded-3xl pointer-events-none"
                />
                <motion.div 
                  animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  className="absolute inset-0 border-2 border-purple-500/30 rounded-3xl pointer-events-none"
                />
                <motion.div 
                  animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                  className="absolute inset-0 border-2 border-blue-500/20 rounded-3xl pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full aspect-video bg-black rounded-2xl md:rounded-3xl border-2 border-white/10 shadow-[0_0_50px_rgba(236,72,153,0.3)] flex items-center justify-center overflow-hidden relative z-10 group"
          >
            <video 
              ref={videoRef}
              playsInline
              className="w-full h-full object-contain relative z-10"
              poster="/1.jpg"
              onEnded={() => {
                setIsVideoPlaying(false);
                if (onVideoEnd) onVideoEnd();
              }}
            >
              <source src="/birthday-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Click to Play Video Overlay */}
            <AnimatePresence>
              {!isVideoPlaying && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ scale: 2, opacity: 0, filter: "brightness(2)" }}
                  transition={{ duration: 0.4 }}
                  onClick={handlePlayVideo}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer z-20 group-hover:bg-black/40 transition-colors"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 md:w-32 md:32 bg-white/10 border-2 border-white/30 rounded-full flex items-center justify-center text-white mb-6 hover:bg-white/20 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  >
                    <FaPlay className="text-3xl md:text-5xl ml-2" />
                  </motion.div>
                  <p className="text-xl md:text-3xl font-bold text-white text-glow animate-pulse">
                    Tap to Play Video! 🍿
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Gift Highlights Grid: single col on mobile, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 w-full px-4 sm:px-0">
          {giftImages.map((item, i) => {
            const isRevealed = revealedIds.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="aspect-[4/5] bg-gray-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer overflow-hidden relative group"
              >
                {item.src && (
                  <motion.img 
                    src={item.src} 
                    alt={`Highlight ${item.id}`} 
                    animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    className={`w-full h-full object-contain ${item.pos}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='rgba(255,255,255,0.1)'/><text x='50%' y='50%' fill='white' font-family='sans-serif' font-size='12' text-anchor='middle'>Image Not Found</text></svg>";
                    }}
                  />
                )}

                {/* Click to Reveal Cover */}
                <AnimatePresence>
                  {!isRevealed && (
                    <motion.div 
                      exit={{ scale: 2.5, opacity: 0, filter: "brightness(2)" }}
                      transition={{ duration: 0.4 }}
                      onClick={() => toggleReveal(item.id)}
                      className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-pink-500/20 backdrop-blur-xl flex flex-col items-center justify-center z-10"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col items-center"
                      >
                        <span className="text-5xl md:text-6xl mb-4">🎁</span>
                        <p className="text-white font-bold text-lg md:text-xl bg-black/40 px-6 py-2 rounded-full border border-white/20 whitespace-nowrap">
                          Reveal to See!
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Caption on revealed hover */}
                {isRevealed && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white font-medium text-lg">Birthday Highlight {item.id}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
