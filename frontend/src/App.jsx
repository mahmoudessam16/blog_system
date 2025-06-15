import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Navbar from "./components/Navbar";
import AddPostButton from "./components/AddPostButton";
import CreatePost from "./components/CreatePost";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Navbar />
      <AddPostButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <CreatePost isEditMode={true} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
