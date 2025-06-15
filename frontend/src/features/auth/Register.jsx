import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Create a New Account
        </h2>

        {error && (
          <div className="alert alert-error text-sm mb-4 py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <span className="loading loading-spinner" />
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
