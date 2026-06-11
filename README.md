# GemFinder Pro 💎

GemFinder Pro is a premium, full-stack gemstone recommendation application. It matches users with their ideal gemstone based on their zodiac sign, birth month, life goal, and budget range using a custom weighted scoring recommendation engine. The application features user authentication, search/history logs, a responsive user interface built with Tailwind CSS, and a comprehensive admin dashboard to manage gemstones, view users, and check application status.

---

## 🌟 Features

- **Personalized Recommendations**: Evaluates astrological, life goal, and financial parameters to find the single best matching gemstone.
- **User Authentication**: Secure register and login functionality using JSON Web Tokens (JWT) and bcrypt password hashing.
- **Recommendation History**: Logged-in users can save and view a historical log of their recommended gemstones.
- **Admin Dashboard**:
  - View, create, update, and delete gemstones.
  - View all registered users and delete user accounts.
  - Review statistics such as user counts and total recommendations.
- **Pre-seeded Database**: Automatically seeds 12 default gemstones and administrative/test accounts upon connection to MongoDB.
- **Modern UI/UX**: Premium aesthetic featuring dark mode/glassmorphism details, smooth animations, and a responsive layout using Tailwind CSS.

---

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express**: For server execution and RESTful routing.
- **MongoDB** & **Mongoose**: For object document mapping and schema definitions.
- **JWT (JSON Web Tokens)**: Secure token-based user authentication.
- **bcryptjs**: Password encryption.
- **Nodemon**: Auto-restarting development server.

### Frontend
- **React (Vite)**: High-performance single page application (SPA).
- **Tailwind CSS**: Utility-first CSS framework for modern, responsive designs.
- **React Router Dom**: Client-side routing.
- **Lucide React**: Clean and consistent icons.
- **Axios**: Promised-based HTTP client for API communication.

---

## 📁 Project Structure

```text
assignment/
├── backend/
│   ├── config/             # Database connection setup (db.js)
│   ├── controllers/        # Business logic for auth, gemstones, and recommendations
│   ├── middleware/         # Authentication and authorization guards (authMiddleware.js)
│   ├── models/             # Mongoose schemas (User, Gemstone, Recommendation)
│   ├── routes/             # Express API routing (authRoutes, gemstoneRoutes, recommendationRoutes)
│   ├── utils/              # Helper utilities (engine.js - weighted scorer, seeder.js - DB seeding)
│   ├── .env                # Server configuration / secrets
│   ├── package.json        # Backend dependencies & scripts
│   └── server.js           # Server startup and main entry point
│
├── frontend/
│   ├── src/
│   │   ├── assets/         # Global styles and media assets
│   │   ├── components/     # Reusable layout and routing components (Navbar, Footer, ProtectedRoute)
│   │   ├── context/        # React context wrappers for global state (e.g. AuthContext)
│   │   ├── pages/          # View/Route containers (Login, Register, Dashboard, Recommendation Form)
│   │   ├── services/       # Axios client and api interceptors
│   │   ├── App.jsx         # App routes mapping
│   │   ├── main.jsx        # App entry and react DOM hydration
│   │   └── index.css       # Tailwind config directives and custom styling
│   ├── tailwind.config.js  # Tailwind custom palette configuration
│   ├── vite.config.js      # Vite dev settings & proxy mappings
│   └── package.json        # Frontend dependencies & scripts
```

---

## ⚙️ Recommendation Engine Logic

The custom recommendation algorithm in [backend/utils/engine.js](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/backend/utils/engine.js) scores gemstone candidates out of `100` based on the following weighted matching system:

1. **Zodiac Sign Match (40 Points)**: If the user's zodiac sign is included in the gemstone's compatible signs list.
2. **Birth Month Match (30 Points)**: If the user's birth month is included in the gemstone's birth months list.
3. **Life Goal Match (20 Points)**: If the user's focus/goal aligns with the gemstone's suitable goals list.
4. **Budget Range Match (10 Points)**: If the user's selected budget matches the gemstone's price range.

### Tie-breaker Logic:
If two or more gemstones obtain the same total score:
- The system prioritizes the gemstone that matches the **Zodiac Sign**.
- If still tied, it maintains the database retrieval order.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Registers a new user.
- `POST /api/auth/login` - Authenticates user & returns JWT.
- `GET /api/auth/me` - Returns active user details *(Requires Token)*.

### Gemstones
- `GET /api/gemstones` - Lists all gemstones.
- `GET /api/gemstones/:id` - Fetch details for a specific gemstone.
- `POST /api/gemstones` - Creates a new gemstone *(Requires Token & Admin Role)*.
- `PUT /api/gemstones/:id` - Updates details for a gemstone *(Requires Token & Admin Role)*.
- `DELETE /api/gemstones/:id` - Removes a gemstone *(Requires Token & Admin Role)*.

### Recommendations
- `POST /api/recommend` - Calculates and saves a recommendation *(Saves to history if token is present)*.
- `GET /api/recommend/history` - Fetches recommendation history for the logged-in user *(Requires Token)*.
- `GET /api/recommend/admin/users` - Fetches all registered users *(Requires Token & Admin Role)*.
- `DELETE /api/recommend/admin/users/:id` - Deletes a user account *(Requires Token & Admin Role)*.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) running locally or an active MongoDB Atlas URI connection string.

---

### Step 1: Backend Setup

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment. Check the [backend/.env](file:///c:/Users/Nishant%20Bhalla/Desktop/assignment/backend/.env) file to configure ports, credentials, and secrets:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/gemfinder
   JWT_SECRET=supersecretgemfinderkey12345
   NODE_ENV=development
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Note: Upon starting for the first time, the server will automatically seed the database with gemstones and default accounts.*

---

### Step 2: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 👥 Default Accounts

The database comes pre-seeded with two accounts for easy testing.

### Admin Account
- **Email**: `admin@gemfinder.com`
- **Password**: `adminpassword123`
- **Role**: `admin` (can manage gemstones, users, and review metrics)

### Regular User Account
- **Email**: `user@gemfinder.com`
- **Password**: `userpassword123`
- **Role**: `user` (can request recommendations, view search history, and see saved results)
