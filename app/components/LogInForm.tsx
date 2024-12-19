"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/Authcontext";

interface FormInputs {
  email: string;
  password: string;
}

function getFriendlyErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    "auth/user-not-found": "No account found with this email.",
    "auth/invalid-credential": "Incorrect password. Please try again.",
    "auth/invalid-email": "Invalid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };

  return (
    errorMessages[errorCode] ||
    "An unexpected error occurred. Please try again."
  );
}

function LogInForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (loginData: FormInputs) => {
    setIsLoading(true);
    try {
      await login(loginData.email, loginData.password);
      reset();
      toast.success("Logged in successfully");

      router.push("/");
    } catch (error: any) {
      if (error?.code) {
        const friendlyMessage = getFriendlyErrorMessage(error.code);
        toast.error(friendlyMessage, { position: "top-center" });
      } else {
        toast.error("An unknown error occurred", { position: "top-center" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <section className="max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                aria-live="polite"
                className="text-sm text-red-500 mt-1"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-4 py-2 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                aria-live="polite"
                className="text-sm text-red-500 mt-1"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className="w-full bg-buttonDark text-white py-2 rounded hover:bg-buttonDarkHover focus:outline focus:outline-2 focus:outline-green-700"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <Link href={"/auth/register"}>
          <h3 className=" font-semibold flex justify-center mt-2">
            New user? Register <i>here</i>
          </h3>
        </Link>
      </section>
    </>
  );
}

export default LogInForm;
