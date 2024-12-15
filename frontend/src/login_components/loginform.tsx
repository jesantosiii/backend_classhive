import React, { useState } from "react";
import { Eye, EyeOff, Facebook } from "lucide-react";
import ClassHive from "../assets/Logo/ClassHive.png";
import honey1 from "../assets/Logo/honey 1.png";
import honey2 from "../assets/Logo/honey 2.png";
import Input from "../basic_components/InputDefault";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    
    <div className="min-h-screen w-full flex bg-[#0a192f]">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-b from-[#0a192f] to-[#1a3a4a] rounded-br-[40px]">
        <div className="max-w-md w-full mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-white">Login</h1>
          <form className="space-y-6">
            <div className="space-y-2">
              <Input
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pr-52"
              />
            </div>
            <div className="space-y-2 relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-52"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="text-right">
              <button
                type="button"
                className="text-white/50 hover:text-white p-0 h-auto font-normal"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#4a6c80] hover:bg-[#5d7d91] text-white rounded-md"
            >
              Login
            </button>
          </form>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              className="p-2 rounded-full border border-white/20 text-white hover:text-white hover:bg-white/10"
            >
              <Facebook className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="p-2 rounded-full border border-white/20 text-white hover:text-white hover:bg-white/10"
            >
              <img
                src="https://via.placeholder.com/20"
                alt="Google"
                className="w-5 h-5 opacity-75"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Welcome Message */}
      <div className="hidden lg:flex flex-grow bg-[#0a192f] relative overflow-hidden items-center justify-center">
        {/* Main Content */}
        <div className="relative z-10 text-white max-w-xl -translate-y-1">
          <div className="space-y-1">
            <h1 className="text-5xl font-bold leading-tight absolute">
              Welcome to
            </h1>
            <span className="inline-block">
              <img
                src={ClassHive}
                alt="ClassHive"
                className="h-36 justify-start"
              />
            </span>
            <h1 className="text-lg leading-tight">
              Where Learning and Fun Buzz Together!
            </h1>
          </div>
        </div>

        {/* Hexagonal pattern background - left */}
        <div className="absolute top-0 right-0 w-[275px] opacity-20">
          <img
            src={honey1}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hexagonal pattern background - right */}
        <div className="absolute bottom-0 right-[550px] w-[350px] opacity-20">
          <img
            src={honey2}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
