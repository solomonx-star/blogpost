"use client";
<<<<<<< HEAD
import React, { useState } from "react";

// Mockup data
const posts = [
    {
        id: 1,
        title: "Who is Messi",
        content: "Messi is widely regarded as one of the greatest football players of all time, known for his incredible dribbling, vision, and goal-scoring ability.He was Born in Rosario, Argentina, Messi began playing football at a young age and joined the youth team of New",
        date: "2025-09-20",
        author: "Dauda Sullaiman Kanu",
        media: {
            type: "image",
            url: "/gifty1.jpg"
        }
    },
    {
        id: 2,
        title: "React vs Vue: A Comparison",
        content: "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar. Click Insert and then choose the elements you want from the different galleries.",
        date: "2025-09-18",
        author: "Gifty Hemans",
        media: {
            type: "image",
            url: "/gifty2.jpg"
        }
    },
    {
        id: 3,
        title: "Internet Surfing Tips",
        content: "Surf: Going through the internet. Internet surfing is the act of going from one page to another on the internet, browsing for topics of interest",
        date: "2025-09-15",
        author: "Solomon Kanu"
    },
    {
        id: 4,
        title: "Business IT Solutions",
        content: "A business providing end-to-end office IT support and automation solutions for institutions, ensuring smooth operations and reduced downtimeSet a schedule, create a dedicated workspace, and communicate clearly with your team.",
        date: "2025-09-23",
        author: "Amadu Sow",
        media: {
            type: "image",
            url: "/gifty3.jpg"
        }
    },
    {
        id: 5,
        title: "Cybersecurity Services",
        content: "A cybersecurity firm that provides specialized protection and compliance services for businesses and institutions handling sensitive data.",
        date: "2025-09-23",
        author: "Rose Kawa"
    },
    {
        id: 6,
        title: "Internet",
        content: "Internet: The internet is a massive network of networks.  It connects a lot of different networks together. Allow nodes to communicate through networks. It is a massive network of networks",
        date: "2025-09-23",
        author: "John Sesay",
        media: {
            type: "image",
            url: "/logo.png"
        }
    },
];

function truncateContent(content, maxLength = 80) {
    return content.length > maxLength ? content.slice(0, maxLength) + "....." : content;
}

export default function Home() {
    const [selectedPost, setSelectedPost] = useState(null);

    const openModal = (post) => setSelectedPost(post);
    const closeModal = () => setSelectedPost(null);

    return (
        <main className="min-h-screen bg-linear-to-br from-blue-950 via-blue-400 to-purple-300 py-10 px-4">
            <div className="max-w-8xl md:mx-8 pt-10 ">
                <h1 className="text-4xl font-bold text-center text-gray-200 mb-8">Welcome to BlogPost</h1>
                <p className="text-center text-gray-300 mb-12">Explore the latest posts from our amazing community and beyond</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col">
                            {post.media && post.media.type === "image" && (
                                <img src={post.media.url} alt="Post media" className="w-32 h-32 object-cover mb-4 rounded-full self-center border-4 border-purple-200 shadow" />
                            )}
                            {post.media && post.media.type === "video" && (
                                <video controls className="w-full h-40 object-contain mb-4 rounded">
                                    <source src={post.media.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            {/* If no media, just render the rest as before (no image placeholder) */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                                <span className="text-xs text-blue-500 font-semibold">by {post.author}</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-purple-800 mb-2">{post.title}</h2>
                            <p className="text-gray-700 mb-4">{truncateContent(post.content, 80)}</p>
                            <button 
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors" 
                                onClick={() => openModal(post)}
                            >Read More</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-blue-950 via-blue-400 to-purple-300 bg-opacity-90">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-[50%]  relative">
                        <button 
                            className="absolute top-3 right-3 text-gray-400 hover:text-purple-700 text-2xl font-bold" 
                            onClick={closeModal}
                            aria-label="Close"
                        >&times;</button>
                        {selectedPost.media && selectedPost.media.type === "image" && (
                            <img src={selectedPost.media.url} alt="Post media" className="w-48 h-48 object-cover mb-4 rounded-full mx-auto border-4 border-purple-200 shadow" />
                        )}
                        {selectedPost.media && selectedPost.media.type === "video" && (
                            <video controls className="w-full h-64 object-contain mb-4 rounded">
                                <source src={selectedPost.media.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <div className="mb-2 flex justify-between items-center">
                            <span className="text-sm text-gray-400">{new Date(selectedPost.date).toLocaleDateString()}</span>
                            <span className="text-xs text-blue-500 font-semibold">by {selectedPost.author}</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-purple-800 mb-4">{selectedPost.title}</h2>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">{selectedPost.content}</p>
                    </div>
                </div>
            )}
        </main>
    );
}
=======

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
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Search Bar */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <input
            type="text"
            placeholder="Search for posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
          />
        </div>

        {isLoading && (
          <div className="">
            <Loading />
          </div>
        )}

        {/* Blog Grid */}
        <div className="mx-auto max-w-9xl px-6 lg:px-8 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.slice(0, 20).map((post) => (
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
                    <span>{post.user}</span>
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
>>>>>>> test
