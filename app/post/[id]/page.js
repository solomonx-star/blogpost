"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchPostById, updateViews, deletePost } from "../../../api/post";
import { addLike, addComment } from "../../../api/likes";
import { useAuth } from "../../../context/AuthContext";

export default function PostPage({ params }) {
  const { authState } = useAuth();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [views, setViews] = useState(0);
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
    try {
      await deletePost(post._id);
      router.push("/Home");
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      handleFetchPost();
    }
  }, [params.id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                {post.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                {post.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Published on {formatDate(post.createdAt)} by {post.authorName}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {views} views
              </p>
            </div>
            <div className="prose text-white max-w-none">
              <p>{post.content}</p>
            </div>
            {isAuthor && (
              <div className="mt-8 text-right">
                <Link href={`/post/${post._id}/edit`}>
                    Edit Post
                </Link>
                <button
                  onClick={handleDelete}
                  className="ml-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Likes and Comments Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Likes and Comments
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">{likes}</span>
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <p className="text-gray-800 dark:text-gray-200">
                    {comment.text}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment Form */}
          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all resize-none"
              rows="3"
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
