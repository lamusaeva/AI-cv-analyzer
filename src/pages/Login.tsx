import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { loginWithEmail, loginWithGoogle } = useAuth();

  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await loginWithEmail(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setAuthError("E-poçt və ya şifrə yanlışdır");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch {
      setAuthError("Google ilə giriş uğursuz oldu");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-soft to-purple-deep flex flex-col items-center justify-center px-6">
      <div className="bg-white/20 rounded-2xl p-3 mb-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      </div>

      <h1 className="text-white text-2xl font-semibold mb-1">CV Analyzer</h1>
      <p className="text-purple-light text-sm mb-8">
        AI ilə CV-ni optimallaşdır
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="E-poçt ünvanın"
            className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder:text-purple-light outline-none focus:border-white/60 transition-colors"
            {...register("email", {
              required: "E-poçt tələb olunur",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Düzgün e-poçt daxil et",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-300 text-xs px-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Şifrə"
            className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder:text-purple-light outline-none focus:border-white/60 transition-colors"
            {...register("password", {
              required: "Şifrə tələb olunur",
              minLength: {
                value: 6,
                message: "Şifrə minimum 6 simvol olmalıdır",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-300 text-xs px-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {authError && (
          <p className="text-red-300 text-xs text-center">{authError}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-purple-mid font-semibold py-3 rounded-xl text-sm mt-1 disabled:opacity-60 transition-opacity"
        >
          {isSubmitting ? "Yüklənir..." : "Daxil ol"}
        </button>
      </form>

      <div className="flex items-center gap-3 w-full max-w-sm my-5">
        <div className="flex-1 h-px bg-white/20" />
        <span className="text-purple-light text-xs">və ya</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full max-w-sm bg-white/10 border border-white/20 rounded-xl py-3 text-sm text-white flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="white"
            opacity=".9"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="white"
            opacity=".8"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="white"
            opacity=".7"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="white"
            opacity=".9"
          />
        </svg>
        Google ilə daxil ol
      </button>

      <p className="text-purple-light text-xs mt-6">
        Hesabın yoxdur?{" "}
        <span className="text-white font-semibold underline cursor-pointer">
          Qeydiyyat
        </span>
      </p>
    </div>
  );
}
