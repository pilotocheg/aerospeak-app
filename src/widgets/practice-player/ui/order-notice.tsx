import { ArrowDownUp } from 'lucide-react'

import type { OrderFeedbackDto } from '@/shared/api'

type OrderNoticeProps = {
  order: OrderFeedbackDto
}

/** Why points were lost for the order: the words can all be right and the order still wrong. */
export const OrderNotice = ({ order }: OrderNoticeProps) => (
  <div className="flex gap-3 rounded-lg border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-200">
    <ArrowDownUp className="size-5 shrink-0" />
    <div className="space-y-0.5">
      <p className="font-semibold">
        Order{order.lostPoints > 0 && <span className="font-normal"> · −{order.lostPoints}%</span>}
      </p>
      {order.message && <p>{order.message}</p>}
    </div>
  </div>
)
