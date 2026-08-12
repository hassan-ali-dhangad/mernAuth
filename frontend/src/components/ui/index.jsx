import { useState, useRef, useEffect, forwardRef } from 'react'

// ── Icons ──────────────────────────────────────────────────────────────────

export const EyeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

export const EyeOffIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

export const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export const AlertIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

export const SpinnerIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
)

export const ShieldCheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)

export const MailIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

export const LockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

export const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

export const XIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

// ── InputField ─────────────────────────────────────────────────────────────

export const InputField = forwardRef(
  ({ label, error, icon, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={[
            'w-full rounded-xl border bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100',
            'placeholder:text-slate-400 transition-all outline-none',
            icon ? 'pl-10' : '',
            error
              ? 'border-red-400 ring-2 ring-red-100 dark:ring-red-900/40'
              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40',
            className,
          ].join(' ')}
          {...props}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertIcon size={13} /> {error}
        </p>
      )}
    </div>
  )
)
InputField.displayName = 'InputField'

// ── PasswordInput ──────────────────────────────────────────────────────────

export const PasswordInput = forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    const [show, setShow] = useState(false)
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <LockIcon />
          </span>
          <input
            ref={ref}
            type={show ? 'text' : 'password'}
            className={[
              'w-full rounded-xl border bg-white dark:bg-slate-800 pl-10 pr-11 py-3 text-sm text-slate-900 dark:text-slate-100',
              'placeholder:text-slate-400 transition-all outline-none',
              error
                ? 'border-red-400 ring-2 ring-red-100 dark:ring-red-900/40'
                : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40',
              className,
            ].join(' ')}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            tabIndex={-1}
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-500">
            <AlertIcon size={13} /> {error}
          </p>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

// ── OTPInput ───────────────────────────────────────────────────────────────

export function OTPInput({ value, onChange, error }) {
  const refs = useRef([])

  const handleChange = (i, ch) => {
    if (!/^\d?$/.test(ch)) return
    const next = [...value]
    next[i] = ch
    onChange(next)
    if (ch && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < 5) refs.current[i + 1]?.focus()
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length === 6) {
      onChange(text.split(''))
      refs.current[5]?.focus()
    }
    e.preventDefault()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el }}
            type="text"
            inputMode="numeric"
          placeholder="0"
            maxLength={1}
            value={value[i] || ''}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={[
              'w-12 h-14 rounded-xl border text-center text-xl font-semibold font-display',
              'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
              'outline-none transition-all',
              error
                ? 'border-red-400 ring-2 ring-red-100'
                : value[i]
                  ? 'border-indigo-500 ring-2 ring-indigo-100 dark:ring-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                  : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/40',
            ].join(' ')}
          />
        ))}
      </div>
      {error && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-red-500">
          <AlertIcon size={13} /> {error}
        </p>
      )}
    </div>
  )
}

// ── Button ─────────────────────────────────────────────────────────────────

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  icon,
  iconRight,
  children,
  className = '',
  disabled,
  ...props
}) {
  const base = 'inline-flex cursor-pointer items-center justify-center gap-2 font-medium rounded-xl transition-all outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white focus:ring-indigo-500',
    secondary: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100 focus:ring-slate-400',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-slate-400',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      disabled={disabled || loading}
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...props}
    >
      {loading ? <SpinnerIcon size={size === 'lg' ? 18 : 16} /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  )
}

// ── FormMessage ────────────────────────────────────────────────────────────

export function FormMessage({ type, message }) {
  const styles = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400',
    error: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400',
    info: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400',
  }
  const icons = {
    success: <CheckIcon size={15} />,
    error: <AlertIcon size={15} />,
    info: <AlertIcon size={15} />,
  }

  return (
    <div className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>
      <span className="mt-0.5 shrink-0">{icons[type]}</span>
      <span>{message}</span>
    </div>
  )
}

// ── Badge ──────────────────────────────────────────────────────────────────

export function Badge({ variant = 'neutral', children }) {
  const styles = {
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}

// ── Modal ──────────────────────────────────────────────────────────────────

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold font-display text-slate-900 dark:text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <XIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ── Toggle ─────────────────────────────────────────────────────────────────

export function Toggle({ checked, onChange, label, description }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={[
          'relative mt-0.5 inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 cursor-pointer',
          checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 mt-0.5',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          ].join(' ')}
        />
      </div>
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>}
          {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  )
}
