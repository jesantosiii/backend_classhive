import { Button } from "@/components/ui/button";
import { Megaphone, Send } from "lucide-react";

export function AnnouncementInput() {
  return (
    <div className="flex items-center gap-2 p-4 bg-white rounded border-black border">
      <Megaphone className="h-5 w-5 text-gray-500" />
      <input
        type="text"
        placeholder="Announce something to your class"
        className="flex-1 bg-transparent outline-none text-sm"
      />
      <Button
        variant="ghost"
        className="rounded-full transition-all"
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
