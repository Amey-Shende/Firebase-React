
import Dashboard from './components/dashboard_layout/Dashboard.jsx';
import Login from './components/withoutAuth/Login.jsx';
import Registration from './components/withoutAuth/Registration.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpdateData from './components/dashboard_layout/UpdateData.jsx';
import ProctedRoute from './components/ProctedRoute';
import Layout from './components/dashboard_layout/Layout.jsx';
import ForgotPassword from './components/forgot-password/ForgotPassword.jsx';
import { ToastContainer } from 'react-toastify';
import { createContext, Suspense, useEffect, useState } from 'react';
import { generateToken, } from './components/firebase/FIrebase.js';
import ResetPassword from './components/forgot-password/ResetPassword.jsx';

export const UserContext = createContext(null);

function App() {

  const [showPopup, setShowPopup] = useState(false);
  const [autoLogout, setAutoLogout] = useState(false);

  useEffect(() => {
    generateToken();
  }, []);

  const handleShowPopup = () => {
    console.log("Inside The popup")
    setShowPopup((showPopup) => !showPopup);
  }

  return (
    <UserContext.Provider value={{ showPopup, handleShowPopup, setShowPopup, autoLogout, setAutoLogout }}>
      <div className="App">

        <ToastContainer />
        <BrowserRouter>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} index/>
              <Route path="/register" element={<Registration />} />
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="/dashboard/" element={<ProctedRoute Comp={Layout} />}>
                <Route path='/dashboard/' element={<Dashboard />} index />
                <Route path="editRecord" element={<UpdateData />} />
              </Route>

              <Route path="*" element={<Login />} />

            </Routes>
          </Suspense>
        </BrowserRouter >

      </div >
    </UserContext.Provider>
  );
}

export default App;
