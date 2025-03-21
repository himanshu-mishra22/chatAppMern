import React from 'react'
import { useAuth } from '../auth/useAuth';
import { Link } from 'react-router';

function LoginPage() {
  const [showPassword,setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const {login, isLogginIn} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
    <div className='border flex flex-col gap-5 p-8 w-full max-w-md rounded dark:bg-gray-900'>
      <h1 className='text-2xl font-semibold text-center'>Log In</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>

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
            disabled={isLogginIn}
          >
            {isLogginIn ? ('Loggin In...') : ('log In')}
          </button>
         
        </div>
      </form>
      <span>
            <i>New here??</i>
            <Link to="/signup" className='mx-2 text-blue-500 hover:underline'>Sign Up</Link>
          </span>
    </div>
  </div>
  )
}

export default LoginPage