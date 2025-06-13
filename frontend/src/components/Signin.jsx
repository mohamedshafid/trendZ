import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotebookPen, Mail, Lock } from "lucide-react";
import { useAppContext } from "../contexts/AppContext";

// 🔐 Zod Validation Schema
const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 🧠 React Hook Form Setup
const Signin = () => {
  const { toggleFormType } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = (data) => {
    console.log("Login submitted:", data);
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <NotebookPen size={42} className="text-primary mb-2" />
          <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to continue exploring trendZ.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative">
              <Mail
                className="absolute top-2.5 left-3 text-gray-400"
                size={18}
              />
              <input
                type="email"
                id="email"
                {...register("email")}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 font-Rubik shadow-sm focus:border-primary focus:ring-primary focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <Lock
                className="absolute top-2.5 left-3 text-gray-400"
                size={18}
              />
              <input
                type="password"
                id="password"
                {...register("password")}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 font-Rubik shadow-sm focus:border-primary focus:ring-primary focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-primary/90 transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <p
            className="text-primary font-medium hover:underline cursor-pointer"
            onClick={toggleFormType}
          >
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
