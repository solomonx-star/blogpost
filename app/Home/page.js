'use client';


import {useState, useEffect} from "react";
import {fetchPosts} from "@/api/post";


export default function BlogHome() {

    const [posts, setPosts] = useState([]);

const getAllPosts = async () => {
  try {
    const posts = await fetchPosts(); // posts is already an array
    console.log("This is the response from the API", posts);

    if (Array.isArray(posts)) {
      setPosts(posts); // ✅ safe to use
    } else {
      throw new Error('Failed to fetch posts');
    }
  } catch (error) {
    console.error('Error in getAllPosts:', error);
  }
};

    // Fetch posts when the component mounts    
    useEffect(() => {
        getAllPosts();
        console.log("This the post object",posts)
    },[])

    return (
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">From the blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Keep up to date with the latest news and articles from our team.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.slice(0, 9).map((post) => (
                        <article key={post._id} className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-800 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
                            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                                <time dateTime={post.createdAt} className="mr-8">
                                    {/* Replace with a proper date once available in the API */}
                                </time>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                                <a>
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </a>
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">{post.content}</p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}