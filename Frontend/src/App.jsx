import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import DetailForm from './components/BeforeLogin/AuthenticationPages/DetailForm/DetailForm';
import MatchRoommate from './components/BeforeLogin/Matches/Matches';
import StripePayment from './components/StripeGateway/StripeGateway';
import { StoreContext } from './context/StoreContext';

function App() {

  const { colorTheme } = useContext(StoreContext)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorTheme);
  }, [colorTheme]);

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/detail-form' element={<DetailForm />}></Route>
          <Route path='/matches' element={<MatchRoommate />}></Route>
          <Route path='/payment' element={<StripePayment />}></Route>
          <Route path='/dashboard/*' element={<Dashboard />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
