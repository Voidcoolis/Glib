import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import {Loader} from "lucide-react";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore() //called from useAuthStore.js

  useEffect(() => {
    checkAuth(); //check if the user is authenticated when the app loads
  }, [checkAuth]);

  console.log("Auth User:", authUser);

  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        //! authUser - if the user is not authenticated, redirect to login page
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        //! if there is no authUser, they can see the signup page , otherwise redirect to home page
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
      </Routes>
    </div>
  );
};

export default App;
