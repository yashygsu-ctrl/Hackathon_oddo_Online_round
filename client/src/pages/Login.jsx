import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Login = () => {
  const [role, setRole] = useState('Dispatcher');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const login = useStore(state => state.login);
  const globalError = useStore(state => state.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    setErrorMsg('');
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen bg-background-dark font-sans text-gray-200">
      {/* Left Panel */}
    <div className="w-1/2 bg-background-light text-white p-12 flex flex-col justify-between relative border-r border-gray-400">
        <div>
          {/* Logo with crosshatch pattern */}
          <div 
            className="w-12 h-12 mb-6 border-2 border-[#d8974a] rounded"
            style={{
              backgroundColor: '#d8974a',
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 3px), repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 3px)'
            }}
          ></div>
          
          <h1 className="text-4xl font-bold mb-1">TransitOps</h1>
          <p className="text-lg text-gray-500 mb-16">Smart Transport Operations Platform</p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">One login, four roles:</h3>
            <ul className="space-y-3">
              {['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">TRANSITOPS © 2026 - RBAC ENABLED</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center relative">
        
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-200 mb-1">Sign in to your account</h2>
            <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-widest block">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-transparent border border-white/20 rounded-lg text-gray-300 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-widest block">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-transparent border border-white/20 rounded-lg text-gray-300 focus:outline-none focus:border-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500 uppercase tracking-widest block">Role (RBAC)</label>
              <div className="relative mb-4">
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-transparent border border-white/20 rounded-lg text-gray-300 appearance-none focus:outline-none focus:border-gray-400"
                >
                  <option className="bg-background-dark text-gray-300" value="Fleet Manager">Fleet Manager</option>
                  <option className="bg-background-dark text-gray-300" value="Dispatcher">Dispatcher</option>
                  <option className="bg-background-dark text-gray-300" value="Safety Officer">Safety Officer</option>
                  <option className="bg-background-dark text-gray-300" value="Financial Analyst">Financial Analyst</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {(errorMsg || globalError) && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6 text-sm text-[#ef4444] bg-[#ef4444]/10 p-3 rounded"
              >
                <AlertCircle size={16} />
                <span>{errorMsg || globalError}</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-1 pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative w-4 h-4 border border-gray-400 rounded-sm bg-transparent flex items-center justify-center">
                  <input type="checkbox" defaultChecked className="absolute opacity-0" />
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-blue-400 text-sm hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-primary hover:bg-opacity-90 text-white rounded-lg text-lg font-bold transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8">
            <p className="text-sm text-gray-400 mb-2">Access is scoped by role after login:</p>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Fleet Manager &rarr; Fleet, Maintenance</li>
              <li>• Dispatcher &rarr; Dashboard, Trips</li>
              <li>• Safety Officer &rarr; Drivers, Compliance</li>
              <li>• Financial Analyst &rarr; Fuel & Expenses, Analytics</li>
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
