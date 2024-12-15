"use client"

import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import Confetti from 'react-confetti'

interface CompletionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CompletionModal({ isOpen, onClose }: CompletionModalProps) {
  const handleProceed = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-[#031C30] to-[#0a2540] border-none p-0">
      {isOpen && (
  <Confetti
    width={window.innerWidth * 0.32} // Adjust width relative to modal size
    height={window.innerHeight * 0.28} // Adjust height relative to modal size
    numberOfPieces={150}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
    }}
  />
)}

        <div className="flex flex-col items-center justify-center p-6 text-white">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-6">Done Quiz!</h2>
          <Button 
            className="bg-[#1a365d] hover:bg-[#234781] text-white"
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
