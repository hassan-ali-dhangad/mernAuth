import { useState } from "react";
import { PasswordInput, Button, FormMessage, Modal } from "../../components/ui";
import useAuthStore from "../../store/authStore";

export default function SettingsPage({navigate}) {
  const changePassword = useAuthStore((state) => state.changePassword);
  const deleteAccount = useAuthStore((state) => state.deleteAccount);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [pwStatus, setPwStatus] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
const [showConfirm, setShowConfirm] = useState(false);
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwStatus(null);

    if (newPw !== confirmPw) {
      setPwStatus({
        type: "error",
        msg: "New password and confirmation do not match.",
      });
      return;
    }

    setPwLoading(true);

    try {
      const response = await changePassword({
        currentPassword: currentPw,
        newPassword: newPw,
        confirmNewPassword: confirmPw,
      });

      setPwStatus({
        type: "success",
        msg: response?.message || "Password updated successfully!",
      });

      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
    } catch (error) {
      setPwStatus({
        type: "error",
        msg:
          error.response?.data?.message ||
          "Failed to update password. Please check your current password.",
      });
    } finally {
      setPwLoading(false);
    }
  };

const handleDeleteAccount = async () => {
  try {
    setDeleting(true);
    setDeleteError("");

    await deleteAccount();

    // Account deleted successfully
    navigate("login");
  } catch (error) {
    setDeleteError(
      error.response?.data?.message || "Failed to delete account"
    );
  } finally {
    setDeleting(false);
  }
};

  return (
    <div className="p-6 lg:p-8 max-w-10xl mx-auto space-y-7">
      <div>
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
          Account Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your preferences, notifications, and account actions.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm">
              Change Password
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update your security credentials
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {pwStatus && (
            <FormMessage type={pwStatus.type} message={pwStatus.msg} />
          )}

          <PasswordInput
            label="Current password"
            placeholder="Enter current password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            required
          />
          <PasswordInput
            label="New password"
            placeholder="Create new password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            required
          />
          <PasswordInput
            label="Confirm new password"
            placeholder="Repeat new password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            required
          />

          <div className="flex justify-end">
            <Button type="submit" loading={pwLoading}>
              Update password
            </Button>
          </div>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/40 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <h3 className="font-display font-semibold text-red-700 dark:text-red-400 text-sm">
              Danger Zone
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Irreversible account actions
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
              Delete account
            </p>
            <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-0.5">
              Permanently delete your account and all associated data. This
              cannot be undone.
            </p>
          </div>
        {showConfirm ? (
  <div className="flex items-center gap-2 shrink-0">
    <span className="text-xs text-red-600 dark:text-red-400 font-medium">
      Are you sure?
    </span>
    <Button
      variant="danger"
      size="sm"
      onClick={handleDeleteAccount}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Yes, delete"}
    </Button>
    <Button
      variant="ghost" // or "secondary" depending on your UI library options
      size="sm"
      onClick={() => setShowConfirm(false)}
      disabled={deleting}
    >
      Cancel
    </Button>
  </div>
) : (
  <Button
    variant="danger"
    size="sm"
    className="shrink-0"
    onClick={() => setShowConfirm(true)}
  >
    Delete account
  </Button>
)}
        </div>
      </div>
    </div>
  );
}
