import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import authService from '../../services/auth-service';
import toastService from '../../common/toastService';
import { isValidEmail } from '../../utils';

const LoginPage: React.FC = () => {

    //* States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    //* Custom hooks
    const { loginHandler } = useAuth();

    //* Refs

    //* Helper functions

    //* Life cycle hooks

    //* Handlers
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!email || !password) {
            toastService.error('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            toastService.error('Please enter a valid email address');
            return;
        }

        try {

            setLoading(true);
            
            const response = await authService.login({ email, password});

            if (response?.success && response?.data) {

                loginHandler({ accessToken: response.data.accessToken, userData: response.data.user});

                toastService.success('Logged in successfully');

                navigate('/home');

            } else {
                toastService.error(response.message || 'Login failed');
            }

        } catch (error: unknown) {

            if (error instanceof Error) 
                toastService.error(error.message);
            else 
                toastService.error('An error occurred during login');

            
        } finally {
            setLoading(false);
        }
    };


    //* JSX
    return (
        <div className="min-h-screen flex-center  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full  space-y-8 bg-white p-7 sm:p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        <span>Don't have an account? </span>
                        <Link to="/singup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                            Sign up
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6 " action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm transition-all duration-200 ease-in-out"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm transition-all duration-200 ease-in-out"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between  ">
                        <div className="flex-1 flex items-center ">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-base  text-gray-900 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        <div className="text-xs sm:text-base">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform ${!loading && 'hover:-translate-y-0.5'}`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {loading ? (
                                    <Loader2 className="size-5 text-indigo-200 animate-spin" />
                                ) : (
                                    <Lock className="size-5 text-indigo-500 group-hover:text-indigo-400 transition-colors duration-200" />
                                )}
                            </span>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;