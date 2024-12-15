import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface DeleteAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteAccountDialog({ open, onOpenChange }: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  
  const handleDelete = () => {
    if (confirmText === "DELETE") {
      // Handle delete logic here
      console.log("Account deleted")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Delete Account</DialogTitle>
          <DialogDescription>
            Deleting your Account will remove all of your information from our database. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            To confirm this, type "DELETE"
          </p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="text-white"
          />
        </div>
        <DialogFooter className="flex space-x-2 sm:space-x-4">
          <Button variant="outline" className="text-white" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmText !== "DELETE"}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}