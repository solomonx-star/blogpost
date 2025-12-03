export const Loading = ({ title }) => {
  const loadingMessage = title || "Please wait while we load your content.";

  return (
    // <div
    //   className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center"
    //   role="status"
    // >
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
    // </div>
  );
};
