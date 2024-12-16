import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Facebook } from "lucide-react";
import ClassHive from "../assets/Logo/ClassHive.png";
import honey1 from "../assets/Logo/honey 1.png";
import honey2 from "../assets/Logo/honey 2.png";
import Input from "../basic_components/InputDefault";
import { useNavigate } from "react-router-dom";

const config = {
  TOKEN_STORAGE_KEY: 'authTokens',
  USER_STORAGE_KEY: 'authUser',
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState(""); // Use identifier (username/email)
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

   const handleSignupClick = () => {
    navigate(`/signup`);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear error messages
    try {
      const response = await axios.post("http://127.0.0.1:8000/accounts/login/", {
        identifier,
        password,
      });

      // Parse tokens and user from the backend response
      const { tokens, user } = response.data; // Destructure tokens and user
      const { role } = user; // Get the role (Teacher or Student)

      // Save tokens and user to localStorage
      localStorage.setItem(config.TOKEN_STORAGE_KEY, JSON.stringify(tokens));
      localStorage.setItem(config.USER_STORAGE_KEY, JSON.stringify(user));

      alert("Login successful!");
      console.log(response.data);

      // Navigate based on the user's role
      if (role === "Student") {
        navigate("/classroom");
      } else if (role === "Teacher") {
        navigate("/teacher/WC");
      } else {
        setErrorMessage("Invalid role. Please contact support.");
      }
    } catch (error) {
      console.error(error.response?.data);
      setErrorMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen w-full flex bg-[#0a192f]">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-b from-[#0a192f] to-[#1a3a4a] rounded-br-[40px]">
        <div className="max-w-md w-full mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-white">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <div className="space-y-2">
              <Input
                  id="identifier"
                  placeholder="Username or Email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="pr-52 "
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
                    <EyeOff className="h-5 w-5"/>
                ) : (
                    <Eye className="h-5 w-5"/>
                )}
              </button>
            </div>
            <div className="text-right">
              <button
                  type="button"
                  className="text-white/50 hover:text-white p-0 h-auto font-normal"
                  onClick={handleSignupClick}
              >
                Don't Have an account?
              </button>

            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-[#4a6c80] hover:bg-[#5d7d91] text-white rounded-md"
                disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

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
