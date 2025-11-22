"use client";

import { useState, useEffect, useRef } from "react";

export default function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSentWelcome, setHasSentWelcome] = useState(false);

  const [messages, setMessages] = useState([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);

  const [greetingText, setGreetingText] = useState("");

  const welcomeLock = useRef(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, currentTyping]);

  const typeText = async (text) => {
    setCurrentTyping("");
    let visibleText = "";

    for (let char of text) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      visibleText += char;
      setCurrentTyping(visibleText);
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

        setTimeout(() => {
          typeText(
            "Hello! 👋 I'm Carlos’ AI Assistant. Feel free to ask anything — about Carlos, coding, ideas, or any topic you're curious about!"
          );
        }, 400);
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
    setLoading(true);

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
  
      setLoading(false);
      typeText(aiText);
    } catch (error) {
      setLoading(false);
      typeText("Sorry, I encountered an error.");
    }
  };

  useEffect(() => {

    const hour = new Date().getHours();
    let text = "Hello!";
    if (hour < 12) text = "Good morning! 🌅";
    else if (hour < 18) text = "Good afternoon! ☀️";
    else text = "Good evening! 🌙";

    setGreetingText(text); 

    const greeted = sessionStorage.getItem("ai_greeting_shown");
    if (!greeted) {
      setTimeout(() => {
        setShowGreeting(true);
        sessionStorage.setItem("ai_greeting_shown", "true");
        setTimeout(() => setShowGreeting(false), 10000);
      }, 1200);
    }
  }, []);

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={handleOpen}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-all z-50"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* GREETING BUBBLE */}
      <div
        className={`fixed bottom-20 right-4 md:right-24 bg-gray-900 text-gray-200 px-4 py-2 rounded-xl border border-gray-700 shadow-lg text-xs md:text-sm transition-all duration-500 z-50 ${
          showGreeting
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        👋 {greetingText} I'm Carlos’ AI Assistant.
      </div>

      {/* CHAT PANEL */}
      <div
        className={`fixed bottom-24 right-4 md:right-6 
        w-[90vw] max-w-sm md:w-80 
        bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-4 
        transition-all z-40
        ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-5"
        }`}
      >
        <h2 className="text-blue-400 font-bold text-lg mb-3">
          🤖 AI Chat Assistant
        </h2>

        <div className="h-[55vh] md:h-64 overflow-y-auto bg-black border border-gray-700 p-3 rounded-lg space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[90%] text-sm md:text-base ${
                msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {currentTyping && (
            <div className="bg-gray-800 text-gray-300 p-2 rounded-lg inline-block">
              {currentTyping}
              <span className="animate-pulse ml-1">▌</span>
            </div>
          )}

          {loading && (
            <div className="text-gray-400 animate-pulse">AI is typing...</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="flex gap-2 mt-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-3 py-2 bg-black border border-gray-700 rounded-lg text-white text-sm md:text-base"
            placeholder="Ask something..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm md:text-base"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}
