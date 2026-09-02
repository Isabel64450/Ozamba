import { Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Register from "./pages/Register";
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
       <Route path="/register" element={<Register />} />
       <Route path="/verify-email/:token" element={<VerifyEmail />}
/>
    </Routes>
  )
}

export default App