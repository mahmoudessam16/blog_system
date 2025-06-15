# Blog System

This is a full-stack blog system project built using:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + MongoDB

## Project Structure

```
blog_system/
├── backend/
├── frontend/
```

---

## How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/mahmoudessam16/blog_system.git
cd blog_system
```

---

## Backend Setup

### 2. Navigate to the backend folder

```bash
cd backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file in the `backend/` folder with the following variables:

```env
MONGO_URI=your_mongo_connection_string
PORT=port
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

> Replace the above values with your actual credentials.

### 5. Run the backend server

```bash
npm run dev
```

The backend should now be running at: `http://localhost:5000`

---

## Frontend Setup

### 6. Open a new terminal and navigate to the frontend folder

```bash
cd ../frontend
```

### 7. Install dependencies

```bash
npm install
```

### 8. Create a `.env` file in the `frontend/` folder with the following variable:

```env
VITE_REACT_APP_BACKEND_URL=http://localhost:5000
```

### 9. Run the frontend development server

```bash
npm run dev
```

Frontend should be running at: `http://localhost:5173`

---

## ✅ Features

- User registration and login
- Create, fetch, and delete posts
- JWT-based authentication
- Cloudinary image uploads
- Organized modular folder structure
- Show your profile
