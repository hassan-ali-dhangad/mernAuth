import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { InputField, PasswordInput, Button } from "../../components/ui";
import { MailIcon, UserIcon } from "../../components/ui";
import useAuthStore from "../../store/authStore";

export default function SignUpPage({ navigate }) {
  const signup = useAuthStore((state) => state.signup);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};

    if (!name.trim()) {
      e.name = "Full name is required";
    }

    if (!email.includes("@")) {
      e.email = "Enter a valid email";
    }

    if (password !== confirm) {
      e.confirm = "Passwords do not match";
    }

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword: confirm,
      });

      // Save email temporarily for the verification page
      sessionStorage.setItem("verificationEmail", email.trim());

      // Signup succeeded
      navigate("verify-email");
    } catch (error) {
      console.error("Signup error:", error);

      setErrors({
        server:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout navigate={navigate}>
      <div className="space-y-7">
        {/* Header */}
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
            Create your account
          </h1>
        </div>

        {/* Server Error */}
        {errors.server && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
            {errors.server}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full name"
            type="text"
            placeholder="Alex Johnson"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<UserIcon />}
            error={errors.name}
            autoComplete="name"
          />

          <InputField
            label="Email address"
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MailIcon />}
            error={errors.email}
            autoComplete="email"
          />

          <PasswordInput
            label="Password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
            autoComplete="new-password"
          />

          <Button type="submit" loading={loading} size="lg" className="w-full">
            Create account
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("login")}
            className="text-indigo-600 cursor-pointer dark:text-indigo-400 font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
