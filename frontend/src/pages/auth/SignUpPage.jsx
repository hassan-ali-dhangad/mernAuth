import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { InputField, PasswordInput, Button } from "../../components/ui";
import { MailIcon, UserIcon } from "../../components/ui";
import useAuthStore from "../../store/authStore";

function PasswordStrength({ password }) {
  const checks = [
    {
      label: "At least 8 characters",
      pass: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      pass: /[A-Z]/.test(password),
    },
    {
      label: "One number",
      pass: /\d/.test(password),
    },
    {
      label: "One special character",
      pass: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const score = checks.filter((c) => c.pass).length;

  if (!password) return null;

  const barColor =
    score <= 1
      ? "bg-red-500"
      : score <= 2
        ? "bg-amber-500"
        : score <= 3
          ? "bg-yellow-500"
          : "bg-emerald-500";

  const label =
    score <= 1 ? "Weak" : score <= 2 ? "Fair" : score <= 3 ? "Good" : "Strong";

  const labelColor =
    score <= 1
      ? "text-red-500"
      : score <= 2
        ? "text-amber-500"
        : score <= 3
          ? "text-yellow-600"
          : "text-emerald-500";

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < score ? barColor : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        <span className={`text-xs font-medium ${labelColor}`}>{label}</span>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                c.pass ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"
              }`}
            />

            <span
              className={`text-[11px] ${
                c.pass
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-slate-400"
              }`}
            >
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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

    if (password.length < 8) {
      e.password = "Password must be at least 8 characters";
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
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MailIcon />}
            error={errors.email}
            autoComplete="email"
          />

          <div className="space-y-2">
            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="new-password"
            />

            <PasswordStrength password={password} />
          </div>

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
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
