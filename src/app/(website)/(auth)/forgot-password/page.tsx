"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordForm from "@/components/forgot-password-form";
import VerifyOtpForm from "@/components/verify-otp-form";
import ResetPasswordForm from "@/components/reset-password-form";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Toaster } from "sonner";
import Image from "next/image";

export default function PasswordRecoveryPage() {
  const router = useRouter();
  const [step, setStep] = useState<"forgot" | "verify" | "reset" | "success">(
    "forgot"
  );
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Image
            src="/assets/lhasis-logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </div>

        {step === "forgot" && (
          <ForgotPasswordForm
            onSubmit={(email) => {
              setEmail(email);
              setStep("verify");
            }}
          />
        )}

        {step === "verify" && (
          <VerifyOtpForm email={email} onSubmit={() => setStep("reset")} />
        )}

        {step === "reset" && (
          <ResetPasswordForm
            onSubmit={() => {
              setStep("success");
            }}
          />
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border border-green-100 bg-green-50 p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-green-700">
              Password Reset Successful
            </h2>
            <p className="text-green-600">
              Your password has been reset successfully.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="mt-4 w-full bg-green-600 hover:bg-green-700"
            >
              Go to Login
            </Button>
          </div>
        )}
        <Toaster position="top-center" />
      </div>
    </div>
  );
}
