"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FunnyQuestionsProps {
  onUnlockGift: () => void;
}

const allQuestions = [
  // Normal Questions
  {
    text: "Nuvvu toothpaste ni water tho mix chesi tintava leka plain ga tintava? 😆",
    options: ["Mix with water 💧", "Plain ga 🦷"],
    timeLimit: 4,
    buttonAColor: "bg-blue-500",
    buttonBColor: "bg-cyan-500"
  },
  {
    text: "Nuvvu bath lo singing chesthava leka speech ivvava? 🎤",
    options: ["Singing 🎶", "Speech 🗣️"],
    timeLimit: 4,
    buttonAColor: "bg-purple-500",
    buttonBColor: "bg-pink-500"
  },
  {
    text: "Nuvvu ghost ni chusthe selfie tiskuntava leka run avutava? 👻",
    options: ["Selfie 📸", "Run 🏃‍♂️💨"],
    timeLimit: 4,
    buttonAColor: "bg-gray-600",
    buttonBColor: "bg-orange-500"
  },
  {
    text: "Nenu trouble lo padithe, nannu save chesthava leka video teesthava? 😂",
    options: ["Save chestha 🦸‍♂️", "Video teestha 📱"],
    timeLimit: 4,
    buttonAColor: "bg-green-500",
    buttonBColor: "bg-red-500"
  },
  {
    text: "Nenu dance chesthe, encourage chesthava leka roast chesthava? 🕺🔥",
    options: ["Encourage 👏", "Roast 🔥"],
    timeLimit: 4,
    buttonAColor: "bg-yellow-500 text-black",
    buttonBColor: "bg-red-600"
  },
  // Rapid Fire
  { text: "Sleep 😴 vs Phone 📱", options: ["Sleep 😴", "Phone 📱"], timeLimit: 4, buttonAColor: "bg-indigo-500", buttonBColor: "bg-sky-500" },
  { text: "Food 🍗 vs Games 🎮", options: ["Food 🍗", "Games 🎮"], timeLimit: 4, buttonAColor: "bg-orange-600", buttonBColor: "bg-emerald-600" },
  { text: "Me 😎 vs Friends 😁", options: ["Me 😎", "Friends 😁"], timeLimit: 4, buttonAColor: "bg-amber-500 text-black", buttonBColor: "bg-teal-500" },
  { text: "Study 📚 vs Chill 😌", options: ["Study 📚", "Chill 😌"], timeLimit: 4, buttonAColor: "bg-blue-700", buttonBColor: "bg-fuchsia-500" },
  { text: "Morning 🌞 vs Night 🌙", options: ["Morning 🌞", "Night 🌙"], timeLimit: 4, buttonAColor: "bg-yellow-400 text-black", buttonBColor: "bg-slate-800 border border-slate-600" },
];

export default function FunnyQuestions({ onUnlockGift }: FunnyQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(allQuestions[0].timeLimit);
  const [isExploded, setIsExploded] = useState(false);

  // Timer Countdown Logic
  useEffect(() => {
    if (quizFinished || isExploded || showFeedback) return;
    
    if (timeLeft <= 0) {
      setIsExploded(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, quizFinished, isExploded, showFeedback]);

  const handleAnswer = (optionIndex: number) => {
    // Show quick feedback
    const replies = ["Good choice! 🤣", "Of course you'd pick that! 😂", "Hmm, interesting! 🤔", "Haha classic! 😆"];
    setFeedbackMsg(replies[Math.floor(Math.random() * replies.length)]);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < allQuestions.length - 1) {
        const nextQ = currentQuestion + 1;
        setCurrentQuestion(nextQ);
        setTimeLeft(allQuestions[nextQ].timeLimit); // reset timer for next question
      } else {
        setQuizFinished(true);
      }
    }, 1500); // Faster transitions 1.5s
  };

  const restartQuiz = () => {
    setIsExploded(false);
    setQuizFinished(false);
    setCurrentQuestion(0);
    setTimeLeft(allQuestions[0].timeLimit);
    setShowFeedback(false);
  };

  const isRapidFire = currentQuestion >= 5;

  return (
    <div className="py-12 md:py-24 px-4 sm:px-6 md:px-12 w-full max-w-4xl mx-auto flex flex-col items-center">
      <AnimatePresence mode="wait">
        {isExploded ? (
          <motion.div
            key="explosion"
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: 1, rotate: [0, -10, 10, -10, 10, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-red-900/80 backdrop-blur-xl border-4 border-red-500 p-6 sm:p-8 md:p-12 rounded-3xl shadow-[0_0_100px_rgba(239,68,68,0.8)] w-full max-w-lg md:max-w-full mx-auto text-center flex flex-col items-center"
          >
            <span className="text-6xl md:text-8xl mb-4 md:mb-6 block animate-bounce">💥</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-white text-glow drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
              TIME UP! BOOM!
            </h2>
            <p className="text-lg md:text-xl text-red-200 mb-8 md:mb-10">
              You were too slow, bro! 😂 Gotta be faster than that!
            </p>
            <button
              onClick={restartQuiz}
              className="px-6 py-3 md:px-8 md:py-4 bg-white text-red-600 rounded-full font-black text-xl md:text-2xl shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:scale-110 transition-transform"
            >
              Restart Quiz 🔄
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`backdrop-blur-xl border p-5 sm:p-8 md:p-12 rounded-3xl w-full max-w-md md:max-w-full mx-auto text-center flex flex-col items-center shadow-2xl transition-colors duration-500 ${
              isRapidFire ? 'bg-orange-900/30 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.2)]' : 'bg-white/10 border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]'
            }`}
          >
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 font-mono text-transparent bg-clip-text ${isRapidFire ? 'bg-gradient-to-r from-red-400 to-yellow-400' : 'bg-gradient-to-r from-blue-300 to-green-300'}`}>
              {isRapidFire ? "⚡ RAPID FIRE ⚡" : "Brother Quiz Mode 🧐"}
            </h2>

            {!quizFinished && !showFeedback && (
              <div className="w-full max-w-[200px] md:max-w-md mx-auto mb-6 md:mb-8 bg-black/40 rounded-full h-4 overflow-hidden border border-white/10 relative">
                <motion.div
                  className={`h-full ${timeLeft <= 3 ? 'bg-red-500' : isRapidFire ? 'bg-orange-500' : 'bg-green-500'}`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / allQuestions[currentQuestion].timeLimit) * 100}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white z-10">
                  {timeLeft}s
                </span>
              </div>
            )}
            
            <AnimatePresence mode="wait">
              {!quizFinished ? (
                !showFeedback ? (
                  <motion.div
                    key={`q-${currentQuestion}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="w-full flex flex-col"
                  >
                    <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 md:mb-10 text-glow font-medium min-h-[60px] md:min-h-[80px]">
                      {allQuestions[currentQuestion].text}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full">
                      <button 
                        onClick={() => handleAnswer(0)}
                        className={`w-full sm:w-1/2 px-4 py-3 md:px-6 md:py-5 rounded-2xl font-black text-white text-lg md:text-xl transition-all hover:scale-105 active:scale-95 shadow-lg ${allQuestions[currentQuestion].buttonAColor}`}
                      >
                        {allQuestions[currentQuestion].options[0]}
                      </button>
                      <button 
                        onClick={() => handleAnswer(1)}
                        className={`w-full sm:w-1/2 px-4 py-3 md:px-6 md:py-5 rounded-2xl font-black text-white text-lg md:text-xl transition-all hover:scale-105 active:scale-95 shadow-lg ${allQuestions[currentQuestion].buttonBColor}`}
                      >
                        {allQuestions[currentQuestion].options[1]}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="min-h-[150px] md:min-h-[200px] flex items-center justify-center w-full"
                  >
                    <p className="text-2xl md:text-4xl font-bold text-yellow-300 italic text-glow">
                      {feedbackMsg}
                    </p>
                  </motion.div>
                )
              ) : (
                <motion.div
                  key="finished"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center min-h-[150px] md:min-h-[200px] justify-center w-full"
                >
                  <p className="text-xl md:text-3xl font-bold text-green-400 italic text-glow mb-6 md:mb-8 animate-pulse">
                    Okay okay, you survived the Rapid Fire! 🥳 You passed.
                  </p>
                  <button
                    onClick={onUnlockGift}
                    className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full text-white font-black text-lg md:text-2xl shadow-[0_0_40px_rgba(236,72,153,0.8)] hover:scale-110 transition-transform hover:shadow-[0_0_60px_rgba(236,72,153,1)]"
                  >
                    Unlock Surprise Gift 🎁
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
