import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { PasswordInput, Button, FormMessage } from "../../components/ui";
import useAuthStore from "../../store/authStore";

export default function ResetPasswordPage({ navigate }) {
  
  const resetPassword = useAuthStore((state) => state.resetPassword);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  // Get reset token from:
  // /reset-password/:token
  const token = window.location.pathname.split("/reset-password/")[1];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};


    if (password !== confirm) {
      errs.confirm = "Passwords do not match";
    }

    if (!token) {
      setError("Invalid or missing password reset token.");
      return;
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setError("");
    setLoading(true);

    try {
      await resetPassword({
        token,
        password,
        confirmPassword: confirm,
      });

      setSuccess(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to reset password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout navigate={navigate}>
        <div className="text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>

          <div>
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Password updated!
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>
          </div>

          <FormMessage
            type="success"
            message="Your password has been changed successfully."
          />

          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate("login")}
          >
            Sign in now
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout navigate={navigate}>
      <div className="space-y-8">
        <div>
          <div className="mb-5 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
            Set new password
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Choose a strong password that you haven't used before.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <FormMessage type="error" message={error} />}

          <PasswordInput
            label="New password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm new password"
            placeholder="Repeat your new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
            autoComplete="new-password"
          />


          <Button type="submit" loading={loading} size="lg" className="w-full">
            Reset password
          </Button>
        </form>

        <button
          type="button"
          onClick={() => navigate("login")}
          className="flex items-center justify-center gap-1.5 w-full text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to login
        </button>
      </div>
    </AuthLayout>
  );
}
