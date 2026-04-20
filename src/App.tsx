/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedbackFormPage from './pages/FeedbackFormPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import ResponsePage from './pages/ResponsePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-main dark:bg-gray-950 transition-colors flex">
        <Navbar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/feedback" element={<FeedbackFormPage />} />
              <Route path="/view-feedback" element={<StaffDashboardPage />} />
              <Route path="/response" element={<ResponsePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
