import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(res.data.user);
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="text-center text-error mt-10">
        You must be logged in to view your profile.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-md mb-8 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-primary text-white rounded-full p-4">
            <FaUserCircle size={64} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-1">{profile?.username}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Email:</span> {profile?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Joined:</span>{" "}
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* User Posts */}
        <h3 className="text-xl font-semibold mb-4">📝 Your Posts</h3>

        <div className="flex flex-col items-center gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
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
                    <p className="font-semibold">{profile.username}</p>
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
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
