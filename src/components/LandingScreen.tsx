"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingScreenProps {
  onOpen: () => void;
  brotherName: string;
}

export default function LandingScreen({ onOpen, brotherName }: LandingScreenProps) {
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [hoverCount, setHoverCount] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnnoying, setIsAnnoying] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const maxDodges = 5;

  const handleHover = () => {
    if (isPopping) return;
    if (isAnnoying || hoverCount < maxDodges) {
      // Dynamic boundary based on screen size so it actually flies to the edges
      const maxX = typeof window !== "undefined" ? Math.min(window.innerWidth / 2 - 90, 300) : 100;
      const maxY = typeof window !== "undefined" ? Math.min(window.innerHeight / 3 - 60, 300) : 150;
      
      const randomX = Math.floor(Math.random() * (maxX * 2)) - maxX;
      const randomY = Math.floor(Math.random() * (maxY * 2)) - maxY;
      
      setPosition({ x: randomX, y: randomY });
      setHoverCount((prev) => prev + 1);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === "2012") {
      setIsLocked(false);
      setErrorMsg("");
      setIsAnnoying(true);
      setTimeout(() => {
        setIsAnnoying(false);
      }, 15000);
    } else {
      setErrorMsg("Wrong password! Hint: When were you born? 😂");
      setPasswordInput("");
    }
  };

  const getButtonText = () => {
    if (isPopping) return "💥";
    if (hoverCount === 0) return "Tap To Open Surprise 🎁";
    if (isAnnoying) return "Too slow! 😂 Catch me!";
    if (hoverCount < maxDodges) return "Still too slow! 🏃";
    return "Okay fine, click it now 🙄🎁";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-magical-gradient p-4">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-pink-600/20 rounded-full blur-3xl hidden sm:block"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-3xl hidden sm:block"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center w-full max-w-sm md:max-w-md mx-auto"
      >
        <AnimatePresence mode="wait">
          {isLocked ? (
            <motion.div
              key="lock-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center w-full bg-black/40 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-4">
                Surprise Locked 🔒
              </h1>
              <p className="text-base md:text-lg text-slate-300 mb-8">
                Welcome, <span className="font-bold text-white">{brotherName}</span>. Your special birthday surprise is locked behind this security module. Prove you're the real birthday boy!
              </p>
              
              <form onSubmit={handleUnlock} className="flex flex-col w-full gap-4">
                <input
                  type="text"
                  maxLength={4}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Hint: Your birth year"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center text-xl md:text-2xl text-white outline-none focus:border-pink-500 transition-colors"
                />
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl py-3 text-white font-bold tracking-wider hover:opacity-90 transition-opacity"
                >
                  UNLOCK
                </button>
              </form>
              
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 mt-6 text-sm md:text-base font-medium bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20"
                >
                  {errorMsg}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="unlock-screen"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 text-glow tracking-tight pt-4 leading-tight">
                Access Granted, <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400">{brotherName}</span> 🔓
              </h1>
              <p className="text-lg md:text-2xl text-slate-300 mb-12 md:mb-20 animate-pulse">
                Your surprise is ready...
              </p>

              <div className="h-48 md:h-64 flex items-center justify-center w-full">
                <motion.button
                  onClick={() => {
                    if (isPopping) return;
                    if (!isAnnoying && hoverCount >= maxDodges) {
                      setIsPopping(true);
                      setTimeout(() => {
                        onOpen();
                      }, 400); // Wait for pop animation before unmounting
                    }
                  }}
                  onMouseEnter={handleHover}
                  onTouchStart={handleHover}
                  className={`group relative px-4 md:px-8 py-3 md:py-4 backdrop-blur-sm border rounded-full overflow-hidden transition-colors duration-300 w-auto inline-block ${
                    (isAnnoying || hoverCount < maxDodges)
                      ? "bg-white/10 border-white/20 text-white cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,100,100,0.5)] cursor-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" style=\"font-size: 24px\"><text y=\"20\">🏃</text></svg>'),_pointer]"
                      : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 border-none text-white shadow-[0_0_40px_rgba(236,72,153,0.8)] cursor-pointer"
                  }`}
                  initial={{ scale: 0 }}
                  animate={
                    isPopping 
                      ? { scale: 3, opacity: 0 } 
                      : { scale: 1, x: position.x, y: position.y }
                  }
                  transition={
                    isPopping
                      ? { duration: 0.3, ease: "easeOut" }
                      : { 
                          scale: { delay: 0.5, type: "spring", stiffness: 200, damping: 10 },
                          x: { type: "spring", stiffness: 300, damping: 15 },
                          y: { type: "spring", stiffness: 300, damping: 15 }
                        }
                  }
                  whileHover={(!isAnnoying && hoverCount >= maxDodges && !isPopping) ? { scale: 1.05 } : undefined}
                  whileTap={(!isAnnoying && hoverCount >= maxDodges && !isPopping) ? { scale: 0.95 } : undefined}
                >
                  <span className="text-sm md:text-xl font-bold flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap">
                    {getButtonText()} 
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}


