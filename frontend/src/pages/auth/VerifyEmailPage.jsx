import { useState, useEffect } from "react";
import AuthLayout from "../../components/AuthLayout";
import { OTPInput, Button, FormMessage } from "../../components/ui";
import useAuthStore from "../../store/authStore";

export default function VerifyEmailPage({ navigate }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const verifyEmail = useAuthStore((state) => state.verifyEmail);

  const resendOTP = useAuthStore((state) => state.resendOTP);

  // Email saved during signup
  const email = sessionStorage.getItem("verificationEmail");

  // Countdown
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setStatus({
        type: "error",
        message: "Please enter the complete 6-digit code.",
      });
      return;
    }

    if (!email) {
      setStatus({
        type: "error",
        message: "Verification email is missing. Please sign up again.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await verifyEmail({
        email,
        otp: code,
      });

      setStatus({
        type: "success",
        message: "Email verified successfully! Redirecting to login...",
      });

      // Email is no longer needed after verification
      sessionStorage.removeItem("verificationEmail");

      setTimeout(() => {
        navigate("login");
      }, 1500);
    } catch (error) {
      console.error("Verify email error:", error);

      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Invalid or expired verification code.",
      });

      setOtp(Array(6).fill(""));
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!email) {
      setStatus({
        type: "error",
        message: "Verification email is missing. Please sign up again.",
      });
      return;
    }

    setResendLoading(true);
    setStatus(null);

    try {
      await resendOTP({
        email,
      });

      setOtp(Array(6).fill(""));
      setCountdown(60);
      setCanResend(false);

      setStatus({
        type: "success",
        message: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      console.error("Resend OTP error:", error);

      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to resend verification code.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout navigate={navigate}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white tracking-tight">
            Check your email
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            We sent a 6-digit verification code to
            <br />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {email || "your email address"}
            </span>
          </p>
        </div>

        {/* OTP form */}
        <form onSubmit={handleVerify} className="space-y-6">
          {status && (
            <FormMessage type={status.type} message={status.message} />
          )}

          <OTPInput
            value={otp}
            onChange={setOtp}
            error={status?.type === "error" ? "" : undefined}
          />

          <Button type="submit" loading={loading} size="lg" className="w-full">
            Verify email
          </Button>
        </form>

        {/* Resend */}
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Didn't receive the code?
          </p>

          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? "Sending..." : "Resend code"}
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 text-sm text-slate-400">
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Resend in
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-display font-semibold text-sm">
                {countdown}
              </span>
              seconds
            </div>
          )}
        </div>

        {/* Hint */}
        <div className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-xs text-slate-500 dark:text-slate-400 text-center">
          💡 Check your inbox and spam folder for the verification code.
        </div>

        {/* Back to login */}
        <button
          type="button"
          onClick={() => navigate("login")}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mx-auto"
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
