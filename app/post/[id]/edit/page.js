'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchPostById, updatePost } from '../../../../api/post';
import { useRouter } from 'next/navigation';

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  content: Yup.string()
    .min(50, 'Content must be at least 50 characters')
    .max(5000, 'Content must be less than 5000 characters')
    .required('Content is required'),
  category: Yup.string()
    .required('Category is required')
});

const categories = [
  'Development',
  'Design',
  'Frontend',
  'Backend',
  'DevOps',
  'Mobile',
  'AI/ML',
  'Other'
];

export default function EditPostPage({ params }) {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [post, setPost] = useState(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      category: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitStatus(null);
        const response = await updatePost(params.id, {
            title: values.title,
            content: values.content,
            category: values.category,
        });
        
        console.log('Form submitted:', response);
    
        setSubmitStatus({ type: 'success', message: 'Blog post updated successfully!' });
        router.push(`/post/${params.id}`);
        
      } catch (error) {
        setSubmitStatus({ type: 'error', message: 'Failed to update blog post. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetchPostById(params.id);
        if (response.data) {
          setPost(response.data);
          formik.setValues({
            title: response.data.title,
            content: response.data.content,
            category: response.data.category,
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Edit Blog Post
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 space-y-6">
            <form onSubmit={formik.handleSubmit}>
              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}>
                  <span className="font-medium">{submitStatus.message}</span>
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.title && formik.errors.title
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all`}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {formik.errors.title}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
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
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {formik.errors.category}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="12"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.content && formik.errors.content
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all resize-none`}
                />
                {formik.touched.content && formik.errors.content && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {formik.errors.content}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.isValid}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formik.isSubmitting ? 'Updating...' : 'Update Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
