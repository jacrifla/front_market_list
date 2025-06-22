import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Metrics from './pages/Metrics';
import Registers from './pages/Registers';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />

        {/* Rotas privadas (com layout e proteção) */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/registers" element={<Registers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
