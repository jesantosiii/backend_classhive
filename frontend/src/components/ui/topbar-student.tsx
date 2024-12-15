import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopBarStudent() {
  return (
    <div className="bg-gradient-to-r from-[#0a192f] to-[#1a3a4a] mt-4 ml-4 mr-4 rounded-xl">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-white ml-5">My Classroom</h1>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Student profile" />
            <AvatarFallback>MJ</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none text-white">
              Moytoy
            </span>
            <span className="text-xs text-slate-400 mr-10">4th year</span>
          </div>
        </div>
      </div>
    </div>
  );
}


