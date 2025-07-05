# Glib - Real-Time Chat Application

Glib is a modern full-stack chat application featuring real-time messaging, user authentication, profile management, and theme customization. Built with React, Node.js, Express, MongoDB, and Socket.io, Glib provides a clean, responsive, and interactive chat experience.

---

## Features

- **Real-Time Messaging:** Instant chat updates using Socket.io.
- **User Authentication:** Secure signup, login, and logout flows.
- **Profile Management:** Update user info and profile picture (with Cloudinary support).
- **Online Users:** See who is online in real time.
- **Image Attachments:** Send and preview images in chat.
- **Theme Customization:** Switch between multiple chat themes.
- **Responsive UI:** Works on desktop and mobile devices.
- **Loading Skeletons:** Smooth user experience while loading data.

---

## Tech Stack

- **Frontend:** React, Zustand, Tailwind CSS, DaisyUI, Socket.io-client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io
- **Other:** Cloudinary (image uploads), Axios, React Hot Toast

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/glib.git
   cd glib
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in `/backend` with:
     ```
     PORT=5001
     MONGODB_URI=your_mongodb_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     NODE_ENV=development
     ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the app:**
   - **Backend:**  
     ```bash
     npm run dev
     ```
   - **Frontend:**  
     ```bash
     npm run dev
     ```

5. **Visit:**  
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
/backend
  /src
    /controllers
    /models
    /routes
    /lib
    index.js
/frontend
  /src
    /components
    /pages
    /store
    /lib
    main.jsx
```

---

## Acknowledgements

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## Tags

`react` `nodejs` `express` `mongodb` `socketio` `chat` `authentication` `cloudinary` `zustand` `fullstack` `theme-switcher` `real-time`