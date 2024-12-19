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
  username: string;
}

function RegisterForm() {
  const { registerUser } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (
    registerData: FormInputs
  ) => {
    setIsLoading(true);
    try {
      await registerUser(
        registerData.email,
        registerData.password,
        registerData.username
      );
      reset();
      toast.success("Registered successfully");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      if (error?.message) {
        toast.error(error.message, { position: "top-center" });
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
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-2 py-2 border rounded ${
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
              className={`w-full px-2 py-2 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-sm text-red-500 mt-1"
                aria-live="polite"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
                maxLength: {
                  value: 15,
                  message: "Username must be at most 15 characters long",
                },
                pattern: {
                  value: /^(?!.*[_.]{2})[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$/,
                  message:
                    "Username can only contain letters, numbers, underscores, and periods",
                },
              })}
              className={`w-full px-2 py-2 border rounded ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.username ? "true" : "false"}
              aria-describedby={errors.username ? "username-error" : undefined}
            />
            {errors.username && (
              <p
                id="username-error"
                className="text-sm text-red-500 mt-1"
                aria-live="polite"
              >
                {errors.username.message}
              </p>
            )}
          </div>

          <button
            className={`w-full py-2 rounded focus:outline focus:outline-2 focus:outline-green-700 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-buttonDark hover:bg-buttonDarkHover text-white"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <Link href={"/auth/login"}>
          <h3 className="font-semibold text-center mt-2 hover:underline">
            Already a user? Sign In <i>here</i>
          </h3>
        </Link>
      </section>
    </>
  );
}

export default RegisterForm;
