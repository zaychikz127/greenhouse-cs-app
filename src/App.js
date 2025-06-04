import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import OtpInputPage from './pages/InputOtp/OtpInputPage';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import DashboardAdmin from './pages/DashboardAdmin/DashboardAdmin';
import Control from './pages/Control/Control';
import PrimeReact from 'primereact/api';
import PrivateRoute from './components/PrivateRoute'; 
import ChangePassword from './pages/ChangePassword/ChangePassword';


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

        {/* PrivateRoute */}
        <Route path="/dashboard-admin" element={
          <PrivateRoute>
            <DashboardAdmin />
          </PrivateRoute>
        } />

        <Route path="/control" element={
          <PrivateRoute>
            <Control />
          </PrivateRoute>
        } />

        <Route path="/change-password" element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
