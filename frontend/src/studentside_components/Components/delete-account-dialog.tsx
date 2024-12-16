import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { getTokens, clearAuthData } from "../../../config"; // Ensure this path is correct
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
}: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleDelete = async () => {
    if (confirmText === "DELETE") {
      setLoading(true);

      const tokens = getTokens();
      if (!tokens?.access) {
        alert("You must be logged in to delete your account.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.delete("http://127.0.0.1:8000/accounts/delete-account/", {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        console.log(response.data.message);
        alert("Your account has been deleted successfully.");
        clearAuthData(); // Clear tokens and user data from localStorage
        onOpenChange(false); // Close the dialog
        navigate("/login"); // Redirect to the login page using navigate
      } catch (error) {
        console.error("Failed to delete account:", error);
        alert(
          "An error occurred while deleting your account. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Delete Account</DialogTitle>
          <DialogDescription>
            Deleting your account will remove all of your information from our
            database. This cannot be undone.
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
          <Button
            variant="outline"
            className="text-white"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={confirmText !== "DELETE" || loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
