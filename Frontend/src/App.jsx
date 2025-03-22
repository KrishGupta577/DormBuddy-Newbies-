import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react';
import { StoreContext } from './context/StoreContext';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import DetailForm from './components/AuthenticationPages/DetailForm/DetailForm';

function App() {

  // const {colorTheme} = useContext(StoreContext)

  // useEffect(() => {
  //   document.documentElement.setAttribute('data-theme', colorTheme);
  // }, [colorTheme]);

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/detail-form' element={<DetailForm />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
