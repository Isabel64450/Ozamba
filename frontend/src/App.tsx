import { Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Register from "./pages/Register";
import VerifyEmail from './pages/VerifyEmail';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Sports from './pages/dashboard/Sport';
function App() {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
       <Route path="/register" element={<Register />} />
       <Route path="/verify-email/:token" element={<VerifyEmail />}/>
       <Route path="/login" element={<Login />} />


        <Route path="/" element={<Dashboard />} />
        <Route path="/sports" element={<Sports />} />

    </Routes>
  )
}

export default App