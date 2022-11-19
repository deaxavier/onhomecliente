import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import reportWebVitals from './reportWebVitals'
import OnHomeApp from './OnHomeApp'
import LoginPage from './ui/pages/Login'
import PaymentPage from './ui/pages/Payment'
import ProfilePage from './ui/pages/Profile'
import ClockEventsPage from './ui/pages/ClockEvents'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="app" element={<OnHomeApp />}>
          <Route index element={<PaymentPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='events' element={<ClockEventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
