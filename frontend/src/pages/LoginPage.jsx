import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router';

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
    <div className='flex items-center justify-center min-h-screen bg-base-200'>
      <div className='card w-full max-w-md shadow-xl bg-base-100 p-8'>
        <h1 className='text-2xl font-semibold text-center text-primary'>Log In</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-base-content'>Email</span>
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='you@mail.com'
              className='input input-bordered w-full'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-base-content'>Password</span>
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

          {/* Submit Button */}
          <div className='form-control'>
            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isLogginIn}
            >
              {isLogginIn ? 'Logging In...' : 'Log In'}
            </button>
          </div>
        </form>

        <span className='text-center mt-4'>
          <i>New here?</i>
          <Link to='/signup' className='ml-2 text-primary hover:underline'>Sign Up</Link>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
