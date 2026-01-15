import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import useAuthStore from '@/store/authStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [backgroundPos, setBackgroundPos] = useState('60% 100px');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBackgroundPos('center 50px'); // Mobile
      } else if (window.innerWidth < 1368) {
        setBackgroundPos('center 50px'); // Desktop
      }
      else {
        setBackgroundPos('100px 100px'); // Desktop
      }
    };

    // Set initial position
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContinueWithShop = () => {
    // Handle continue with shop logic
    navigate('/shop');
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      // Update auth store
      useAuthStore.getState().login(response.data);

      // Redirect based on user type
      if (response.data.userType === 'STAFF') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Extract error message from response (check multiple possible locations)
      let errorMessage = 'Login failed. Please check your credentials.';

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.statusText) {
        errorMessage = err.response.statusText;
      }

      console.error('Login error:', err);
      setError(errorMessage);
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
            Sign In
          </h1>
          <p className="mb-12 text-xl text-gray-700 font-serif italic">
            Sign in or create an account
          </p>

          {/* Continue with Shop Button */}
          <Button
            onClick={handleContinueWithShop}
            className="w-full bg-red-800 hover:bg-red-900 text-white text-lg py-6 rounded-3xl mb-8 font-semibold hover:border-transparent"
          >
            Continue Shopping
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="font-medium text-gray-600 font-serif italic">or</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleContinue} className="w-full space-y-4">
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

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 placeholder:font-serif transition-colors bg-gray-200 border-2 border-gray-300 rounded-3xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg font-semibold text-white bg-gray-950 rounded-3xl hover:bg-gray-900 disabled:opacity-50 hover:border-transparent"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-9 text-sm text-center text-gray-600 font-serif">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-gray-900 hover:underline itali hover:text-gray-700 italic">
                Create one!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
