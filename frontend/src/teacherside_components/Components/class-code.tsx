import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react"; // Removed MoreHorizontal since it's not used
import { useState, useEffect } from "react";

interface ClassCodeProps {
  code?: string; // Make code optional
}

export function ClassCode({ code }: ClassCodeProps) {
  const [copied, setCopied] = useState(false);
  const [classCode, setClassCode] = useState<string | null>(null); // State to hold the class code

  useEffect(() => {
    // Check local storage for the class code when the component mounts
    const storedClassCode = localStorage.getItem("class_code");
    if (storedClassCode) {
      setClassCode(storedClassCode); // Set the class code from local storage
    } else {
      setClassCode(code || null); // Fallback to the prop if local storage is empty
    }
  }, [code]); // Dependency array includes code to update if it changes

  const copyCode = () => {
    if (classCode) { // Check if classCode is not empty
      navigator.clipboard.writeText(classCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded border border-black w-fit">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium">Class code:</span>
        {copied && <span className="text-green-500 text-sm">Copied!</span>} {/* Show feedback when copied */}
      </div>
      <div className="flex items-center gap-5 mt-2">
        <span className="text-lg text-sky-900 font-semibold">{classCode || "Unknown"}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full transition-all"
          onClick={copyCode}
          aria-label="Copy class code" // Accessibility improvement
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}