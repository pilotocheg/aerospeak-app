import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { AuthField, AuthForm } from '@/features/auth/ui/auth-form'
import { useAuthStore } from '@/features/auth/model/auth-store'

export function RegisterPage() {
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)
  const [name, setName] = useState('Maya Green')
  const [email, setEmail] = useState('maya@aerospeak.io')
  const [password, setPassword] = useState('password123')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    register({ name, email, password, role: 'Student' })
    navigate({ to: '/' })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.24),_transparent_20%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-6 py-12 text-slate-50">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl shadow-slate-950/30 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-between p-8 md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-indigo-300">Aerospeak</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white">Start learning with a smarter LMS experience.</h1>
            <p className="mt-4 max-w-md text-slate-300">
              Build a custom learning roadmap, join mentoring sessions, and unlock a better daily study flow for your team.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-sm text-slate-300">
            <p className="font-medium text-white">Why teams choose Aerospeak</p>
            <ul className="mt-3 space-y-2">
              <li>• Structured pathways for every role</li>
              <li>• Skill-based progress tracking</li>
              <li>• Learning recommendations and mentor support</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-slate-800 bg-slate-900/50 p-6 lg:border-l lg:border-t-0">
          <AuthForm
            title="Create account"
            description="Set up your profile and begin your first path"
            submitLabel="Create account"
            onSubmit={handleSubmit}
            footer={
              <>
                Already registered?{' '}
                <Link to="/login" className="font-medium text-indigo-300 transition hover:text-indigo-200">
                  Sign in
                </Link>
              </>
            }
          >
            <AuthField label="Full name" name="name" value={name} onChange={setName} placeholder="Jane Cooper" />
            <AuthField label="Email address" name="email" type="email" value={email} onChange={setEmail} placeholder="name@company.com" />
            <AuthField label="Password" name="password" type="password" value={password} onChange={setPassword} placeholder="Create a strong password" />
          </AuthForm>
        </div>
      </div>
    </div>
  )
}
