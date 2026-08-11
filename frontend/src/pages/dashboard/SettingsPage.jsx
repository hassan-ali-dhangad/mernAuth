import { useState } from 'react'
import { PasswordInput,Button, Toggle, FormMessage, Modal } from '../../components/ui'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    loginAlerts: true,
    securityAlerts: true,
    productUpdates: false,
    weeklyDigest: true,
    smsAlerts: false,
  })
  const [timezone, setTimezone] = useState('America/New_York')
  const [language, setLanguage] = useState('en')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwStatus, setPwStatus] = useState(null)

  const handlePasswordChange = (e) => {
    e.preventDefault()
    setPwLoading(true)
    setTimeout(() => {
      if (currentPw !== 'correct-password') {
        setPwStatus({ type: 'error', msg: 'Current password is incorrect.' })
      } else if (newPw.length < 8) {
        setPwStatus({ type: 'error', msg: 'New password must be at least 8 characters.' })
      } else if (newPw !== confirmPw) {
        setPwStatus({ type: 'error', msg: 'New password and confirmation do not match.' })
      } else {
        setPwStatus({ type: 'success', msg: 'Password updated successfully!' })
        setCurrentPw('')
        setNewPw('')
        setConfirmPw('')
      }
      setPwLoading(false)
    }, 1000)
  }


  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 900)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-7">
      <div>
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">Account Settings</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your preferences, notifications, and account actions.</p>
      </div>

      {saved && <FormMessage type="success" message="Settings saved successfully!" />}
  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div>
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-sm">Change Password</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Last changed 12 days ago</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {pwStatus && <FormMessage type={pwStatus.type} message={pwStatus.msg} />}

          <PasswordInput
            label="Current password"
            placeholder="Enter current password"
            value={currentPw}
            onChange={e => setCurrentPw(e.target.value)}
          />
          <PasswordInput
            label="New password"
            placeholder="Create new password"
            value={newPw}
            onChange={e => setNewPw(e.target.value)}
          />
          <PasswordInput
            label="Confirm new password"
            placeholder="Repeat new password"
            value={confirmPw}
            onChange={e => setConfirmPw(e.target.value)}
          />

          <div className="flex justify-end">
            <Button type="submit" loading={pwLoading}>Update password</Button>
          </div>
        </form>
      </div>


      {/* Danger zone */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/40 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div>
            <h3 className="font-display font-semibold text-red-700 dark:text-red-400 text-sm">Danger Zone</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Irreversible account actions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
          <div>
            <p className="text-sm font-semibold text-red-800 dark:text-red-300">Delete account</p>
            <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-0.5">
              Permanently delete your account and all associated data. This cannot be undone.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setDeleteModal(true)}
            className="shrink-0"
          >
            Delete account
          </Button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal open={deleteModal} onClose={() => { setDeleteModal(false); setDeleteConfirm('') }} title="Delete Account">
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3 text-sm text-red-700 dark:text-red-400">
            ⚠️ This action is <strong>permanent and irreversible</strong>. All your data, sessions, and settings will be deleted.
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Type <span className="font-bold text-red-600">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder="DELETE"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => { setDeleteModal(false); setDeleteConfirm('') }}>
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              disabled={deleteConfirm !== 'DELETE'}
            >
              Delete account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
