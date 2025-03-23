import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';
import LoginDesign from '../assets/illustration.svg';

function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const { login, isLogginIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
   
    <div className="flex bg-[url('assets/bgLogin.jpg')] bg-cover bg-center items-center justify-center min-h-screen bg-base-200">
      <div className='flex flex-col md:flex-row items-center bg-base-100 shadow-xl rounded-lg p-8'>
        {/* Image Section */}
        <div className='hidden md:block w-1/2'>
          <img 
            src={LoginDesign} 
            alt='Login Illustration' 
            className='w-full h-full object-cover' 
          />
        </div>
        
        {/* Login Form Section */}
        <div className='w-full md:w-1/2 p-6'>
          <h1 className='text-4xl font-semibold text-center text-primary'>Welcome back</h1>
          <p className='text-center text-gray-500 mt-2'>Start your website in seconds. Don’t have an account? 
            <Link to='/signup' className='text-primary hover:underline'>Sign up</Link>
          </p>

          <form onSubmit={handleSubmit} className='space-y-6 mt-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='name@company.com'
                className='input input-bordered w-full'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='********'
                  className='input input-bordered w-full'
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

            <button type='submit' className='btn btn-primary h-14 w-full' disabled={isLogginIn}>
              {isLogginIn ? 'Logging In...' : 'Sign in to your account'}
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
  
}

export default LoginPage;
