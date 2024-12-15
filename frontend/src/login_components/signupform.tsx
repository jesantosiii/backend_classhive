import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ClassHive from "../assets/Logo/ClassHive.png";
import honey3 from "../assets/Logo/honey 3.png";
import honey4 from "../assets/Logo/honey 4.png";
import Input from "../basic_components/InputDefault";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpPage() {
  const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const registerUser = async () => {
  setLoading(true);
  setError(null);
  setSuccessMessage("");

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/accounts/register/",
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        middle_name: formData.middleName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        gender: formData.gender,
        role: formData.role,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      setSuccessMessage(
        "User registered successfully! Please check your email for the confirmation code."
      );
      return true; // Registration was successful
    } else {
      setError("An unexpected error occurred. Please try again.");
      return false; // Registration failed
    }
  } catch (err) {
    if (err.response && err.response.data) {
      setError(err.response.data.message || "Failed to register user. Please try again.");
    } else {
      setError("Network error. Please check your connection.");
    }
    return false; // Registration failed
  } finally {
    setLoading(false);
  }
};


    return { registerUser, loading, error, successMessage };
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "Male", // Default value
    role: "Student", // Default value
  });
  const navigate = useNavigate();

  const { registerUser, loading, error, successMessage } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSignUpClick = async () => {
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  // Call registerUser and check success
  const registrationSuccess = await registerUser();

  // Only navigate if registration was successful
  if (registrationSuccess) {
    navigate("/verification", { state: { email: formData.email } });
  }
};




  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0a192f]">
      {/* Left side with heading and decorative elements */}
      <div className="relative p-8 flex items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-[200px] opacity-20">
          <img src={honey4} alt="" className="w-full h-full object-contain" />
        </div>

        <div className="relative z-10 text-white max-w-xl -translate-y-8">
          <div className="space-y-1">
            <h1 className="text-5xl font-bold leading-tight absolute">Create Your</h1>
            <span className="inline-block">
              <img src={ClassHive} alt="ClassHive" className="h-36 justify-start" />
            </span>
            <h1 className="text-5xl font-bold leading-tight">
              account and Unlock
              <br />
              Learning Fun!
            </h1>
          </div>
        </div>

        <div className="absolute bottom-0 left-[450px] w-[350px] opacity-20">
          <img src={honey3} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Right side with form */}
      <div className="bg-gradient-to-b from-[#3b5a72] to-[#0a192f] p-8 flex flex-col justify-center rounded-tl-[40px]">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white tracking-wider">SIGN UP</h2>
            <p className="text-gray-400 mt-2">Enter your account details</p>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="pr-16"
              />
              <Input
                id="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="pr-8"
              />
            </div>

            <Input
              id="middleName"
              placeholder="Middle name"
              value={formData.middleName}
              onChange={handleChange}
              className="pr-56"
            />

            <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex space-x-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="Male" className="border-gray-600 text-white" />
                <Label htmlFor="Male" className="text-white font-normal">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="Female" className="border-gray-600 text-white" />
                <Label htmlFor="Female" className="text-white font-normal">Female</Label>
              </div>
            </RadioGroup>

            <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="flex space-x-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Student" id="Student" className="border-gray-600 text-white" />
                <Label htmlFor="Student" className="text-white font-normal">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Teacher" id="Teacher" className="border-gray-600 text-white" />
                <Label htmlFor="Teacher" className="text-white font-normal">Teacher</Label>
              </div>
            </RadioGroup>

            <Input
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              maxLength={15}
              className="pr-56"
            />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="pr-56"
            />

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                maxLength={20}
                className="pr-56"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                maxLength={20}
                className="pr-56"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              onClick={handleSignUpClick}
              className="w-full bg-[#4B5563] hover:bg-[#374151] text-white rounded-xl h-12 mt-6"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
