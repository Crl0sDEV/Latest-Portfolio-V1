"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import Reveal from "./Reveal";
import { getMorePosts } from "../app/actions/getBlogPosts"; // Import yung action

export default function BlogList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [offset, setOffset] = useState(initialPosts.length); // Start after initial
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Check if may laman pa
  const POSTS_PER_PAGE = 6;

  const loadMore = async () => {
    setLoading(true);
    
    // Tawagin ang Server Action
    const newPosts = await getMorePosts(offset, POSTS_PER_PAGE);

    if (newPosts.length < POSTS_PER_PAGE) {
      setHasMore(false); // Wala nang next page
    }

    setPosts((prev) => [...prev, ...newPosts]); // Dugtong sa dulo
    setOffset((prev) => prev + POSTS_PER_PAGE);
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12 items-start">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {hasMore && (
        <Reveal>
            <div className="flex justify-center pb-20">
            <button
                onClick={loadMore}
                disabled={loading}
                className="group relative px-8 py-3 rounded-full bg-zinc-900 border border-white/10 hover:border-green-500/50 hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className={`text-sm font-bold text-gray-300 group-hover:text-green-400 flex items-center gap-2 ${loading ? "animate-pulse" : ""}`}>
                {loading ? "Loading Posts..." : "Load More Articles"}
                </span>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            </div>
        </Reveal>
      )}

      {!hasMore && posts.length > 0 && (
         <div className="text-center pb-20 text-gray-600 text-sm">
            You've reached the end of the archives.
         </div>
      )}
    </>
  );
}