import { fetchPosts } from "@/api/post";




export default async function  Page(){
const response = await fetchPosts();
const posts = response?.data ?? response;

  return (
    <div>
        {posts.map((post) => (
            <p>{post.title}</p>
        ))}
    </div>
  )
}