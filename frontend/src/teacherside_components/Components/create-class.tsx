import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LogoFL from "../../assets/Logo/Classhive FL.png";

export default function CreateClassForm() {
  return (
    <div className="w-full max-w-3xl overflow-hidden">
      <div className="grid grid-cols-2">
        {/* Form Section */}
        <div
          className="p-6 bg-white bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url(${LogoFL})`,
            backgroundSize: "contain",
          }}
        >
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-sky-950 mb-6">Create Class</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label  className="text-black" htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    placeholder="Enter class name"
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label  className="text-black" htmlFor="grade">Grade</Label>
                  <Input
                    id="grade"
                    placeholder="Enter grade"
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label  className="text-black" htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    placeholder="Enter section"
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label  className="text-black" htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter subject"
                    className="text-black rounded-xl"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="text-white bg-[#2C4B6E] w-[100px] rounded-xl hover:bg-[#1d3248]"
                    type="submit"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-[#1B2B3B] p-6 flex items-center justify-center text-white">
          <div className="space-y-4">
            <blockquote className="text-2xl font-light leading-relaxed">
              &ldquo;Creativity is
              <br />
              intelligence
              <br />
              having fun&rdquo;
            </blockquote>
            <footer className="text-sm text-gray-300">
              -Albert Einstein
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
