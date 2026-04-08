"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PersonalMessage() {
  const message = "Manohar, you are the most amazing brother anyone could ask for. Thank you for always being there, for the laughs, the crazy times, and the endless support. May this year bring you all the success and joy you deserve. Happy Birthday! ❤️";
  const words = message.split(" ");
  const [startTyping, setStartTyping] = useState(false);

  return (
    <div className="py-24 px-6 md:px-12 w-full max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => setStartTyping(true)}
        className="bg-black/30 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.2)]"
      >
        <h2 className="text-3xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-500">
          A Message For You 💌
        </h2>
        <div className="text-xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-light">
          {startTyping && words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.1 }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
