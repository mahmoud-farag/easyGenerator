import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Loader2 } from 'lucide-react';
import authService from '../../services/auth-service';
import toastService from '../../common/toastService';

const SignupPage: React.FC = () => {

    //* States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    //* Custom hooks

    //* Refs

    //* Helper functions

    //* Life cycle hooks

    //* Handlers 
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!username || !email || !password) {
            toastService.error('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            
            const response = await authService.register({ username, email, password });

            if (response?.success) {

                toastService.success('Account created successfully! Please sign in.');

                navigate('/login');

            } else {

                toastService.error(response.message || 'Signup failed');
            }


        } catch (error: unknown) {

            if (error instanceof Error) 
                toastService.error(error.message);
            else 
                toastService.error('An error occurred during signup');
            
        } finally {
            setLoading(false);
        }
    };

    //* JSX
    return (
        <div className="min-h-screen flex-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-7 sm:p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm transition-all duration-200 ease-in-out"
                                placeholder="Full Name"
                            />
                        </div>
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
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm transition-all duration-200 ease-in-out"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm transition-all duration-200 ease-in-out"
                                placeholder="Password"
                            />
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
                                    <UserPlus className="size-5 text-indigo-500 group-hover:text-indigo-400 transition-colors duration-200" />
                                )}
                            </span>
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;