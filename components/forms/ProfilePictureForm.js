'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { uploadProfilePicture } from '../../api/auth';

export default function ProfilePictureForm() {
  const { authState } = useAuth();
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('Please select an image to upload.');
      return;
    }

    try {
      const response = await uploadProfilePicture(authState.user._id, image);
      setMessage(response.message);
    } catch (error) {
      setMessage('Error uploading profile picture.');
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Upload Profile Picture
      </h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
        />
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
