"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPosts } from "../../api/post";
import { Loading } from "@/components/Loading.js";
import { useAuth } from "@/context/userContext";
import { NavWrapper } from "@/components/NavbarWrapper/NavWrapper.js";



export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState } = useAuth();

  const handleFetchPosts = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetchPosts();
      console.log("Response Data: ", response);
      if (response.data && response.statusCode === 200) {
        console.log("Fetched Posts: ", response);
        setPosts(response.data);
      } else {
        setError("Failed to load posts. Please try again later");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPosts();
    // Simulate API call
    // setPosts(mockPosts);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <NavWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {error && (
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
              {error}
            </div>
          </div>
        )}
        {/* Header Section */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-900 sm:py-10">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Latest Articles
                </span>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                From the Blog
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Insights, stories, and expertise from our team. Stay updated
                with the latest in tech and design.
              </p>
            </div>
          </div>
          {!authState.isAuthenticated && (
            <div className="items-center justify-center text-center mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 mx-6 sm:mx-32 rounded-lg">
              {" "}
              <p className="text-blue-400">
                Welcome! To access all features, please log in or sign up.
              </p>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="">
            <Loading />
          </div>
        )}
        {/* Blog Grid */}
        <div className="mx-auto max-w-9xl px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 20).map((post) => (
              <article
                key={post._id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Red Ribbon */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600 group-hover:w-1.5 transition-all duration-300"></div>

                {/* Decorative top bar */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
                  
                    {post.category && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                      </div>
                    )}
                  
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <time dateTime={post.createdAt}>
                      {formatDate(post.createdAt)}
                    </time>
                    <span>•</span>
                    <span>{post.authorName}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {post.content}
                  </p>

                  <Link href={`/post/${post._id}`}>
                    <div className="flex items-center text-red-600 dark:text-red-400 font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                      Read more
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
