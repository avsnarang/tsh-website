import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { MessagesProvider } from './contexts/MessagesContext';
import PageTransition from './components/animations/PageTransition';
import RequireAdmin from './components/auth/RequireAdmin';
import { usePageTracking } from './lib/analytics';

// Pages
import Home from './pages/Home';
import Home2 from './pages/Home-2';
import About from './pages/About';
import Vision from './pages/about/Vision';
import Messages from './pages/about/Messages';
import Campuses from './pages/Campuses';
import Academics from './pages/Academics';
import PrePrimary from './pages/academics/PrePrimary';
import Primary from './pages/academics/Primary';
import Middle from './pages/academics/Middle';
import Secondary from './pages/academics/Secondary';
import SeniorSecondary from './pages/academics/SeniorSecondary';
import CoCurricular from './pages/CoCurricular';
import PerformingArts from './pages/co-curricular/PerformingArts';
import SportsAthletics from './pages/co-curricular/SportsAthletics';
import VisualArts from './pages/co-curricular/VisualArts';
import ClubsSocieties from './pages/co-curricular/ClubsSocieties';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import EventGallery from './pages/EventGallery';
import CampusHome from './pages/campus/CampusHome';
import AlumniNetwork from './pages/alumni/AlumniNetwork';
import AlumniSuccess from './pages/alumni/AlumniSuccess';
import Login from './pages/alumni/Login';
import Register from './pages/alumni/Register';
import Profile from './pages/alumni/Profile';
import Directory from './pages/alumni/Directory';
import Invites from './pages/Invites';
import Admissions from './pages/Admissions';
import Scholarship from './pages/Scholarship';

// Admin Portal
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSetup from './pages/admin/AdminSetup';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageGallery from './pages/admin/ManageGallery';
import ManageMessages from './pages/admin/ManageMessages';
import ManageEvents from './pages/admin/ManageEvents';
import ManageUpdates from './pages/admin/ManageUpdates';
import ManageStudents from './pages/admin/ManageStudents';

function AnimatedRoutes() {
  const location = useLocation();
  usePageTracking(); // Add analytics tracking

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes location={location} key={location.pathname}>
            {/* Admin Portal Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/setup" element={<AdminSetup />} />
            <Route element={<RequireAdmin />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/testimonials" element={<ManageTestimonials />} />
              <Route path="/admin/gallery" element={<ManageGallery />} />
              <Route path="/admin/messages" element={<ManageMessages />} />
              <Route path="/admin/events" element={<ManageEvents />} />
              <Route path="/admin/updates" element={<ManageUpdates />} />
              <Route path="/admin/students" element={<ManageStudents />} />
            </Route>

            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home-2" element={<Home2 />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/vision" element={<Vision />} />
            <Route path="/about/messages" element={<Messages />} />
            <Route path="/campuses" element={<Campuses />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/academics/pre-primary" element={<PrePrimary />} />
            <Route path="/academics/primary" element={<Primary />} />
            <Route path="/academics/middle" element={<Middle />} />
            <Route path="/academics/secondary" element={<Secondary />} />
            <Route path="/academics/senior-secondary" element={<SeniorSecondary />} />
            <Route path="/co-curricular" element={<CoCurricular />} />
            <Route path="/co-curricular/performing-arts" element={<PerformingArts />} />
            <Route path="/co-curricular/sports-athletics" element={<SportsAthletics />} />
            <Route path="/co-curricular/visual-arts" element={<VisualArts />} />
            <Route path="/co-curricular/clubs-societies" element={<ClubsSocieties />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:eventId" element={<EventGallery />} />
            <Route path="/campus/:campus" element={<CampusHome />} />
            <Route path="/alumni" element={<AlumniNetwork />} />
            <Route path="/alumni/success" element={<AlumniSuccess />} />
            <Route path="/alumni/login" element={<Login />} />
            <Route path="/alumni/register" element={<Register />} />
            <Route path="/alumni/profile" element={<Profile />} />
            <Route path="/alumni/directory" element={<Directory />} />
            <Route path="/invites" element={<Invites />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/scholarship" element={<Scholarship />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <MessagesProvider>
        <Router>
          <ScrollToTop />
          <AnimatedRoutes />
        </Router>
      </MessagesProvider>
    </AuthProvider>
  );
}

export default App;