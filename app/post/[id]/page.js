"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchPostById, updateViews, deletePost } from "../../../api/post";
import { addLike, addComment } from "../../../api/likes";
import { useAuth } from "../../../context/userContext";
import { Loading } from "@/components/Loading";
import Image from "next/image";

export default function PostPage({ params }) {
  const { authState } = useAuth();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const handleFetchPost = async () => {
    try {
      const response = await fetchPostById(params.id);

      // response may be { data: post } or post directly depending on API helper
      const postData = response?.data ?? response;

      if (!postData) {
        // Post not found; set fallback state
        setPost(null);
        setLikes(0);
        setComments([]);
        setViews(0);
        return;
      }

      // Set state from the returned post
      setPost(postData);
      setLikes(postData.likes || 0);
      setComments(postData.comments || []);
      setViews(postData.views || 0);

      // Only update views if we have a valid id
      if (postData._id) {
        await updateViews(postData._id);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleLike = async () => {
    try {
      await addLike(post._id);
      setLikes(likes + 1);
      setIsLiked(true);
      setTimeout(() => setIsLiked(false), 1000);
    } catch (error) {
      console.error("Failed to add like:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const comment = await addComment(post._id, newComment);
      setComments([...comments, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
        router.push("/Home");
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      handleFetchPost();
    }
  }, [params.id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <Loading />
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isAuthor = authState.isAuthenticated && authState.user?._id === post.author;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Work+Sans:wght@300;400;500;600&display=swap');
        
        .article-container {
          font-family: 'Work Sans', sans-serif;
        }
        
        .article-title {
          font-family: 'Playfair Display', serif;
        }
        
        .article-content {
          font-family: 'Lora', serif;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #404040;
        }
        
        .dark .article-content {
          color: #d4d4d4;
        }
        
        .article-content p {
          margin-bottom: 1.5rem;
        }
        
        .like-animation {
          animation: likeScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes likeScale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        
        .comment-fade-in {
          animation: fadeInUp 0.3s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Back Navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-6">
          <Link 
            href="/Home" 
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors group"
          >
            <svg 
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="article-container">
        <header className="max-w-4xl mx-auto px-6 lg:px-12 pt-16 pb-12">
          {/* Category & Metadata */}
          <div className="flex items-center gap-4 mb-8">
            {post.category && (
              <span className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-red-700 dark:text-red-400 font-semibold border-2 border-red-600 dark:border-red-500">
                {post.category}
              </span>
            )}
            <span className="text-neutral-500 dark:text-neutral-400">
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="article-title text-5xl lg:text-7xl font-black text-neutral-950 dark:text-neutral-50 mb-8 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          {/* Author & Stats */}
          <div className="flex items-center justify-between py-8 border-t border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {post.authorName?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {post.authorName || 'Anonymous'}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Author
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-medium">{views}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                </svg>
                <span className="font-medium">{comments.length}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.blogPhoto && (
          <div className="max-w-5xl mx-auto px-6 lg:px-12 mb-16">
            <div className="aspect-[16/10] relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={post.blogPhoto}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-12 mb-20">
          <div className="article-content">
            <p>{post.content}</p>
          </div>

          {/* Author Actions */}
          {isAuthor && (
            <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
              <Link 
                href={`/post/${post._id}/edit`}
                className="px-6 py-3 border-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 font-semibold hover:bg-neutral-900 hover:text-white dark:hover:bg-neutral-100 dark:hover:text-neutral-900 transition-colors"
              >
                Edit Article
              </Link>
              <button
                onClick={handleDelete}
                className="px-6 py-3 border-2 border-red-600 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-colors"
              >
                Delete Article
              </button>
            </div>
          )}
        </div>

        {/* Engagement Section */}
        <div className="border-t-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
            {/* Like Button */}
            <div className="flex items-center justify-center mb-16">
              <button
                onClick={handleLike}
                className="group flex flex-col items-center gap-3"
              >
                <div className={`w-20 h-20 rounded-full border-3 border-red-600 dark:border-red-500 flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-500 transition-all ${isLiked ? 'like-animation bg-red-600 dark:bg-red-500' : ''}`}>
                  <svg
                    className={`w-10 h-10 transition-colors ${isLiked ? 'text-white' : 'text-red-600 dark:text-red-500 group-hover:text-white'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {likes}
                </span>
                <span className="text-sm uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
                  Likes
                </span>
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="article-title text-4xl font-bold text-neutral-950 dark:text-neutral-50 mb-8">
                Discussion ({comments.length})
              </h2>

              {/* Add Comment Form */}
              <div className="mb-12">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full px-6 py-4 border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:border-red-600 dark:focus:border-red-500 focus:outline-none transition-colors resize-none text-lg"
                  rows="4"
                ></textarea>
                <button
                  onClick={handleAddComment}
                  className="mt-4 px-8 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-8">
                {comments.length === 0 ? (
                  <p className="text-center text-neutral-500 dark:text-neutral-400 py-12 text-lg">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  comments.map((comment, index) => (
                    <div 
                      key={index} 
                      className="comment-fade-in border-l-4 border-neutral-200 dark:border-neutral-700 pl-6 py-2"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-neutral-700 flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {comment.userName || 'Anonymous'}
                            </span>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              })}
                            </span>
                          </div>
                          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}