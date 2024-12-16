import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClassHive from '../../assets/Logo/Logo.png';

interface QuizCardProps {
  name: string;
  description: string; // Updated to accept description
  onStart?: () => void;
}

export function QuizCard({ name, description, onStart }: QuizCardProps) {
  return (
    <Card className="w-[300px] p-4 bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="w-full h-[200px] bg-[#0B1829] rounded-xl mb-4 flex items-center justify-center">
        <img className="w-38 h-auto" src={ClassHive} alt="ClassHive Logo" />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-xl text-black">{name}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>{description}</p> {/* Display the quiz description */}
        </div>
        <div className="flex justify-center">
          <Button
            onClick={onStart}
            className="w-28 bg-[#47597E] rounded-xl hover:bg-[#47597E]/90 text-white"
          >
            Start
          </Button>
        </div>
      </div>
    </Card>
  );
}
