"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavWrapper } from "@/components/NavbarWrapper/NavWrapper";
import { useAuth } from "@/context/userContext";
import { post } from "@/api/post";
import Image from "next/image";

// Validation Schema - Image is now REQUIRED
const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  content: Yup.string()
    .min(50, "Content must be at least 50 characters")
    .max(5000, "Content must be less than 5000 characters")
    .required("Content is required"),
  category: Yup.string().required("Category is required"),
  blogPhoto: Yup.mixed()
    .required("Featured image is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false;
      return value.type.startsWith("image/");
    }),
});

const categories = [
  "Development",
  "Design",
  "Frontend",
  "Backend",
  "DevOps",
  "Mobile",
  "AI/ML",
  "Other",
];

export default function BlogPost() {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { authState, user } = useAuth();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
      blogPhoto: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitStatus(null);

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("category", values.category);
        formData.append("blogPhoto", values.blogPhoto);

        const response = await post(formData);

        if (response.statusCode === 201 || response.status === "Success") {
          setSubmitStatus({
            type: "success",
            message: "Blog post created successfully!",
          });
          setPreviewUrl(null);
          resetForm();
          
          // Reset file input
          const fileInput = document.getElementById("blogPhoto");
          if (fileInput) fileInput.value = "";
        }
      } catch (error) {
        console.error("Error:", error);
        setSubmitStatus({
          type: "error",
          message:
            error.message || "Failed to create blog post. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Set the file in formik
      formik.setFieldValue("blogPhoto", file);
      formik.setFieldTouched("blogPhoto", true);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removePhoto = () => {
    formik.setFieldValue("blogPhoto", null);
    setPreviewUrl(null);

    // Reset file input
    const fileInput = document.getElementById("blogPhoto");
    if (fileInput) fileInput.value = "";
  };

  return (
    <NavWrapper>
      <div className="min-h-screen h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Create New Post
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Write a Blog Post
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Share your knowledge and insights with the community
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600"></div>

              <div className="p-8 space-y-6">
                <form onSubmit={formik.handleSubmit}>
                  {/* Status Message */}
                  {submitStatus && (
                    <div
                      className={`p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                          : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {submitStatus.type === "success" ? (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className="font-medium">
                          {submitStatus.message}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Photo Upload Field - NOW REQUIRED */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Featured Image <span className="text-red-500">*</span>
                    </label>

                    {!previewUrl ? (
                      <div className="relative">
                        <input
                          id="blogPhoto"
                          name="blogPhoto"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          onBlur={() => formik.setFieldTouched("blogPhoto", true)}
                          className="hidden"
                        />
                        <label
                          htmlFor="blogPhoto"
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                            formik.touched.blogPhoto && formik.errors.blogPhoto
                              ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                              : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className={`w-10 h-10 mb-3 ${
                                formik.touched.blogPhoto && formik.errors.blogPhoto
                                  ? "text-red-400"
                                  : "text-gray-400"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG, GIF up to 5MB (Required)
                            </p>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="relative">
                        <Image
                          src={previewUrl}
                          height={256}
                          width={400}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}

                    {formik.touched.blogPhoto && formik.errors.blogPhoto && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formik.errors.blogPhoto}
                      </p>
                    )}
                  </div>

                  {/* Title Field */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mt-4 mb-2"
                    >
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      placeholder="Enter an engaging title for your post"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formik.touched.title && formik.errors.title
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-red-500"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all`}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formik.errors.title}
                      </p>
                    )}
                  </div>

                  {/* Category Field */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mt-4 mb-2"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.category}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formik.touched.category && formik.errors.category
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-red-500"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {formik.errors.category}
                      </p>
                    )}
                  </div>

                  {/* Content Field */}
                  <div>
                    <label
                      htmlFor="content"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mt-4 mb-2"
                    >
                      Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows="12"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.content}
                      placeholder="Write your blog post content here..."
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formik.touched.content && formik.errors.content
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-red-500"
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all resize-none`}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        {formik.touched.content && formik.errors.content && (
                          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {formik.errors.content}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formik.values.content.length} / 5000 characters
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={formik.isSubmitting || !formik.isValid}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {formik.isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
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
                          Publishing...
                        </span>
                      ) : (
                        "Publish Post"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        formik.resetForm();
                        setPreviewUrl(null);
                        const fileInput = document.getElementById("blogPhoto");
                        if (fileInput) fileInput.value = "";
                      }}
                      className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex gap-3">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Writing Tips
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>
                    • Featured image is required to make your post stand out
                  </li>
                  <li>
                    • Keep your title clear and engaging (5-100 characters)
                  </li>
                  <li>• Write comprehensive content (minimum 50 characters)</li>
                  <li>• Choose the most relevant category for your post</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}