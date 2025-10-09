"use client";
import { useState } from "react";

export default function PostManager() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", author: "", content: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setNewPost({ title: "", author: "", content: "" });
    setEditingIndex(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewPost({ title: "", author: "", content: "" });
    setEditingIndex(null);
  };

  const savePost = () => {
    if (!newPost.title.trim() || !newPost.author.trim() || !newPost.content.trim()) return;
    const postWithDate = { ...newPost, date: new Date().toLocaleDateString() };
    if (editingIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editingIndex] = postWithDate;
      setPosts(updatedPosts);
    } else {
      setPosts([...posts, postWithDate]);
    }
    closeModal();
  };

  const editPost = (index) => {
    setNewPost(posts[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const deletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-400 to-purple-300 py-10 px-4">
      <div className="container mx-auto my-8 flex flex-col items-center max-w-4xl">
        {/* Add Post Button - Hidden when modal is open */}
        {!showModal && (
          <button
            className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            onClick={openModal}
          >
            Add New Post
          </button>
        )}

        {/* Modal Form */}
        {showModal && (
          <div className="fixed inset-0 bg-gradient-to-br from-blue-950 via-blue-400 to-purple-300 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gradient-to-br from-blue-950 via-blue-400 to-purple-300 rounded-xl shadow-2xl p-6 w-full max-w-lg">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                {editingIndex !== null ? "Edit Post" : "Create New Post"}
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Enter post title"
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPost.author}
                    onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                    placeholder="Enter author name"
                  />
                </div>
                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="10"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Write your post here..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={savePost}
                >
                  Post
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="w-full space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-100">No posts yet. Create one to get started!</p>
          ) : (
            posts.map((post, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">By {post.author}</p>
                  <p className="text-sm text-gray-600">{post.date}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      onClick={() => editPost(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                      onClick={() => deletePost(i)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}