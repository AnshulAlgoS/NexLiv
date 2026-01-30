# 🏡 NexLiv - AI-Powered Real Estate Discovery

![NexLiv Banner](https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop)

**NexLiv** is a next-generation real estate platform designed to simplify property discovery. Whether you're looking for a cozy room, a shared PG, or a full apartment, NexLiv uses intelligent recommendations and a seamless user interface to match you with your perfect home.

---

## ✨ Features

- **🧠 AI-Powered Recommendations**: Personalized property suggestions based on your lifestyle and preferences.
- **🎨 Modern & Responsive UI**: Built with a mobile-first approach using Tailwind CSS and shadcn/ui.
- **📝 Seamless Property Listing**: An intuitive, multi-step form with progress tracking to list your property in minutes.
- **🔍 Advanced Search & Filters**: Find exactly what you need with powerful search capabilities.
- **🗺️ Interactive Maps**: Visualize property locations with integrated Leaflet maps.
- **⚡ Smooth Animations**: Enhanced user experience with Framer Motion and GSAP transitions.
- **🔐 Secure Authentication**: Robust user management powered by Firebase.
- **📊 Dashboard & Analytics**: Visualize data with Recharts.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: React Context & Hooks

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/AnshulAlgoS/NexLiv.git
cd NexLiv
```

### 2. Frontend Setup

Navigate to the project root (if not already there) and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:8080` (or similar).

### 3. Backend Setup

Open a new terminal and navigate to the `server` directory:

```bash
cd server
```

Install backend dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server will run on the configured port (default is usually 5000 or 8000).

---

## 📂 Project Structure

```
NexLiv/
├── public/              # Static assets
├── server/              # Express backend
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── index.js         # Server entry point
├── src/                 # Frontend source code
│   ├── assets/          # Images and fonts
│   ├── components/      # Reusable UI components
│   │   └── ui/          # shadcn/ui primitives
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities (Firebase, utils)
│   ├── pages/           # Application pages (Home, Explore, etc.)
│   └── main.tsx         # App entry point
└── ...config files
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️
