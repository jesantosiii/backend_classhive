import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, Send } from "lucide-react";

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

interface ClassFeedProps {
  posts: FeedPost[];
}

export function ClassFeed({ posts }: ClassFeedProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded border border-black">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.author.name}</span>
                </div>
                <span className="text-xs text-gray-500">{post.timestamp}</span>
              </div>
            </div>
          </div>
          <p className="text-sm">{post.content}</p>
          <div className="mt-4 flex items-center gap-2 border-t  border-black pt-4">
            <input
              type="text"
              placeholder="Add class comment"
              className="flex-1 text-sm bg-transparent  outline-none"
            />
            {/* Send Button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
