import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LogoutConfirmationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmation: React.FC<LogoutConfirmationProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-white'>Are you sure you want to log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be redirected to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-white' onClick={onCancel}>No</AlertDialogCancel>
          <AlertDialogAction className='text-white' onClick={onConfirm}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutConfirmation;

