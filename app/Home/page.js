"use client";
import React, { useState } from "react";

// Mockup data
const posts = [
    {
        id: 1,
        title: "Who is Messi",
        content: "Messi is widely regarded as one of the greatest football players of all time, known for his incredible dribbling, vision, and goal-scoring ability.He was Born in Rosario, Argentina, Messi began playing football at a young age and joined the youth team of New",
        date: "2025-09-20",
        author: "Dauda Sullaiman Kanu"
    },
    {
        id: 2,
        title: "React vs Vue: A Comparison",
        content: "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.To make your document look professionally produced, Word provides header, footer, cover page, and text box designs that complement each other. For example, you can add a matching cover page, header, and sidebar. Click Insert and then choose the elements you want from the different galleries.",
        date: "2025-09-18",
        author: "Gifty Hemans"
    },
    {
        id: 3,
        title: "Internet Surfing Tips",
        content: "Surf: Going through the internet. Internet surfing is the act of going from one page to another on the internet, browsing for topics of interest",
        date: "2025-09-15",
        author: "Solomon Kanu"
    },
    {
        id: 4,
        title: "Business IT Solutions",
        content: "A business providing end-to-end office IT support and automation solutions for institutions, ensuring smooth operations and reduced downtimeSet a schedule, create a dedicated workspace, and communicate clearly with your team.",
        date: "2025-09-23",
        author: "Amadu Sow"
    },
    {
        id: 5,
        title: "Cybersecurity Services",
        content: "A cybersecurity firm that provides specialized protection and compliance services for businesses and institutions handling sensitive data.",
        date: "2025-09-23",
        author: "Rose Kawa"
    },
    {
        id: 6,
        title: "Internet",
        content: "Internet: The internet is a massive network of networks.  It connects a lot of different networks together. Allow nodes to communicate through networks. It is a massive network of networks",
        date: "2025-09-23",
        author: "John Sesay"
    },
    
];

function truncateContent(content, maxLength = 80) {
    return content.length > maxLength ? content.slice(0, maxLength) + "..." : content;
}

export default function Home() {
    const [selectedPost, setSelectedPost] = useState(null);

    const openModal = (post) => setSelectedPost(post);
    const closeModal = () => setSelectedPost(null);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Welcome to BlogPost</h1>
                <p className="text-center text-gray-600 mb-12">Explore the latest posts from our amazing community and beyond</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                                <span className="text-xs text-blue-500 font-semibold">by {post.author}</span>
                            </div>
                            <h2 className="text-2xl font-semibold text-purple-800 mb-2">{post.title}</h2>
                            <p className="text-gray-700 mb-4">{truncateContent(post.content, 80)}</p>
                            <button 
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors" 
                                onClick={() => openModal(post)}
                            >Read More</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 bg-opacity-80">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
                        <button 
                            className="absolute top-3 right-3 text-gray-400 hover:text-purple-700 text-2xl font-bold" 
                            onClick={closeModal}
                            aria-label="Close"
                        >&times;</button>
                        <div className="mb-2 flex justify-between items-center">
                            <span className="text-sm text-gray-400">{new Date(selectedPost.date).toLocaleDateString()}</span>
                            <span className="text-xs text-blue-500 font-semibold">by {selectedPost.author}</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-purple-800 mb-4">{selectedPost.title}</h2>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">{selectedPost.content}</p>
                    </div>
                </div>
            )}
        </main>
    );
}