import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFound-page';
import SingUpPage from './pages/auth/Signup-page';
import LoginPage from './pages/auth/Login-page';
import HomePage from './pages/home/Home';
import { useAuth } from './context/authContext';
import ProtectedRoute from './components/auth/ProtectedRoute';



function App() {


  const { isAuthenticated } = useAuth();



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/singup" element={<SingUpPage />} />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />

        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
