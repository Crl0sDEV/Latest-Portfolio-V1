"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";
import Reveal from "./Reveal";
import { getMorePosts } from "../app/actions/getBlogPosts";

export default function BlogList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [offset, setOffset] = useState(initialPosts.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const POSTS_PER_PAGE = 3;

  const loadMore = async () => {
    setLoading(true);

    const newPosts = await getMorePosts(offset, POSTS_PER_PAGE);

    if (newPosts.length < POSTS_PER_PAGE) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...newPosts]);
    setOffset((prev) => prev + POSTS_PER_PAGE);
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col gap-10 pb-16 items-center w-full max-w-4xl mx-auto">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {hasMore && (
        <Reveal>
          <div className="flex justify-center pb-20">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group relative px-8 py-3 rounded-full bg-[var(--muted)]/50 border border-[var(--border)] hover:border-[var(--muted-foreground)]/50 hover:bg-[var(--muted)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <span
                className={`text-sm font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] flex items-center gap-2 ${
                  loading ? "animate-pulse" : ""
                }`}
              >
                {loading ? "Loading Posts..." : "Load More Articles"}
              </span>

              <div className="absolute inset-0 rounded-full bg-[var(--muted)]/50 blur-xl opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>
        </Reveal>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center pb-20 text-[var(--muted-foreground)] text-sm font-light">
          You've reached the end of the archives.
        </div>
      )}
    </>
  );
}
