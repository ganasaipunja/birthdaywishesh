"use client";

import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import BirthdayReveal from "@/components/BirthdayReveal";
import MemoryGallery from "@/components/MemoryGallery";
import FunnyQuestions from "@/components/FunnyQuestions";
import SurpriseGift from "@/components/SurpriseGift";
import InteractiveJoke from "@/components/InteractiveJoke";
import CelebrationFooter from "@/components/CelebrationFooter";
import MusicController from "@/components/MusicController";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [musicCommand, setMusicCommand] = useState<'play' | 'pause' | null>(null);
  const brotherName = "Manu";

  const handleOpenSurprise = () => {
    setIsRevealed(true);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setMusicCommand('pause');
    setTimeout(() => {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

  const unlockGift = () => {
    setShowGift(true);
    setTimeout(() => {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen w-full relative">
      <MusicController command={musicCommand} />

      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
          >
            <LandingScreen onOpen={handleOpenSurprise} brotherName={brotherName} />
          </motion.div>
        ) : (
          <motion.div
            key="revealed-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col relative"
          >
            {/* The flow of the page after the reveal button is clicked */}
            <section className="min-h-screen">
              <BirthdayReveal 
                brotherName={brotherName} 
                onExplore={() => {
                  setShowMemories(true);
                  setTimeout(() => {
                    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
                  }, 100);
                }} 
              />
            </section>

            <AnimatePresence>
              {showMemories && (
                <motion.div
                  key="memories"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <section className="min-h-screen flex items-center bg-black/40 backdrop-blur-md border-t border-white/5 relative z-10">
                    <MemoryGallery onStartQuiz={startQuiz} />
                  </section>

                  {/* Move Quiz Right After Memories */}
                  <AnimatePresence>
                    {showQuiz && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.8 }}
                      >
                        <section className="min-h-screen flex flex-col items-center justify-center relative z-10 bg-black/20">
                          <FunnyQuestions onUnlockGift={unlockGift} />
                          
                          {/* Render Surprise Gift directly beneath the quiz inside the slide-down animation */}
                          <AnimatePresence>
                            {showGift && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                transition={{ duration: 0.8 }}
                                className="w-full"
                              >
                                <SurpriseGift />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </section>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <section className="min-h-[60vh] flex items-center justify-center relative z-10 bg-black/40 backdrop-blur-md">
                    <InteractiveJoke isQuizFinished={showGift} />
                  </section>

                  <section className="min-h-[80vh] relative z-10">
                    <CelebrationFooter />
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}



