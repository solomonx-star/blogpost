'use client';

import { useState, useEffect } from 'react';
import { fetchPosts } from '../../api/post';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function UserPosts() {
  const { authState } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (authState.isAuthenticated) {
        try {
          const response = await fetchPosts();
          if (response.data) {
            const userPosts = response.data.filter(
              (post) => post.author === authState.user._id
            );
            setPosts(userPosts);
          }
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      }
    };

    loadUserPosts();
  }, [authState]);

  if (posts.length === 0) {
    return <p>You have not created any posts yet.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Your Posts
      </h2>
      <div className="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post._id}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                <Link href={`/post/${post._id}`}>
                  <a className="hover:underline">{post.title}</a>
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                {post.content}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
