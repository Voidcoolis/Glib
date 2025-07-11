import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  // form data to store the full name, email and password
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
     if (!formData.fullName.trim()) return toast.error("Vollständiger Name ist erforderlich");
    if (!formData.email.trim()) return toast.error("E-Mail ist erforderlich");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Ungültiges E-Mail-Format");
    if (!formData.password) return toast.error("");
    if (formData.password.length < 6) return toast.error("Das Passwort muss mindestens 6 Zeichen lang sein.");

    return true; // Form is valid
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevents the default form submission behavior

    const success = validateForm(); // Calls the validateForm function to check if the form data is valid. If not then error toast

    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side of the form(chat)*/}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" /> {/* Icon */}
              </div>
              <h1 className="text-2xl font-bold mt-2">Konto erstellen</h1>
              <p className="text-base-content/60">
                Starten Sie mit Ihrem kostenlosen Konto
              </p>
            </div>
          </div>
          {/* Sign Up Form for the full name */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Max Mustermann"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Sign Up Form for the email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">E-Mail</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="max.mustermann@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Sign Up Form for the password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Passwort</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Konto erstellen"
              )}
            </button>
          </form>

          {/* Link to Login Page */}
          <div className="text-center">
            <p className="text-base-content/60">
              Sie haben bereits ein Konto?{" "}
              <Link to="/login" className="link link-primary">
                Anmelden
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side of the form (image or illustration) */}
      <AuthImagePattern
        title="Werden Sie Mitglied unserer Gemeinschaft"
        subtitle="Verbinden Sie sich mit Freunden, teilen Sie Momente und bleiben Sie in Kontakt mit Ihren Lieben."
      />
    </div>
  );
};

export default SignUpPage;
