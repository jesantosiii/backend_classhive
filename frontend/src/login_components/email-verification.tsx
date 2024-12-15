import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import {useLocation, useNavigate} from "react-router-dom"; // Import to get email from navigation state
import axios from "axios"; // Axios for API calls
import { Button } from "@/components/ui/button";
import ClassHive from "../assets/Logo/ClassHive.png";
import honey3 from "../assets/Logo/honey 3.png";
import honey4 from "../assets/Logo/honey 4.png";
import EmailLogo from "../assets/Email.png";

export default function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "example@example.com"; // Retrieve email or fallback to placeholder
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newCode = [...verificationCode];
      pastedData.split("").forEach((char, index) => {
        if (index < 6) newCode[index] = char;
      });
      setVerificationCode(newCode);

      const nextEmptyIndex = newCode.findIndex((char) => !char);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setSuccessMessage(null);
    try {
      await axios.post("http://127.0.0.1:8000/accounts/register/", { email });
      setSuccessMessage("A new verification code has been sent to your email.");
    } catch {
      setError("Failed to resend the verification code. Please try again.");
    }
  };

  const handleConfirm = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/accounts/confirm-email/", {
        email: email,
        confirmation_code: code,
      });

      if (response.status === 200) {
        setSuccessMessage("Email verified successfully!");
        navigate("/home");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Failed to verify email.");
      } else {
        setError("Network error. Please try again.");
      }
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

      {/* Right side with verification form */}
      <div className="bg-gradient-to-b from-[#3b5a72] to-[#0a192f] p-8 flex flex-col justify-center rounded-tl-[40px]">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center space-y-4">
            <img src={EmailLogo} alt="Email verification" className="mx-auto w-full h-full h-60" />
            <h2 className="text-2xl font-bold text-white">Email Verification</h2>
            <p className="text-gray-300">
              You entered <span className="font-medium">{email}</span> as your email. A 6-digit code has been sent for verification. Please enter it below.
            </p>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold rounded-lg border-2 border-gray-400
                           bg-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                           focus:outline-none transition-all"
                  aria-label={`Digit ${index + 1} of verification code`}
                />
              ))}
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleResendCode}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Didn't get the code? Resend Code
              </button>

              <Button
                onClick={handleConfirm}
                className="w-48 bg-sky-900 hover:bg-[#385c74] text-white py-2 px-4 rounded-2xl
                        transition-colors font-medium"
              >
                Confirm Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
