const stats = [
  {
    label: 'Total Logins',
    value: '1,284',
    change: '+12%',
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
    ),
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    label: 'Active Sessions',
    value: '3',
    change: '+1 today',
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-100 dark:bg-violet-900/30',
  },
  {
    label: 'Security Score',
    value: '92/100',
    change: '+4 pts',
    positive: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    label: 'Account Age',
    value: '47 days',
    change: 'Since Jul 2025',
    positive: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
]

const activities = [
  { icon: '🔐', title: 'Successful login', detail: 'Chrome · macOS · New York, US', time: '2 min ago', tag: 'Login', tagColor: 'info' },
  { icon: '🛡️', title: 'Security scan passed', detail: 'No threats detected in your account', time: '1 hour ago', tag: 'Security', tagColor: 'success' },
  { icon: '📧', title: 'Email verified', detail: 'alex.johnson@company.com confirmed', time: '5 days ago', tag: 'Account', tagColor: 'neutral' },
  { icon: '🔑', title: 'Password changed', detail: 'Password updated from Settings', time: '12 days ago', tag: 'Security', tagColor: 'warning' },
  { icon: '👤', title: 'Profile updated', detail: 'Bio and job title updated', time: '19 days ago', tag: 'Profile', tagColor: 'neutral' },
  { icon: '✅', title: 'Account created', detail: 'Welcome to AuthKit!', time: '47 days ago', tag: 'Account', tagColor: 'success' },
]

const tagColors = {
  info: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
}

export default function OverviewPage({ user, navigate }) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xl font-bold font-display shrink-0">
          {initials}
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {user.email} · {user.isVerified ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Email verified ✓</span>
            ) : (
              <button onClick={() => navigate('verify-email')} className="text-amber-600 dark:text-amber-400 font-medium hover:underline">
                Verify your email →
              </button>
            )}
          </p>
        </div>
        <div className="sm:ml-auto text-sm text-slate-500 dark:text-slate-400 shrink-0">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              {stat.positive !== null && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${stat.positive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p className="font-display font-bold text-2xl text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
              {stat.positive === null && (
                <p className="text-xs text-slate-400 mt-0.5">{stat.change}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
            <span className="text-xs text-slate-400">Last 30 days</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <span className="text-2xl mt-0.5">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.title}</p>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${tagColors[a.tagColor]}`}>{a.tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.detail}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0 mt-0.5">{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Security score */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white">Security Score</h3>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Excellent</span>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="font-display font-bold text-5xl text-slate-900 dark:text-white">92</span>
              <span className="text-slate-400 mb-2">/100</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-700" />
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: 'Email verified', done: true },
                { label: 'Strong password', done: true },
                { label: 'Two-factor auth', done: false },
                { label: 'Recovery codes', done: true },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    {item.done && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </span>
                  <span className={`text-xs ${item.done ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400'}`}>{item.label}</span>
                  {!item.done && (
                    <button onClick={() => navigate('security')} className="ml-auto text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                      Enable
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Edit profile', icon: '👤', page: 'profile' },
                { label: 'Change password', icon: '🔑', page: 'security' },
                { label: 'Account settings', icon: '⚙️', page: 'settings' },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.page)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group"
                >
                  <span className="text-base">{action.icon}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{action.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-slate-300 group-hover:text-slate-500 transition-colors">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
