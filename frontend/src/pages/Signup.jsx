import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import useAuthStore from '@/store/authStore';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backgroundPos, setBackgroundPos] = useState('60% 100px');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBackgroundPos('center 50px');
      } else if (window.innerWidth < 1368) {
        setBackgroundPos('center 50px');
      } else {
        setBackgroundPos('100px 100px');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password && password !== newConfirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      });

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      // Update auth store (auto-login)
      useAuthStore.getState().login(response.data);

      // Redirect to home
      navigate('/');
    } catch (err) {
      // Extract error message from response (check multiple possible locations)
      let errorMessage = 'Registration failed. Please try again.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.statusText) {
        errorMessage = err.response.statusText;
      }

      setError(errorMessage);
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)] bg-fixed bg-cover" style={{ backgroundImage: `url(https://res.cloudinary.com/dclidhsza/image/upload/v1768511648/login_page_zbliah.jpg)`, backgroundPosition: backgroundPos }}>
      {/* White overlay gradient from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      {/* Content */}
      <div className="relative flex items-center justify-start w-full min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-lg px-12 md:px-20">
          {/* Heading */}
          <h1 className="mb-4 text-5xl font-black italic font-serif text-gray-900 md:text-6xl">
            Sign Up
          </h1>
          <p className="mb-12 text-xl text-gray-700 font-serif italic">
            Create a new account to get started
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="w-full space-y-4">
            {/* Username Input */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 placeholder:font-serif transition-colors bg-gray-200 border-2 border-gray-300 rounded-3xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 placeholder:font-serif transition-colors bg-gray-200 border-2 border-gray-300 rounded-3xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 placeholder:font-serif transition-colors bg-gray-200 border-2 border-gray-300 rounded-3xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className={`w-full px-6 py-4 text-base placeholder-gray-600 placeholder:font-serif transition-colors bg-gray-200 border-2 rounded-3xl focus:outline-none ${
                  passwordError
                    ? 'border-red-400 focus:border-red-600'
                    : 'border-gray-300 focus:border-gray-600'
                }`}
              />
            </div>

            {/* Password Error */}
            {passwordError && (
              <div className="p-2 text-sm text-red-700 bg-red-50 rounded">
                {passwordError}
              </div>
            )}

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading || passwordError}
              className="w-full py-6 text-lg font-semibold text-white bg-gray-950 rounded-3xl hover:bg-gray-900 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-9 text-sm text-center text-gray-600 font-serif">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-gray-900 hover:underline italic hover:text-gray-700">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
