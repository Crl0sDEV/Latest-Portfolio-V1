"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const init = async () => {
      await fetchLikes();
      checkDailyLimit();
    };
    init();
  }, []);

  const checkDailyLimit = () => {
    const lastLikedDate = localStorage.getItem("last_liked_date");
    const today = new Date().toDateString();
    if (lastLikedDate === today) {
      setHasLiked(true);
    }
  };

  const fetchLikes = async () => {
    const { data } = await supabase
      .from("site_likes")
      .select("count")
      .eq("id", 1)
      .single();

    if (data) {
      setLikes(data.count);
    }
    setIsLoading(false);
  };

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setLikes((prev) => prev + 1);
    setHasLiked(true);
    const today = new Date().toDateString();
    localStorage.setItem("last_liked_date", today);

    await supabase.rpc("increment_likes");
  };

  return (
    <motion.button
      onClick={handleLike}
      disabled={hasLiked || isLoading}
      whileHover={!hasLiked ? { scale: 1.05 } : {}}
      whileTap={!hasLiked ? { scale: 0.95 } : {}}
      className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-full border transition-all duration-300 shadow-lg ${
        hasLiked
          ? "bg-red-500/10 border-red-500/50 text-red-400 cursor-default shadow-red-500/10"
          : "bg-zinc-900/80 border-white/10 text-gray-400 hover:border-red-500/50 hover:text-red-400 hover:bg-zinc-800 hover:shadow-red-500/20 cursor-pointer"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <FaHeart className={`text-lg transition-colors ${hasLiked ? "text-red-500" : "currentColor"}`} />

        <AnimatePresence>
          {hasLiked && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, y: -25, scale: 1.5, rotate: [-10, 10, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 text-red-500 pointer-events-none"
            >
              <FaHeart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="font-bold text-sm min-w-5 text-center">
        {isLoading ? (
          <div className="h-4 w-8 bg-white/10 rounded animate-pulse" />
        ) : (
          likes.toLocaleString()
        )}
      </span>
    </motion.button>
  );
}