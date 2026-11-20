import { ArrowDownUp } from 'lucide-react'

import type { OrderFeedbackDto } from '@/shared/api'

import { Callout } from '../common/callout'

type OrderNoticeProps = {
  order: OrderFeedbackDto
}

/** Why points were lost for the order: the words can all be right and the order still wrong. */
export const OrderNotice = ({ order }: OrderNoticeProps) => (
  <Callout tone="warning" icon={ArrowDownUp}>
    <div className="space-y-0.5">
      <p className="font-semibold">
        Order{order.lostPoints > 0 && <span className="font-normal"> · −{order.lostPoints}%</span>}
      </p>
      {order.message && <p>{order.message}</p>}
    </div>
  </Callout>
)
