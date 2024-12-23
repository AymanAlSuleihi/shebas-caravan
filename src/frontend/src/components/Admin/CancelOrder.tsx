import React, { useState } from "react"
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Radio } from "@material-tailwind/react"
import { OrderOut, OrdersService } from "../../client"
import ConfirmDialog from "./ConfirmDelete"

type CancelOrderProps = {
  open: boolean
  onClose: () => void
  order: OrderOut
}

const CancelOrder: React.FC<CancelOrderProps> = ({ open, onClose, order }) => {
  const [refundType, setRefundType] = useState<"full" | "partial">("full")
  const [refundAmount, setRefundAmount] = useState<number>(0)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})

  const handleRefundAndCancel = async () => {
    await OrdersService.ordersRefundOrder({ 
      orderId: order.id,
      refundAmount: refundType === "partial" ? refundAmount : order.amount,
      cancelOrder: true,
    })
    onClose()
  }

  const handleRefundOnly = async () => {
    await OrdersService.ordersRefundOrder({ 
      orderId: order.id,
      refundAmount: refundType === "partial" ? refundAmount : order.amount,
      cancelOrder: false,
    })
    onClose()
  }

  const openConfirmDialog = (action: () => void) => {
    setConfirmAction(() => action)
    setConfirmDialogOpen(true)
  }

  return (
    <>
      <Dialog open={open} handler={onClose} size="sm">
        <DialogHeader>Cancel Order</DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <div>
              <Radio
                id="full-refund"
                name="refund"
                label="Full Refund"
                checked={refundType === "full"}
                onChange={() => setRefundType("full")}
              />
              <Radio
                id="partial-refund"
                name="refund"
                label="Partial Refund"
                checked={refundType === "partial"}
                onChange={() => setRefundType("partial")}
              />
            </div>
            {refundType === "partial" && (
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Refund Amount"
                value={refundAmount}
                max={order.amount}
                onChange={(e) => setRefundAmount(Math.min(parseFloat(e.target.value), order.amount))}
              />
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3 rounded shadow-none hover:shadow-md"
              size="sm"
              variant="text"
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              className="flex items-center gap-3 rounded shadow-none hover:shadow-md"
              size="sm"
              color="amber"
              onClick={() => openConfirmDialog(handleRefundAndCancel)}
            >
              Refund & Cancel
            </Button>
            <Button
              className="flex items-center gap-3 rounded shadow-none hover:shadow-md"
              size="sm"
              color="red"
              onClick={() => openConfirmDialog(handleRefundOnly)}
            >
              Refund Only
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmAction}
        title="Confirm Action"
        message="Are you sure you want to proceed? This action cannot be undone."
      />
    </>
  )
}

export default CancelOrder
