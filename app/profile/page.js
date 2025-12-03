'use client';

import { useAuth } from '../../context/AuthContext';
import ProfilePictureForm from '../../components/forms/ProfilePictureForm';
import UserPosts from '../../components/UserPosts';

export default function ProfilePage() {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center">
              <img
                src={authState.user.profilePicture || '/default-profile.png'}
                alt="Profile Picture"
                className="w-32 h-32 rounded-full mx-auto"
              />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4">
                {authState.user.username}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {authState.user.email}
              </p>
            </div>
            <ProfilePictureForm />
            <UserPosts />
          </div>
        </div>
      </div>
    </div>
  );
}
