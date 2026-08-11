import { useState, useEffect } from "react";

import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

import DashboardLayout from "./components/DashboardLayout";
import OverviewPage from "./pages/dashboard/OverviewPage";

// import ProfilePage from "./pages/dashboard/ProfilePage";
// import SecurityPage from "./pages/dashboard/SecurityPage";

import SettingsPage from "./pages/dashboard/SettingsPage";

import useAuthStore from "./store/authStore";

const DASH_PAGES = ["overview", "profile", "security", "settings"];

export default function App() {
  const getInitialPage = () => {
    const path = window.location.pathname;

    if (path.startsWith("/reset-password/")) {
      return "reset-password";
    }

    return "login";
  };

  const [page, setPage] = useState(getInitialPage);
  const [darkMode, setDarkMode] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  const getMe = useAuthStore((state) => state.getMe);

  const logout = useAuthStore((state) => state.logout);

  // Check authentication when application starts
  useEffect(() => {
    getMe().catch(() => {
      // User is not authenticated
    });
  }, [getMe]);

  // Redirect authenticated user to dashboard
  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user) {
      // If user refreshes while on login page,
      // send them to dashboard.
      if (page === "login") {
        setPage("overview");
      }
    } else {
      // If authentication is lost while on dashboard,
      // send user back to login.
      if (DASH_PAGES.includes(page)) {
        setPage("login");
      }
    }
  }, [isLoading, isAuthenticated, user, page]);

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navigate = (target) => {
    setPage(target);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setPage("login");
    } catch (error) {
      console.error("Logout error:", error);
      setPage("login");
    }
  };

  const isDash = DASH_PAGES.includes(page);

  // Wait until /me finishes
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Loading...
        </div>
      </div>
    );
  }

  // Dashboard
  if (isDash && isAuthenticated && user) {
    return (
      <DashboardLayout
        currentPage={page}
        navigate={navigate}
        user={user}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        onLogout={handleLogout}
      >
        {page === "overview" && (
          <OverviewPage user={user} navigate={navigate} />
        )}

      

        {page === "settings" && <SettingsPage />}
      </DashboardLayout>
    );
  }

  // Auth pages
  const authProps = {
    navigate,
    darkMode,
    onToggleDark: () => setDarkMode((d) => !d),
  };

  return (
    <>
      {/* Dark mode toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode((d) => !d)}
          className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 shadow-sm transition-all"
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />

              <line x1="12" y1="1" x2="12" y2="3" />

              <line x1="12" y1="21" x2="12" y2="23" />

              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />

              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />

              <line x1="1" y1="12" x2="3" y2="12" />

              <line x1="21" y1="12" x2="23" y2="12" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>

      {page === "login" && <LoginPage {...authProps} />}

      {page === "signup" && <SignUpPage {...authProps} />}

      {page === "verify-email" && <VerifyEmailPage {...authProps} />}

      {page === "forgot-password" && <ForgotPasswordPage {...authProps} />}

      {page === "reset-password" && <ResetPasswordPage {...authProps} />}
    </>
  );
}
