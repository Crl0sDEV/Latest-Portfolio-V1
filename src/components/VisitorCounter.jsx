"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"
import { FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const updateCount = async () => {
      const hasVisited = sessionStorage.getItem("has_visited");

      if (!hasVisited) {
          await supabase.rpc("increment_visitor_count");
          sessionStorage.setItem("has_visited", "true");
      }

      const { data, error } = await supabase
        .from("site_stats")
        .select("count")
        .eq("id", 1)
        .single();

      if (data) {
        setCount(data.count);
      }
    };

    updateCount();
  }, []);

  if (count === null) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm backdrop-blur-md"
    >
      <FaEye className="text-green-400" />
      <span>
        <strong className="text-white">{count.toLocaleString()}</strong> Visitors
      </span>
    </motion.div>
  );
}