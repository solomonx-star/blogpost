"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPosts } from "../../api/post";
import { Loading } from "@/components/Loading.js";
import { useAuth } from "@/context/userContext";
import { NavWrapper } from "@/components/NavbarWrapper/NavWrapper.js"

// Mock data for demonstration
// const mockPosts = [
//   {
//     _id: "1",
//     title: "Getting Started with React 19",
//     content:
//       "React 19 introduces exciting new features that make building web applications even more intuitive. From improved hooks to better performance optimizations, this release is packed with improvements.",
//     createdAt: "2025-11-15T10:00:00Z",
//     authorName: "Sarah Johnson",
//     category: "Development",
//   },
//   {
//     _id: "2",
//     title: "The Future of Web Design",
//     content:
//       "Web design is evolving rapidly with new tools and technologies. Discover the latest trends that are shaping how we build beautiful, accessible websites.",
//     createdAt: "2025-11-12T14:30:00Z",
//     authorName: "Michael Chen",
//     category: "Design",
//   },
//   {
//     _id: "3",
//     title: "Mastering TypeScript",
//     content:
//       "TypeScript has become essential for modern web development. Learn how to leverage its powerful type system to write more maintainable code.",
//     createdAt: "2025-11-10T09:15:00Z",
//     authorName: "Emily Rodriguez",
//     category: "Development",
//   },
//   {
//     _id: "4",
//     title: "Building Scalable APIs",
//     content:
//       "Learn best practices for designing and implementing APIs that can handle millions of requests. We cover everything from architecture to deployment.",
//     createdAt: "2025-11-08T16:45:00Z",
//     authorName: "David Kim",
//     category: "Backend",
//   },
//   {
//     _id: "5",
//     title: "UX Principles That Matter",
//     content:
//       "Great user experience is the foundation of successful products. Explore the core principles that make interfaces intuitive and delightful to use.",
//     createdAt: "2025-11-05T11:20:00Z",
//     authorName: "Lisa Anderson",
//     category: "Design",
//   },
//   {
//     _id: "6",
//     title: "Modern CSS Techniques",
//     content:
//       "CSS has come a long way. Discover modern techniques including container queries, cascade layers, and CSS grid that will transform your layouts.",
//     createdAt: "2025-11-02T13:00:00Z",
//     authorName: "James Wilson",
//     category: "Frontend",
//   },
// ];

export default function BlogHome() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const { authState } = useAuth();

  const handleFetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetchPosts();
      console.log("Response Data: ", response);
      if (response.data && response.statusCode === 200) {
        console.log("Fetched Posts: ", response);
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
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
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <NavWrapper>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
              Insights, stories, and expertise from our team. Stay updated with
              the latest in tech and design.
            </p>
          </div>
        </div>
        {!authState.isAuthenticated && (
        <div className="items-center justify-center text-center mt-4 bg-green-400/50 p-2 mx-32 rounded-lg">
         <p className="text-green-200">
            welcome new user, in order to access all features please Login or SignUp
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
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </div>
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
                  <a href="#" className="hover:underline">
                    {post.title}
                  </a>
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
