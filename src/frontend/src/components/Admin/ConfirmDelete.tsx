import React from "react"
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react"

type ConfirmDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone."
}) => {
  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>
        {message}
      </DialogBody>
      <DialogFooter>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="flex items-center gap-3 shadow-none hover:shadow-md"
            size="sm"
            variant="text"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex items-center gap-3 shadow-none hover:shadow-md"
            size="sm"
            color="red"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  )
}

export default ConfirmDialog
