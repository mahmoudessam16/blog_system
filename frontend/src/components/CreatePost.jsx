import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode) return;

    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/posts/${id}`
        );
        setForm({
          title: data.title,
          content: data.content,
        });
        setExistingImage(data.imageUrl);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (isEditMode) {
      formData.append("existingImage", existingImage);
    }

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/posts/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:5000/posts", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigate("/");
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  };

  return (
    <>
      {!user ? (
        <p className="text-center mt-10 text-error font-semibold text-lg">
          You must be logged in to create a post.
        </p>
      ) : (
        <PostForm
          isEditMode={isEditMode}
          form={form}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          imageFile={imageFile}
          existingImage={existingImage}
        />
      )}
    </>
  );
};

const PostForm = ({
  isEditMode,
  form,
  handleChange,
  handleImageChange,
  handleSubmit,
  imageFile,
  existingImage,
}) => (
  <div className="bg-base-200 py-8 px-4 flex justify-center">
    <form
      onSubmit={handleSubmit}
      className="bg-base-100 shadow-md rounded-lg p-6 w-full max-w-2xl"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isEditMode ? "Edit Post" : "Create New Post"}
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Post title..."
          className="input input-bordered w-full"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          name="content"
          placeholder="Write your post content here..."
          className="textarea textarea-bordered w-full h-60"
          rows={5}
          value={form.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleImageChange}
        />
      </div>

      {isEditMode && !imageFile && existingImage && (
        <div className="mb-4">
          <p className="mb-1 font-medium">Current Image:</p>
          <img
            src={existingImage}
            alt="Current"
            className="w-40 h-40 object-cover rounded border"
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary w-full">
        {isEditMode ? "Update Post" : "Create Post"}
      </button>
    </form>
  </div>
);

export default CreatePost;
