import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-lg mx-auto">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <FileQuestion className="w-32 h-32 text-indigo-600 relative z-10" strokeWidth={1.5} />
                    </div>
                </div>
                
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 mb-4">
                    404
                </h1>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Page not found
                </h2>
                
                <p className="text-gray-600 text-lg mb-8">
                    Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="iFlex-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        <ArrowLeft className="size-5" />
                        Go Back
                    </button>
                    
                    <button
                        onClick={() => navigate('/home')}
                        className="iFlex-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Home className="size-5" />
                        Go Home
                    </button>
                </div>
            </div>
            
           
        </div>
    );
};

export default NotFoundPage;