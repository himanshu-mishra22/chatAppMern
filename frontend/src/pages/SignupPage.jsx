import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import SignupDesign from '../assets/bgSignup.jpg';

function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuth();

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("All fields are required!");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const sign = await signUp(formData);
      if (sign) {
        toast.success("Signup successful!");
      }
    } catch (error) {
      toast.error("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex bg-[url('assets/bgSignup.jpg')] bg-cover bg-center items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@mail.com"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="input input-bordered w-full pr-12"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing Up..." : "Signup"}
            </button>
          </div>
        </form>

        <span className="text-center mt-4 block">
          <i>Already have an account?</i>
          <Link to="/login" className="ml-2 text-primary hover:underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default SignupPage;
