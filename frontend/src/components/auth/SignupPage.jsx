import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaApple } from 'react-icons/fa';
import authService from '../../services/authService';

// Load Google OAuth script
const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://accounts.google.com/gsi/client?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    // Initialize Google Sign-In
    loadGoogleScript().then(() => {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
      });
    }).catch(error => {
      console.error('Failed to load Google Sign-In:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to load Google Sign-In. Please try again later.'
      }));
    });

    // Check if user is already logged in
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      errors: {
        minLength: !hasMinLength,
        upperCase: !hasUpperCase,
        lowerCase: !hasLowerCase,
        number: !hasNumber,
        specialChar: !hasSpecialChar,
      }
    };
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password does not meet requirements';
        newErrors.passwordRequirements = passwordValidation.errors;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await authService.signup(formData.name, formData.email, formData.password);
      await authService.login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (response) => {
    setIsGoogleLoading(true);
    try {
      await authService.googleAuth(response.credential);
      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleButtonClick = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      setErrors(prev => ({
        ...prev,
        submit: 'Google Sign-In is not available. Please try again later.'
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#181C2A] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 
                bg-clip-text text-transparent">
                AI-CREW
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-purple-100">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.submit && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {errors.submit}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-purple-100 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} 
                    rounded-lg text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 
                    ${errors.name ? 'focus:ring-red-500/50' : 'focus:ring-purple-500/50'} 
                    focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} 
                    rounded-lg text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 
                    ${errors.email ? 'focus:ring-red-500/50' : 'focus:ring-purple-500/50'} 
                    focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-purple-100 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} 
                    rounded-lg text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 
                    ${errors.password ? 'focus:ring-red-500/50' : 'focus:ring-purple-500/50'} 
                    focus:border-transparent transition-all duration-200`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-red-400">{errors.password}</p>
                    {errors.passwordRequirements && (
                      <ul className="text-xs text-purple-200/60 space-y-1">
                        <li className={errors.passwordRequirements.minLength ? 'text-red-400' : 'text-green-400'}>
                          • At least 8 characters
                        </li>
                        <li className={errors.passwordRequirements.upperCase ? 'text-red-400' : 'text-green-400'}>
                          • At least one uppercase letter
                        </li>
                        <li className={errors.passwordRequirements.lowerCase ? 'text-red-400' : 'text-green-400'}>
                          • At least one lowercase letter
                        </li>
                        <li className={errors.passwordRequirements.number ? 'text-red-400' : 'text-green-400'}>
                          • At least one number
                        </li>
                        <li className={errors.passwordRequirements.specialChar ? 'text-red-400' : 'text-green-400'}>
                          • At least one special character
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-100 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/5 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'} 
                    rounded-lg text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 
                    ${errors.confirmPassword ? 'focus:ring-red-500/50' : 'focus:ring-purple-500/50'} 
                    focus:border-transparent transition-all duration-200`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                focus:ring-offset-2 focus:ring-offset-[#181C2A] disabled:opacity-50 disabled:cursor-not-allowed
                relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
              <span className="relative">
                {isLoading ? 'Creating account...' : 'Create account'}
              </span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#181C2A] text-purple-100">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleButtonClick}
                disabled={isLoading || isGoogleLoading}
                className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 
                  rounded-lg text-white hover:bg-white/10 transition-all duration-200 
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 
                  focus:ring-offset-[#181C2A] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaGoogle className="w-5 h-5 mr-2" />
                {isGoogleLoading ? 'Signing up...' : 'Google'}
              </button>
              <button
                type="button"
                disabled={isLoading || isGoogleLoading}
                className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 
                  rounded-lg text-white hover:bg-white/10 transition-all duration-200 
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 
                  focus:ring-offset-[#181C2A] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaApple className="w-5 h-5 mr-2" />
                Apple
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-xs text-purple-200/60">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage; 