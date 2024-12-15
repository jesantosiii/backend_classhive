import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface ClassCodeProps {
  code: string;
}

export function ClassCode({ code }: ClassCodeProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded border border-black w-fit">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium">Class code:</span>
      </div>
      <div className="flex items-center gap-5 mt-2">
        <span className="text-lg text-sky-900 font-semibold">{code}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-all"
          onClick={copyCode}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
