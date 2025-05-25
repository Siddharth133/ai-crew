import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
// import authService from '../../services/authService';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

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
    
    if (token) {
      // Validate password reset form
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
    } else {
      // Validate email form
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
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
      if (token) {
        // Reset password
        // await authService.resetPassword(token, formData.password);
        // Temporarily bypass password reset
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setIsPasswordReset(true);
        setTimeout(() => navigate('/login'), 3000);
      } else {
        // Request password reset
        // await authService.requestPasswordReset(formData.email);
        // Temporarily bypass password reset request
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setIsEmailSent(true);
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsLoading(false);
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

      {/* Forgot Password Card */}
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
            <h1 className="text-2xl font-bold text-white mb-2">
              {token ? 'Reset your password' : 'Forgot your password?'}
            </h1>
            <p className="text-purple-100">
              {token 
                ? 'Enter your new password below'
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {/* Success Messages */}
          {isEmailSent && (
            <div className="p-4 mb-6 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
              Password reset link has been sent to your email. Please check your inbox.
            </div>
          )}

          {isPasswordReset && (
            <div className="p-4 mb-6 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
              Your password has been reset successfully. Redirecting to login...
            </div>
          )}

          {/* Form */}
          {!isEmailSent && !isPasswordReset && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {errors.submit}
                </div>
              )}

              {token ? (
                // Password Reset Form
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-purple-100 mb-2">
                      New Password
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
                      placeholder="Enter your new password"
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
                      Confirm New Password
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
                      placeholder="Confirm your new password"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              ) : (
                // Email Form
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
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                  font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] 
                  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                  focus:ring-offset-2 focus:ring-offset-[#181C2A] disabled:opacity-50 disabled:cursor-not-allowed
                  relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                  group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                <span className="relative">
                  {isLoading 
                    ? (token ? 'Resetting password...' : 'Sending reset link...')
                    : (token ? 'Reset password' : 'Send reset link')}
                </span>
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Back to login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage; 