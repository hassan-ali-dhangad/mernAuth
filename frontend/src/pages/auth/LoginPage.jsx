import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import {
  InputField,
  PasswordInput,
  Button,
  FormMessage,
} from "../../components/ui";
import { MailIcon } from "../../components/ui";
import useAuthStore from "../../store/authStore";

export default function LoginPage({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const login = useAuthStore((state) => state.login);
const setPendingVerificationEmail = useAuthStore(
  (state) => state.setPendingVerificationEmail
);
  
 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {
    await login({
      email,
      password,
    });

    // Login successful
    navigate("overview");

  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Invalid email or password.";

    // User exists but email is not verified
    if (
      error.response?.status === 403 &&
      message === "Please verify your email first"
    ) {
      // Save email so VerifyEmailPage knows which email to verify
      useAuthStore.setState({
        pendingVerificationEmail: email,
      });

      navigate("verify-email");
      return;
    }

    setError(message);
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthLayout navigate={navigate}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
            Welcome back
          </h1>

          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
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

          <div className="space-y-1.5">
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("forgot-password")}
                className="text-xs cursor-pointer text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button
            type="submit"
            loading={loading}
            size="lg"
            className="w-full mt-2"
          >
            Sign in
          </Button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account? {" "}
          <button
            type="button"
            onClick={() => navigate("signup")}
            className="text-indigo-600 cursor-pointer dark:text-indigo-400 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
