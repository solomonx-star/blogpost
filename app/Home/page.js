"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPosts } from "../../api/post";
import { Loading } from "@/components/Loading.js";
import { useAuth } from "@/context/userContext";
import { NavWrapper } from "@/components/NavbarWrapper/NavWrapper.js";
import Image from "next/image";
import Snowfall from "react-snowfall"

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
      // console.log("Response Data: ", response);
      if (response.data && response.statusCode === 200) {
        // console.log("Fetched Posts: ", response);
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
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <Snowfall color="#f0f9ff" />
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Work+Sans:wght@300;400;500;600&display=swap');
          
          .blog-container {
            font-family: 'Work Sans', sans-serif;
          }
          
          .blog-title {
            font-family: 'Playfair Display', serif;
          }
          
          .stagger-fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .hover-lift {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-4px);
          }
          
          .category-pill {
            backdrop-filter: blur(10px);
            background: rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.3);
          }
          
          .dark .category-pill {
            background: rgba(220, 38, 38, 0.2);
            border: 1px solid rgba(220, 38, 38, 0.4);
          }
        `}</style>

        {error && (
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="border-l-4 border-red-600 bg-red-50 dark:bg-red-950/30 p-4">
              <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Masthead */}
        <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-red-600"></div>
                <span className="text-xs uppercase tracking-[0.3em] text-red-600 font-semibold">
                  Editorial
                </span>
              </div>
              
              <h1 className="blog-title text-6xl lg:text-8xl font-black text-neutral-950 dark:text-neutral-50 mb-6 leading-[0.95] tracking-tight">
                The TechBlog
              </h1>
              
              <p className="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 font-light max-w-2xl leading-relaxed">
                Thoughts, insights, and stories from our team on technology, design, and everything in between.
              </p>
            </div>
          </div>

          {!authState.isAuthenticated && (
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-8">
              <div className="border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-950/30 p-6">
                <p className="text-blue-900 dark:text-blue-100">
                  Welcome! To access all features, please log in or sign up.
                </p>
              </div>
            </div>
          )}
        </header>

        {/* Search Bar */}
        <div className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-6 py-4 bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:border-red-600 dark:focus:border-red-500 focus:outline-none transition-colors text-lg"
              />
              <svg 
                className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="py-24">
            <Loading />
          </div>
        )}

        {/* Articles Grid - Magazine Style */}
        <div className="blog-container py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {filteredPosts.length > 0 && (
              <>
                {/* Featured Article - Large Hero */}
                <Link href={`/post/${filteredPosts[0]._id}`}>
                  <article 
                    className="hover-lift mb-24 lg:mb-32 cursor-pointer group"
                    style={{ animationDelay: '0.1s' }}
                  >
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      <div className="lg:col-span-7 order-2 lg:order-1">
                        <div className="flex items-center gap-4 mb-6">
                          {filteredPosts[0].category && (
                            <span className="category-pill px-4 py-2 text-xs uppercase tracking-wider text-red-700 dark:text-red-400 font-semibold">
                              {filteredPosts[0].category}
                            </span>
                          )}
                          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                            {formatDate(filteredPosts[0].createdAt)}
                          </span>
                        </div>
                        
                        <h2 className="blog-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-neutral-950 dark:text-neutral-50 mb-4 lg:mb-6 leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                          {filteredPosts[0].title}
                        </h2>
                        
                        <p className="text-base sm:text-lg lg:text-2xl text-neutral-600 dark:text-neutral-400 mb-6 lg:mb-8 leading-relaxed line-clamp-3">
                          {filteredPosts[0].content}
                        </p>
                        
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-500 font-semibold text-base lg:text-lg group">
                          <span>Continue Reading</span>
                          <svg 
                            className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-5 order-1 lg:order-2">
                        <div className="aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/5] relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                          <Image
                            src={filteredPosts[0]?.blogPhoto}
                            alt={filteredPosts[0].title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                            priority
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>

                {/* Divider */}
                <div className="h-px bg-neutral-200 dark:bg-neutral-800 mb-16 lg:mb-24"></div>

                {/* Regular Articles Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-20">
                  {filteredPosts.slice(1, 20).map((post, index) => (
                    <Link key={post._id} href={`/post/${post._id}`}>
                      <article 
                        className="stagger-fade-in hover-lift cursor-pointer group"
                        style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                      >
                        {/* Image */}
                        <div className="aspect-[4/3] sm:aspect-[3/4] relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4 lg:mb-6">
                          <Image
                            src={post?.blogPhoto}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          
                          {post.category && (
                            <div className="absolute top-3 left-3 lg:top-4 lg:left-4 category-pill px-2.5 py-1 lg:px-3 lg:py-1.5 text-xs uppercase tracking-wider text-red-700 dark:text-red-400 font-semibold">
                              {post.category}
                            </div>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-neutral-500 dark:text-neutral-400 mb-3 lg:mb-4">
                          <time dateTime={post.createdAt}>
                            {formatDate(post.createdAt)}
                          </time>
                          <span>·</span>
                          <span>{post.user}</span>
                        </div>

                        {/* Title */}
                        <h3 className="blog-title text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-950 dark:text-neutral-50 mb-3 lg:mb-4 leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-3 lg:mb-4">
                          {post.content}
                        </p>

                        {/* Read More */}
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-500 font-semibold text-xs lg:text-sm">
                          <span>Read Article</span>
                          <svg 
                            className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {filteredPosts.length === 0 && !isLoading && (
              <div className="text-center py-24">
                <p className="text-xl lg:text-2xl text-neutral-400 dark:text-neutral-600 font-light">
                  No articles found matching your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}