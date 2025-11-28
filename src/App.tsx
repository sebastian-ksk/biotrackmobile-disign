import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Capture from './pages/Capture';
import Visualization from './pages/Visualization';
import Summary from './pages/Summary';
import Profile from './pages/Profile';
import BottomNavigation from './components/BottomNavigation';
import PhoneFrame from './components/PhoneFrame';
import './styles/global.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Simulación de autenticación
  const isAuthenticated = true; // En producción, verificar token/sesión
  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='layout-container'>
      <div className='layout-content'>{children}</div>
      <BottomNavigation />
    </div>
  );
};

function App() {
  return (
    <PhoneFrame>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/capture'
            element={
              <ProtectedRoute>
                <Layout>
                  <Capture />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path='/visualization'
            element={
              <ProtectedRoute>
                <Layout>
                  <Visualization />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path='/summary'
            element={
              <ProtectedRoute>
                <Layout>
                  <Summary />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path='/' element={<Navigate to='/capture' />} />
        </Routes>
      </BrowserRouter>
    </PhoneFrame>
  );
}

export default App;
