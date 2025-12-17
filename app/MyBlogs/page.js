"use client";

import { useState, useEffect, useCallback } from "react";
import { NavWrapper } from "@/components/NavbarWrapper/NavWrapper";
import { useAuth } from "@/context/userContext";
import { getAuthorPosts } from "@/api/post";
import Cookies from "js-cookie";

export default function MyBlogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { authState } = useAuth();

  const categories = [
    "all",
    "Development",
    "Design",
    "Frontend",
    "Backend",
    "DevOps",
    "Mobile",
    "AI/ML",
    "Other",
  ];





  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAuthorPosts(authState.user?.id);
      const postsData = response?.data ?? response;
      if (!postsData) return setPosts([]);
      setPosts(
        Array.isArray(postsData)
          ? postsData
          : postsData.data ?? postsData.items ?? []
      );
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }, [authState.user?.id])

  useEffect(() => {
    if (authState.user?.id) {
      loadPosts();
    }
  }, [loadPosts, authState.user?.id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-6 flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to My Blogs
          </button>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
                  {selectedPost.category}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {formatDate(selectedPost.createdAt)}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {selectedPost.views} views
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {selectedPost.authorName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Author
                  </p>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedPost.content}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <NavWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full mb-4">
              <svg
                className="w-4 h-4 text-red-600 dark:text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                My Blog Posts
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Your Published Articles
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage and view all your blog posts in one place
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search your posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <svg
                  className="animate-spin h-12 w-12 text-red-500 mx-auto mb-4"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-gray-600 dark:text-gray-400">
                  Loading your posts...
                </p>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || filterCategory !== "all"
                  ? "Try adjusting your filters"
                  : "Start writing your first blog post!"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "post" : "posts"}
                </p>
              </div>

              {filteredPosts.map((post) => (
                <div
                  key={post._id || post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {post.views} views
                          </span>
                        </div>
                      </div>
                      <svg
                        className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </NavWrapper>
  );
}
