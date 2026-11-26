import { LogOut } from 'lucide-react'

import { AnalyticsConsentSetting } from '@/features/analytics-consent'
import {
  ChangePasswordForm,
  ChangeUsernameDialog,
  DeleteAccountDialog,
  useLogoutToLogin,
  useUser,
} from '@/features/auth'
import { Button } from '@/shared/ui/button'
import { SidebarToggle } from '@/widgets/app-sidebar'

import { ProfileSection } from './ui/profile-section'

export const ProfilePage = () => {
  const user = useUser()
  const logoutToLogin = useLogoutToLogin()
  const userName = user?.name ?? 'Pilot'
  const userInitial = userName.at(0) ?? 'P'

  const handleLogout = () => {
    void logoutToLogin()
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-2 pt-2 lg:hidden">
        <SidebarToggle />
      </div>
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>

        <ProfileSection title="Account">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground uppercase">
                {userInitial}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium">{userName}</p>
                <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <ChangeUsernameDialog />
          </div>
        </ProfileSection>

        <ProfileSection title="Password">
          <ChangePasswordForm />
        </ProfileSection>

        <ProfileSection title="Analytics">
          <AnalyticsConsentSetting />
        </ProfileSection>

        <ProfileSection title="Session">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut />
            Log out
          </Button>
        </ProfileSection>

        <ProfileSection title="Delete account" danger>
          <p className="text-sm text-muted-foreground">
            Deleting your account removes your profile and progress permanently.
          </p>
          <DeleteAccountDialog />
        </ProfileSection>
      </div>
    </div>
  )
}
