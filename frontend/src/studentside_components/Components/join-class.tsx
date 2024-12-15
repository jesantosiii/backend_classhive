import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { CirclePlus } from 'lucide-react'
import JoinClassPic from '../../assets/Join Class Design.png'
import ClassHive from '../../assets/Logo/Classhive L.png'
import ClassHiveText from '../../assets/ClasshiveLP.png'

interface JoinClassFormProps {
  onSubmit?: (code: string) => void
}

export function JoinClassForm({ onSubmit }: JoinClassFormProps) {
  const [classCode, setClassCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(classCode)
  }

  return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" className="w-32 h-11 bg-[#202c3c] rounded-xl text-white hover:bg-white hover:text-[#202c3c]">
            <CirclePlus className="mr-2" /> Join Class
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white p-0">
            <style>{`
                .absolute.right-4.top-4 {
                display: none !important;
                }
            `}</style>
        <DialogClose asChild>
          <button className="absolute top-2 right-2 text-white bg-[#202c3c] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#3a4d6d] transition">
            ✕
          </button>
        </DialogClose>
        
      <div className="bg-[#202c3c] text-white py-4 flex items-center justify-center space-x-4 rounded-b-xl">
        <div className="w-16 h-16 mb-[5px] mr-[-15px]">
            <img src={ClassHive} alt="ClassHive logo" />
        </div>
        <div className="h-auto w-48 ">
            <img src={ClassHiveText} alt="ClassHive text" />
        </div>
        </div>
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-black text-2xl font-semibold">
              Enter Code To Join Class
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter Class Code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="w-full text-center text-lg text-black border border-gray-300"
            />
            <div className="flex justify-center">
              <Button 
                type="submit"
                className="w-32 bg-blue-500 rounded-xl hover:bg-blue-600 text-white"
              >
                JOIN
              </Button>
            </div>
            <div className="flex justify-center mt-8">
              <img 
                src={JoinClassPic}
                alt="Celebration illustration"
                className="w-full max-w-[400px]"
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
