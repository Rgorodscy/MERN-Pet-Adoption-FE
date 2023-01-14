import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Homepage from "../pages/Homepage";
import MyPets from "../pages/MyPets";
import ProfileEdit from "../pages/ProfileEdit";
import Pet from "../pages/Pet";
import PetAddEdit from "../pages/PetAddEdit";
import Search from "../pages/Search";
import Dashboard from "../pages/Dashboard";
import UserProfile from "../pages/UserProfile";
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import NotificationToast from "../components/NotificationToast";

function MainComponent() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/pet/:id"
              element={
                <PrivateRoute>
                  <Pet />
                </PrivateRoute>
              }
            />
            <Route
              path="/myprofile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/editprofile"
              element={
                <PrivateRoute>
                  <ProfileEdit />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypets"
              element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              }
            />
            <Route
              path="/petadd"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <PetAddEdit />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/petedit/:id"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <PetAddEdit />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
          </Routes>
          <NotificationToast />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default MainComponent;
