import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { createContext, useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import Navbar from "./pages/Navbar";
import AdminDashboard from "./AdminPages/AdminDashboard";
import TravelerPage from "./AdminPages/TravelerPage";
import Loader from "./components/Loader";
import TravelAgentDashBoard from "./pages/TravelAgentDashBoard";

// export const AuthContext = createContext();
const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerfied) {
    return <Navigate to="/verify-email" replace />;
  }
  return <Outlet />;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log("RedirectAuthenticatedUser", isAuthenticated, user);

  if (isAuthenticated && user?.isVerfied) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RedirectAuthenticatedAdmin = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  console.log("RedirectAuthenticatedAdmin", isAuthenticated, user);
  console.log("user?.role", user?.role);
  console.log("isLoading", isCheckingAuth);
  if (isCheckingAuth) {
    return (
      <div>
        <Loader />
      </div>
    ); // Or a spinner
  }

  if (isAuthenticated && user?.role === "admin") {
    return children; // Allow access to admin content
  }

  return <Navigate to="/" replace />; // Redirect non-admins
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  console.log(isAuthenticated);
  console.log(user);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-[#17153B] flex items-center justify-center relative overflow-hidden">
      <Navbar />
      <Routes>
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />

        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route
          path="/admin"
          element={
            <RedirectAuthenticatedAdmin>
              <AdminDashboard />
            </RedirectAuthenticatedAdmin>
          }
        />

        <Route path="/agent" element={<TravelAgentDashBoard />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
