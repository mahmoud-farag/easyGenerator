
import React from 'react';
import { useAuth } from '../../context/authContext';

const HomePage: React.FC = () => {


    const { loggedUser, logoutHandler } = useAuth();

    return (
        <div className="flex-center min-h-screen">
            <div className="flex-center flex-col gap-4  space-y-4 " >
                <h1 className='text-2xl '>Welcome <span className='font-bold'>{loggedUser?.username}</span> to the application.</h1>
                <button className='bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out' onClick={logoutHandler}>LogOut</button>
            </div>
        </div>
    );
};

export default HomePage;