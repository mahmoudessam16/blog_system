import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/posts`
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 flex flex-col items-center gap-6">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-base-100 shadow-md rounded-lg w-full max-w-2xl"
        >
          {/* Header with user */}
          <div className="flex items-center gap-3 p-4 border-b border-base-300">
            <div className="bg-primary text-white rounded-full p-2">
              <FaUserCircle size={24} />
            </div>
            <div>
              <p className="font-semibold">
                {post.owner?.username || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Post Image */}
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-60 object-cover"
            />
          )}

          {/* Post Content */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>

            {user && user._id === post.owner?._id && (
              <div className="flex justify-end gap-2">
                <Link
                  to={`/edit/${post._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
