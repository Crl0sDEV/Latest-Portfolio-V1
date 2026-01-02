"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { FaPaperPlane, FaRobot, FaTimes, FaComments } from "react-icons/fa"; 

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSentWelcome, setHasSentWelcome] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetingText, setGreetingText] = useState("");

  const welcomeLock = useRef(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentTyping, isTyping]);

  const typeText = async (text) => {
    setIsTyping(false);
    setCurrentTyping("");
    let visibleText = "";
    
    for (let char of text) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      visibleText += char;
      setCurrentTyping(visibleText);
      scrollToBottom();
    }
    
    setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    setCurrentTyping("");
  };

  const handleOpen = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState === true && !hasSentWelcome && !welcomeLock.current) {
        welcomeLock.current = true;
        setHasSentWelcome(true);
        setIsTyping(true); 
        setTimeout(() => {
          typeText(
            "Hello! I'm Carlos’ AI Assistant. Feel free to ask anything — about Carlos, coding, ideas, or any topic you're curious about!"
          );
        }, 800);
      }
      return newState;
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newHistory = [...messages, userMessage];
    
    setMessages(newHistory);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await res.json();
      let aiText = Array.isArray(data)
        ? data[0]?.generated_text || "No response"
        : data.reply || "No response";
      
      typeText(aiText);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    let text = "Hello!";
    if (hour < 12) text = "Good morning!";
    else if (hour < 18) text = "Good afternoon!";
    else text = "Good evening!";
    setGreetingText(text);

    const greeted = sessionStorage.getItem("ai_greeting_shown");
    if (!greeted) {
      setTimeout(() => {
        setShowGreeting(true);
        sessionStorage.setItem("ai_greeting_shown", "true");
        setTimeout(() => setShowGreeting(false), 5000);
      }, 2000);
    }
  }, []);

  return (
    <>
      {/* FLOATING BUTTON (Modern Pulse Effect) */}
      <motion.button
        onClick={handleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-green-500 text-black w-14 h-14 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.4)] flex items-center justify-center hover:bg-green-400 transition-colors z-50 group"
      >
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 pointer-events-none" />
        {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-2xl" />}
      </motion.button>

      {/* GREETING BUBBLE (Animated) */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="fixed bottom-24 right-6 md:right-24 bg-zinc-800 border border-green-500/30 text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-xl z-50 max-w-[200px]"
            >
                <p className="text-sm font-medium">👋 {greetingText} <br/> <span className="text-gray-400 text-xs">Need help? Chat with AI!</span></p>
            </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT PANEL (Glassmorphism & AnimatePresence) */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-24 right-6 md:right-8 w-[90vw] max-w-[360px] h-[500px] bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
            >
                {/* HEADER */}
                <div className="bg-linear-to-r from-green-600 to-emerald-600 p-4 flex items-center gap-3 shadow-md">
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <FaRobot className="text-white text-lg" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-sm">Carlos' AI Assistant</h2>
                        <p className="text-green-100 text-xs flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" /> Online
                        </p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="ml-auto text-white/80 hover:text-white transition">
                        <FaTimes />
                    </button>
                </div>

                {/* MESSAGES AREA */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {/* Welcome Timestamp */}
                    <div className="text-center text-[10px] text-gray-500 my-2 uppercase tracking-wide">
                        Today
                    </div>

                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.role === "user"
                                        ? "bg-green-600 text-white rounded-tr-none"
                                        : "bg-zinc-800 text-gray-200 border border-white/5 rounded-tl-none"
                                }`}
                            >
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}

                    {/* Typing Animation (Current Stream) */}
                    {currentTyping && (
                        <div className="flex justify-start">
                             <div className="max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed bg-zinc-800 text-gray-200 border border-white/5 rounded-tl-none">
                                {currentTyping}
                                <span className="animate-pulse ml-1 inline-block w-1.5 h-4 bg-green-500 align-middle"></span>
                             </div>
                        </div>
                    )}

                    {/* Thinking Indicator (Bouncing Dots) */}
                    {isTyping && !currentTyping && (
                        <div className="flex justify-start">
                             <div className="bg-zinc-800 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-gray-500 rounded-full" />
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-500 rounded-full" />
                                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-500 rounded-full" />
                             </div>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                {/* INPUT AREA */}
                <div className="p-3 bg-zinc-900 border-t border-white/10">
                    <form 
                        onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                        className="flex gap-2 items-center bg-zinc-800 border border-white/10 rounded-full px-4 py-2 focus-within:border-green-500/50 focus-within:ring-1 focus-within:ring-green-500/20 transition-all"
                    >
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-500"
                        />
                        <button 
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className={`p-2 rounded-full transition-all ${
                                input.trim() 
                                    ? "bg-green-500 text-black hover:bg-green-400 hover:scale-105" 
                                    : "bg-zinc-700 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            <FaPaperPlane className="text-xs" />
                        </button>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-gray-600">Powered by Gemini AI</p>
                    </div>
                </div>

            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}