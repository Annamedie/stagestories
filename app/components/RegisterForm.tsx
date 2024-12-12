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
      if (error?.code) {
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
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
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
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full px-2 py-2 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
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
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <button
            className={`w-full py-2 rounded ${
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
          <div className="text-center mt-2">
            <h3 className="font-semibold">
              Already a user? Sign In <i>here</i>
            </h3>
          </div>
        </Link>
      </div>
    </>
  );
}

export default RegisterForm;
