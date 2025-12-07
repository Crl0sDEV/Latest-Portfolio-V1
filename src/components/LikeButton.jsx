"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLikes();
    checkDailyLimit();
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
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;

    setLikes((prev) => prev + 1);
    setHasLiked(true);

    const today = new Date().toDateString();
    localStorage.setItem("last_liked_date", today);

    await supabase.rpc("increment_likes");
  };

  if (isLoading) return null;

  return (
    <motion.button
      onClick={handleLike}
      disabled={hasLiked}
      whileHover={!hasLiked ? { scale: 1.1 } : {}}
      whileTap={!hasLiked ? { scale: 0.9 } : {}}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all ${
        hasLiked
          ? "bg-red-500/10 border-red-500/50 text-red-400 cursor-default"
          : "bg-white/5 border-white/10 text-gray-400 hover:border-red-500/50 hover:text-red-400 cursor-pointer"
      }`}
    >
      <div className="relative">
        <FaHeart className={hasLiked ? "text-red-500" : "currentColor"} />

        <AnimatePresence>
            {hasLiked && (
                <motion.div
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -20, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 text-red-500 pointer-events-none"
                >
                    <FaHeart />
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <span className="font-bold text-sm min-w-5">
        {likes.toLocaleString()}
      </span>
    </motion.button>
  );
}