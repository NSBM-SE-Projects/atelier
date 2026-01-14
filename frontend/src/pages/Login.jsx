import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import loginImage from '../../images/login_page.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinueWithShop = () => {
    // Handle continue with shop logic
    console.log('Continue with shop');
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle email continue logic
    console.log('Continue with email:', email);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-fixed bg-cover" style={{ backgroundImage: `url(${loginImage})`, backgroundPosition: 'center top' }}>
      {/* White overlay gradient from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      {/* Content */}
      <div className="relative flex items-center justify-start w-full h-full overflow-hidden">
        <div className="w-full max-w-md px-12 overflow-hidden md:px-20">
          {/* Heading */}
          <h1 className="mb-4 text-5xl font-bold text-gray-900 md:text-6xl">
            Sign In
          </h1>
          <p className="mb-12 text-xl text-gray-700">
            Sign in or create an account
          </p>

          {/* Continue with Shop Button */}
          <Button
            onClick={handleContinueWithShop}
            className="w-full bg-[#8B4555] hover:bg-[#6B3545] text-white text-lg py-6 rounded-2xl mb-8 font-semibold"
          >
            Continue with shop
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="font-medium text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleContinue} className="w-full space-y-6">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 transition-colors bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-lg font-semibold text-white bg-gray-800 rounded-2xl hover:bg-gray-900"
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-12 text-sm text-center text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-gray-900 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
