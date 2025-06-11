import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import OtpInputPage from './pages/InputOtp/OtpInputPage';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin';
import PrimeReact from 'primereact/api';
import PrivateRoute from './components/PrivateRoute'; 
import ChangePassword from './pages/ChangePassword/ChangePassword';
import RotaryTowerList from './pages/RotaryTowerList/RotaryTowerList';
import ControlTower from './pages/ControlTower/ControlTower';


PrimeReact.ripple = true;
PrimeReact.appendTo = 'self';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/input-otp" element={<OtpInputPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard-admin" element={
          <PrivateRoute>
            <DashboardAdmin />
          </PrivateRoute>
        } />

        <Route path="/change-password" element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        } />

        <Route path="/rotary-tower-list" element={
          <PrivateRoute>
            <RotaryTowerList />
          </PrivateRoute>
        } />

        <Route path="/control-tower/:towerId" element={
          <PrivateRoute>
            <ControlTower />
          </PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
