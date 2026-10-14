import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { AuthField, AuthForm } from '@/features/auth/ui/auth-form'
import { useAuthStore } from '@/features/auth/model/auth-store'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('student@aerospeak.io')
  const [password, setPassword] = useState('password123')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login({ email, password })
    navigate({ to: '/' })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.24),_transparent_20%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-6 py-12 text-slate-50">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Aerospeak</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white">Welcome back to your learning space.</h1>
            <p className="mt-4 max-w-md text-slate-300">
              Keep the momentum. Continue your courses, join live sessions, and track progress in one place.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {['Live mentoring', 'Career roadmap', 'Skill tracking'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-slate-800 bg-slate-900/50 p-6 lg:border-l lg:border-t-0">
          <AuthForm
            title="Sign in"
            description="Use your organization account to continue"
            submitLabel="Login"
            onSubmit={handleSubmit}
            footer={
              <>
                Need an account?{' '}
                <Link to="/register" className="font-medium text-indigo-300 transition hover:text-indigo-200">
                  Create one
                </Link>
              </>
            }
          >
            <AuthField label="Email address" name="email" type="email" value={email} onChange={setEmail} placeholder="name@company.com" />
            <AuthField label="Password" name="password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-700 bg-slate-950" />
                Remember me
              </label>
              <button type="button" className="text-indigo-300 hover:text-indigo-200">
                Forgot password?
              </button>
            </div>
          </AuthForm>
        </div>
      </div>
    </div>
  )
}
