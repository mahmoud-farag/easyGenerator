 /* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { IAuthContext, IUser } from '../interfaces';


const AuthContext = createContext<IAuthContext | null>(null);


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [loggedUser, setLoggedUser] = useState<IUser | null>(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {

    const token = localStorage.getItem('accessToken');
    const stored = localStorage.getItem('user');

    return Boolean(token && stored);

  });

  const [loading, setLoading] = useState(false);




  function loginHandler({ accessToken, userData }: { accessToken: string, userData: IUser }) {

    setLoggedUser(userData);
    setIsAuthenticated(true);

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));

  }

  function logoutHandler() {

    setLoggedUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }


  function updateLoginInfo ({ accessToken, userData}: { accessToken: string, userData: IUser }) {

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    if (userData ) {
      const newUserData = { ...loggedUser, ...userData };
      setLoggedUser(() => newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));

    }
  }

  const authValue = { loggedUser, loading, setLoading, logoutHandler, loginHandler, updateLoginInfo, isAuthenticated };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  )

}

/**
 * Custom hook to access authentication context.
 *
 * Must be used within an {@link AuthProvider}.
 *
 * @throws {Error} If used outside AuthProvider
 *
 * @returns {Object} Auth context values and actions
 * @returns {Object|null} returns.loggedUser - Currently logged-in user data or null
 * @returns {boolean} returns.isAuthenticated - Whether the user is authenticated
 * @returns {boolean} returns.loading - Indicates ongoing auth-related operations
 * @returns {(value: boolean) => void} returns.setLoading - Updates loading state
 * @returns {(payload: LoginPayload) => void} returns.loginHandler - Logs in the user and persists auth data
 * @returns {() => void} returns.logoutHandler - Logs out the user and clears stored auth data
 * @returns {(payload: UpdateLoginPayload) => void} returns.updateLoginInfo - Updates token and/or user data
*/
function useAuth() {

  const context = useContext(AuthContext);

  if (context === null)
    throw new Error('useAuth must be used within an AuthProvider');


  return context;


}


export { AuthProvider, useAuth };



























