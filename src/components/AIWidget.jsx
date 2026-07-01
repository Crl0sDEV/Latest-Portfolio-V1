"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, X, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

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
  }, [messages, isTyping]);

  const typeText = async (text) => {
    setIsTyping(false);
    setCurrentTyping("");

    const chunkSize = 3;
    for (let i = 0; i < text.length; i += chunkSize) {
      await new Promise((resolve) => setTimeout(resolve, 30));

      const chunk = text.slice(0, i + chunkSize);
      setCurrentTyping(chunk);

      if (i % (chunkSize * 5) === 0) {
        scrollToBottom();
      }
    }

    setCurrentTyping(text);

    setMessages((prev) => [...prev, { role: "assistant", content: text }]);
    setCurrentTyping("");
    scrollToBottom();
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

  const sendMessage = async (overrideText = null) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : input;
    if (!textToSend.trim()) return;
    
    const userMessage = { role: "user", content: textToSend };
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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
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
      <motion.button
        onClick={handleOpen}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[var(--foreground)] text-[var(--background)] w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 group hover:opacity-90 transition-opacity"
      >
        <div className="absolute inset-0 bg-[var(--foreground)] rounded-full animate-ping opacity-20 pointer-events-none" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Bot className="w-6 h-6" />
        )}
      </motion.button>

      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 right-6 md:right-24 bg-[var(--muted)]/80 border border-[var(--border)] text-[var(--foreground)] px-4 py-3 rounded-2xl rounded-tr-none shadow-md z-50 max-w-[200px] backdrop-blur-md"
          >
            <p className="text-sm font-medium">
              👋 {greetingText} <br />{" "}
              <span className="text-[var(--muted-foreground)] text-xs font-light">
                Need help? Chat with AI!
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 md:right-8 w-[90vw] max-w-[360px] h-[500px] bg-[var(--background)]/90 backdrop-blur-xl border border-[var(--border)] rounded-2xl shadow-xl flex flex-col overflow-hidden z-50"
          >
    
            <div className="bg-[var(--muted)]/50 p-4 flex items-center gap-3 border-b border-[var(--border)]">
              <div className="bg-[var(--background)] p-2 rounded-full shadow-sm">
                <Bot className="text-[var(--foreground)] w-5 h-5" />
              </div>
              <div>
                <h2 className="text-[var(--foreground)] font-bold text-sm">
                  Carlos' AI Assistant
                </h2>
                <p className="text-[var(--muted-foreground)] text-xs flex items-center gap-1.5 font-light">
                  <span className="w-2 h-2 bg-green-500/80 rounded-full animate-pulse" />{" "}
                  Online
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[var(--border)] scrollbar-track-transparent overscroll-contain">
              <div className="text-center text-[10px] text-[var(--muted-foreground)] my-2 uppercase tracking-wide">
                Today
              </div>

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[var(--foreground)] text-[var(--background)] rounded-tr-none"
                        : "bg-[var(--muted)]/40 text-[var(--foreground)] border border-[var(--border)] rounded-tl-none font-light prose prose-invert prose-sm max-w-none"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {currentTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed bg-[var(--muted)]/40 text-[var(--foreground)] border border-[var(--border)] rounded-tl-none font-light">
                    {currentTyping}
                    <span className="animate-pulse ml-1 inline-block w-1.5 h-4 bg-[var(--foreground)] align-middle"></span>
                  </div>
                </div>
              )}

              {isTyping && !currentTyping && (
                <div className="flex justify-start">
                  <div className="bg-[var(--muted)]/40 border border-[var(--border)] px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-[var(--muted-foreground)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-[var(--muted-foreground)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-[var(--muted-foreground)] rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-[var(--background)]/80 backdrop-blur-md border-t border-[var(--border)]">
              
              {messages.length < 4 && !isTyping && (
                <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar">
                  {["Who is Carlos?", "What are his tech skills?", "How can I contact him?"].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(suggestion)}
                      className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--border)] bg-[var(--muted)]/30 hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2 items-center bg-[var(--muted)]/30 border border-[var(--border)] rounded-full px-4 py-2 focus-within:border-[var(--muted-foreground)] transition-all"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-[var(--foreground)] text-sm focus:outline-none placeholder:text-[var(--muted-foreground)] font-light"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`p-2 rounded-full transition-all ${
                    input.trim()
                      ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                      : "bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4 -ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-2">
                <p className="text-[10px] text-[var(--muted-foreground)]">
                  Powered by Gemini AI
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
