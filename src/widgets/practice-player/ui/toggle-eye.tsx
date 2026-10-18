import { cn } from 'cn'
import { Eye } from 'lucide-react'

type ToggleEyeProps = {
  label: string
  active: boolean
  disabled?: boolean
  onClick: () => void
}

export const ToggleEye = ({ label, active, disabled, onClick }: ToggleEyeProps) => (
  <button
    type="button"
    aria-pressed={active}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      'flex flex-col items-center text-[11px] font-semibold transition disabled:opacity-30',
      active ? 'text-red-500' : 'text-primary hover:text-primary/80',
    )}
  >
    {label}
    <Eye className="size-6" />
  </button>
)
