import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();

  const [form, setForm] = useState({
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
      await login(form);
    } catch (err) {
      setError(err.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Login to Your Account
        </h2>

        {error && (
          <div className="alert alert-error text-sm mb-4 py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner" /> : "Login"}
          </button>
        </form>

        {/* Create account link */}
        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
