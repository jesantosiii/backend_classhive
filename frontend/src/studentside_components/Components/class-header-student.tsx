import React from 'react';

interface ClassHeaderStudentProps {
  className: string;
}

export function ClassHeaderStudent({ className }: ClassHeaderStudentProps) {
  return (
    <div className="w-full h-[200px] rounded-xl bg-gradient-to-r from-[#0a192f] to-[#1a3a4a] flex items-end justify-start p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-white">{className}</h1>
      </div>
    </div>
  )
}