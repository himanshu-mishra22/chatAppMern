import React from 'react';
import logo from '../assets/wind.svg';
import {useAuth}   from '../auth/useAuth.js';
import { Link } from "react-router";
import { toast } from 'react-hot-toast'

function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { signUp, isSigningUp } = useAuth();

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
        toast.error("All Fields are required!");
      return false;
    }
    if(!formData.password.length > 6){
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData);
    
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
    <div className='flex items-center justify-center min-h-screen'>
      <div className='border flex flex-col gap-5 m-10 p-8 w-full max-w-md rounded dark:bg-gray-900'>
        <h1 className='text-2xl font-semibold text-center'>Sign Up</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='form-control'>
            <label className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300'>Full Name</label>
            <input
              type='text'
              id='fullName'
              className='w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              name='fullName'
              placeholder='John Doe'
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className='form-control'>
            <label className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='you@mail.com'
              className='w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className='form-control'>
            <label className='block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='********'
                className='w-full px-4 py-2 rounded-md border dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-3 flex items-center text-gray-500'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className='flex flex-col justify-center items-center'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'
              disabled={isSigningUp}
            >
              {isSigningUp ? ('Signing Up...') : ('Signup')}
            </button>
           
          </div>
        </form>
        <span>
              <i>Already have an account?</i>
              <Link to="/login" className='mx-2 text-blue-500 hover:underline'>Login</Link>
            </span>
      </div>
    </div>
  );
}

export default SignupPage;
