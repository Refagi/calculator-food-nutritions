import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Register, SendVerifyEmail, VerifyEmail } from '@/pages/auth/index';
import AuthLayout from '@/layouts/AuthLayout';
import AuthProvider from '@/context/AuthContext';
import MainPage from '@/pages/main/MainPage';
import NutritionPage from './pages/main/NutritionPage';
import GoogleCallback from '@/pages/auth/AuthCallback';
import { ThemeProvider } from '@/context/ThemeContext'
import '@/style/Main.css'

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/send-verification-email" element={<SendVerifyEmail />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>

         <Route>
           <Route path="/auth/google/callback" element={<GoogleCallback />} />
           <Route path='/' element={<MainPage/>}/>
           <Route path='/food' element={<NutritionPage/>}></Route>
         </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;