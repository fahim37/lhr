"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { verifyCode } from "@/app/actions/auth";

export default function Verifyform() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasteData.length === 6) {
      const otpArray = pasteData.split("");
      setOtp(otpArray);
      otpArray.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = digit;
        }
      });
      inputRefs.current[5]?.focus();
    }
    e.preventDefault(); // Prevent default paste behavior
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    const result = await verifyCode(otpValue);
    setLoading(false);

    if (result.success) {
      toast.success("OTP verified successfully");
      router.replace("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex w-1/2 bg-[#0a1155] text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="border-[7px] border-[#212767] w-[592px] h-[455px] rounded-[400px] absolute lg:-top-[200px] xl:-bottom-[300px] -left-[500px] rotate-[-45deg]"></div>
        <div>
          <Link href="/">
            <Image
              src="/assets/lhasis-logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-[60px] h-[83px] mb-[101px] ml-[150px]"
            />
          </Link>
          <h1 className="mt-4 text-[74px] w-[485px] !text-bold mx-auto text-[#f3f3f3]">
            Verify your identity
          </h1>
          <p className="text-[19px] text-center text-[#F7E39F] font-semibold mt-[21px] ml-[-30px]">
            Monitor your property with ease and peace of mind.
          </p>
        </div>
        <div className="border-[7px] border-[white] w-[592px] h-[455px] rounded-[400px] absolute lg:-bottom-[200px] xl:-bottom-[300px] -right-[320px]"></div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
          <p className="text-gray-500 mb-6">
            We have sent a code to your email.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 mb-6 justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Didn&apos;t receive code? Resend
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
