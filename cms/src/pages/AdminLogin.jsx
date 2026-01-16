import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setSuccess(false);

    const result = await login(username, password);
    if (result.success) {
      setSuccess(true);
      // Show success message for 1.5 seconds before redirecting
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col">
        {/* Upper Half - Form Centered */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
          <div className="w-full max-w-sm">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-gray-500 text-base">
                Admin access only
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-700 text-sm font-medium">
                  Login successful! Redirecting to dashboard...
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && !success && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">
                  {error === 'Login failed. Please try again.'
                    ? 'Invalid username or password. Please try again.'
                    : error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  disabled={isLoading || success}
                  className={error && !success ? 'border-red-300' : ''}
                />
              </div>

              {/* Password Field */}
              <div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  disabled={isLoading || success}
                  className={error && !success ? 'border-red-300' : ''}
                />
              </div>

              {/* Continue Button (Dark) */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                className={`w-full ${success ? 'bg-green-600 hover:bg-green-600' : ''}`}
                disabled={isLoading || success}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Signing in...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Success!
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>

          </div>
        </div>

        {/* Lower Half - Empty (for balance) */}
        <div className="flex-1"></div>
      </div>

      {/* Right Side - Fashion Image (No Cropping) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
        <img
          src="/login-bg.webp"
          alt="Fashion"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
