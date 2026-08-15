import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { InputField, Button, FormMessage } from "../../components/ui";
import { MailIcon } from "../../components/ui";
import useAuthStore from "../../store/authStore";

export default function ForgotPasswordPage({ navigate }) {
  const forgotPassword = useAuthStore((state) => state.forgotPassword);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await forgotPassword({ email });

      setSent(true);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
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
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
              Check your inbox
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              We sent a password reset link to
              <br />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {email}
              </span>
            </p>
          </div>

          <FormMessage
            type="success"
            message="Reset link sent! It expires in 15 minutes."
          />

          <p className="text-xs text-slate-400">
            Didn't receive it?{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Try again
            </button>
          </p>

          <button
            type="button"
            onClick={() => navigate("login")}
            className="flex items-center cursor-pointer justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mx-auto"
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

  return (
    <AuthLayout navigate={navigate}>
      <div className="space-y-8">
        <div>
          <div className="mb-5 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
            Forgot password?
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            No worries — enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <FormMessage type="error" message={error} />}

          <InputField
            label="Email address"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MailIcon />}
            autoComplete="email"
          />

          <Button type="submit" loading={loading} size="lg" className="w-full">
            Send reset link
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
