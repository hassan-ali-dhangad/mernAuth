export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] flex-col relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 p-12 shrink-0">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/4 -right-20 w-72 h-72 rounded-full bg-violet-500/30" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-indigo-500/20" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="text-white font-display font-semibold text-lg tracking-tight">Mern Auth</span>
          </div>

          
          {/* Main copy */}
          <div className="mt-auto mb-auto pt-20">
            <h2 className="text-white font-display font-bold text-4xl xl:text-5xl leading-tight tracking-tight">
              Secure.<br />Simple.<br />Seamless.
            </h2>
            <p className="mt-5 text-indigo-100/80 text-base leading-relaxed max-w-xs">
              Enterprise-grade authentication for your applications. Protect users and ship faster.
            </p>

            {/* Feature pills */}
            <div className="mt-10 flex flex-col gap-3">
              {[
                { icon: '🔐', text: 'Multi-factor authentication' },
                { icon: '📧', text: 'Email verification & magic links' },
                { icon: '🛡️', text: 'Session management & revocation' },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-sm text-white/90 font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

      


        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2.5 px-6 pt-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className="font-display font-semibold text-slate-900 dark:text-white">Mern Auth</span>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
