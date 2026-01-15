import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import loginImage from '../../images/login_page.jpg';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle signup logic
    console.log('Sign up with:', formData);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-fixed bg-cover" style={{ backgroundImage: `url(${loginImage})`, backgroundPosition: 'center top' }}>
      {/* White overlay gradient from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

      {/* Content */}
      <div className="relative flex items-center justify-start w-full h-full overflow-hidden">
        <div className="w-full max-w-lg px-12 py-12 overflow-auto md:px-20">
          {/* Heading */}
          <h1 className="mb-4 text-5xl font-bold text-gray-900 md:text-6xl">
            Create Account
          </h1>
          <p className="mb-12 text-xl text-gray-700">
            Join us to start shopping
          </p>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* First Name Input */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 transition-colors bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Last Name Input */}
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 transition-colors bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 text-base placeholder-gray-600 transition-colors bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 pr-14 text-base placeholder-gray-600 transition-colors bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded text-gray-600 hover:text-gray-900 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 pr-14 text-base placeholder-gray-600 transition-colors bg-white border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded text-gray-600 hover:text-gray-900 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8B4555] hover:bg-[#6B3545] text-white text-lg py-6 rounded-2xl mb-8 font-semibold"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-sm text-center text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-gray-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
