"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateCount = async () => {
      const hasVisited = sessionStorage.getItem("has_visited");

      if (!hasVisited) {
        await supabase.rpc("increment_visitor_count");
        sessionStorage.setItem("has_visited", "true");
      }

      const { data } = await supabase
        .from("site_stats")
        .select("count")
        .eq("id", 1)
        .single();

      if (data) {
        setCount(data.count);
      }
      setIsLoading(false);
    };

    updateCount();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-900/80 border border-white/10 text-gray-400 text-sm backdrop-blur-md shadow-lg"
    >
      <FaEye className="text-lg text-green-400" />
      
      <span className="flex items-center gap-1.5">
        {isLoading ? (
            <div className="h-4 w-12 bg-white/10 rounded animate-pulse" />
        ) : (
            <strong className="text-white font-bold">{count?.toLocaleString() || "0"}</strong>
        )}
        <span className="text-xs uppercase tracking-wide font-medium opacity-80">Views</span>
      </span>
    </motion.div>
  );
}