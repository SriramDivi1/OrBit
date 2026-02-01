import React, { useState } from 'react';
import { Button } from '../ui/design-system';
import { Input } from '../ui/form-elements';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { toast } from "sonner";
import logo from '../../assets/logo.png';
import type { User } from './Login';

// Google Icon Component
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

interface AuthProps {
  onSignup: (user: User) => void;
  onNavigateToLogin: () => void;
}

export function Signup({ onSignup, onNavigateToLogin }: AuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!");
      onSignup({
        name: `${firstName} ${lastName}`.trim(),
        email,
        avatar: '',
      });
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setIsGoogleLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      setIsGoogleLoading(false);
      toast.success("Signed up with Google!");
      onSignup({
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: '',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFAF5] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="OrBit Logo" className="w-16 h-16 rounded-2xl mx-auto mb-4 shadow-lg shadow-orange-900/20 transform -rotate-3" />
          <h1 className="text-2xl font-bold text-gray-900">Join OrBit</h1>
          <p className="text-gray-500 mt-2">Start managing your financial orbit</p>
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-3 h-11 px-4 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <>
              <GoogleIcon className="w-5 h-5" />
              Sign up with Google
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or sign up with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input id="first-name" label="First Name" placeholder="John" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <Input id="last-name" label="Last Name" placeholder="Doe" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <Input 
            id="email" 
            label="Email Address" 
            type="email" 
            placeholder="name@company.com" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input 
            id="password" 
            label="Password" 
            type="password" 
            placeholder="Create a password" 
            required 
          />

          <div className="flex items-start gap-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="mt-1 rounded border-gray-300 text-[#FF971D] focus:ring-[#FF971D]" 
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I agree to the <a href="#" className="text-[#FF971D] hover:underline">Terms of Service</a> and <a href="#" className="text-[#FF971D] hover:underline">Privacy Policy</a>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full justify-center h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button 
            onClick={onNavigateToLogin}
            className="font-medium text-[#FF971D] hover:text-[#E68200]"
          >
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
}
