import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  useLocation,
  Navigate
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/navigation/Navbar';
import Footer from './components/footer/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { MessagesProvider } from './contexts/MessagesContext';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/auth/Login';
import AuthInitializer from './components/auth/AuthInitializer';
import { AlumniAuthProvider } from './contexts/AlumniAuthContext';
import ScrollToTop from './components/utils/ScrollToTop';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { HelmetProvider } from 'react-helmet-async';

// Pages
const Admissions = lazy(() => import('./pages/Admissions'));
const Home = lazy(() => import('./pages/Home'));
const Faculty = lazy(() => import('./pages/Faculty'));
const About = lazy(() => import('./components/about/About'));
const Vision = lazy(() => import('./pages/about/Vision'));
const Messages = lazy(() => import('./pages/about/Messages'));

// Academics
const Academics = lazy(() => import('./pages/Academics'));
const PrePrimary = lazy(() => import('./pages/academics/PrePrimary'));
const Primary = lazy(() => import('./pages/academics/Primary'));
const Middle = lazy(() => import('./pages/academics/Middle'));
const Secondary = lazy(() => import('./pages/academics/Secondary'));
const SeniorSecondary = lazy(() => import('./pages/academics/SeniorSecondary'));

// Campus Life
const Campuses = lazy(() => import('./pages/Campuses'));
const CampusHome = lazy(() => import('./pages/campus/CampusHome'));

// Alumni
const AlumniNetwork = lazy(() => import('./pages/alumni/AlumniNetwork'));
const AlumniSuccess = lazy(() => import('./pages/alumni/AlumniSuccess'));
const Directory = lazy(() => import('./pages/alumni/Directory'));
const Profile = lazy(() => import('./pages/alumni/Profile'));
const AlumniRegister = lazy(() => import('./pages/alumni/AlumniRegister'));
const Gallery = lazy(() => import('./pages/Gallery'));
const EventGallery = lazy(() => import('./pages/EventGallery'));

// Admin pages
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const ManageEvents = lazy(() => import('./components/admin/ManageEvents'));
const ManageUpdates = lazy(() => import('./components/admin/ManageUpdates'));
const ManageStudents = lazy(() => import('./components/admin/ManageStudents'));
const ManageAlumni = lazy(() => import('./components/admin/ManageAlumni').then(module => ({ default: module.default })));
const AdminCalendar = lazy(() => import('./components/admin/AdminCalendar'));
const ManageGallery = lazy(() => import('./components/admin/AdminGallery'));
const ManageSports = lazy(() => import('./components/admin/ManageSports'));

// Co-curricular
const CoCurricular = lazy(() => import('./pages/CoCurricular'));
const PerformingArts = lazy(() => import('./pages/co-curricular/PerformingArts'));
const SportsAthletics = lazy(() => import('./pages/co-curricular/SportsAthletics'));
const VisualArts = lazy(() => import('./pages/co-curricular/VisualArts'));
const ClubsSocieties = lazy(() => import('./pages/co-curricular/ClubsSocieties'));
const Contact = lazy(() => import('./pages/Contact'));
const Invites = lazy(() => import('./pages/Invites'));
const Scholarship = lazy(() => import('./pages/Scholarship'));
import SportDetails from "./pages/co-curricular/SportDetails";

const Calendar = lazy(() => import('./pages/Calendar'));

const YouTubeGallery = lazy(() => import('./pages/YouTubeGallery'));
const ManageYouTubeVideos = lazy(() => import('./components/admin/ManageYouTubeVideos'));

const RootLayout = () => {
  const location = useLocation();
  const hideFooterPaths = ['/gallery', '/invites']; // Add invites to the paths where footer should be hidden
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <AuthInitializer />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Add login at root level */}
      <Route path="login" element={
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <Login />
        </Suspense>
      } />
      <Route index element={
        <ErrorBoundary>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
          }>
            <Home />
          </Suspense>
        </ErrorBoundary>
      } />
      {/* About routes */}
      <Route path="about" element={<About />} />
      <Route path="about/vision" element={<Vision />} />
      <Route path="about/messages" element={<Messages />} />
      <Route path="scholarship" element={<Scholarship />} />
      {/* Academic routes */}
      <Route path="academics" element={<Academics />} />
      <Route path="academics/pre-primary" element={<PrePrimary />} />
      <Route path="academics/primary" element={<Primary />} />
      <Route path="academics/middle" element={<Middle />} />
      <Route path="academics/secondary" element={<Secondary />} />
      <Route path="academics/senior-secondary" element={<SeniorSecondary />} />
      {/* Campus routes */}
      <Route path="campuses" element={<Campuses />} />
      <Route path="campus/:campus" element={<CampusHome />} />
      {/* Co-curricular routes */}
      <Route path="co-curricular" element={<CoCurricular />} />
      <Route path="co-curricular/performing-arts" element={<PerformingArts />} />
      <Route path="co-curricular/sports-athletics" element={<SportsAthletics />} />
      <Route path="co-curricular/sports-athletics/:id" element={
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <SportDetails />
        </Suspense>
      } />
      <Route path="co-curricular/visual-arts" element={<VisualArts />} />
      <Route path="co-curricular/clubs-societies" element={<ClubsSocieties />} />
      {/* Alumni routes */}
      <Route path="alumni">
        <Route index element={<AlumniNetwork />} />
        <Route path="register" element={<AlumniRegister />} />
        <Route path="success" element={<AlumniSuccess />} />
        <Route path="directory" element={
          <ProtectedRoute requiredRole="alumni">
            <Directory />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute requiredRole="alumni">
            <Profile />
          </ProtectedRoute>
        } />
      </Route>
      {/* Gallery routes */}
      <Route path="gallery">
        <Route index element={
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          }>
            <Gallery />
          </Suspense>
        } />
        <Route path="event/:eventId" element={
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          }>
            <EventGallery />
          </Suspense>
        } />
      </Route>
      {/* Other main routes */}
      <Route path="faculty" element={
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <Faculty />
        </Suspense>
      } />
      <Route path="admissions" element={<Admissions />} />
      <Route path="contact" element={<Contact />} />
      <Route path="invites" element={
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <Invites />
        </Suspense>
      } />
      {/* Admin routes */}
      <Route path="admin">
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="events" element={
          <ProtectedRoute requiredRole="admin">
            <ManageEvents />
          </ProtectedRoute>
        } />
        <Route path="gallery" element={
          <ProtectedRoute requiredRole="admin">
            <ManageGallery />
          </ProtectedRoute>
        } />
        <Route path="updates" element={
          <ProtectedRoute requiredRole="admin">
            <ManageUpdates />
          </ProtectedRoute>
        } />
        <Route path="students" element={
          <ProtectedRoute requiredRole="admin">
            <ManageStudents />
          </ProtectedRoute>
        } />
        <Route path="alumni" element={
          <ProtectedRoute requiredRole="admin">
            <ManageAlumni />
          </ProtectedRoute>
        } />
        <Route path="calendar" element={
          <ProtectedRoute requiredRole="admin">
            <AdminCalendar />
          </ProtectedRoute>
        } />
        <Route path="sports" element={
          <ProtectedRoute requiredRole="admin">
            <ManageSports />
          </ProtectedRoute>
        } />
        <Route path="youtube" element={
          <ProtectedRoute requiredRole="admin">
            <ManageYouTubeVideos />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="calendar" element={
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <Calendar />
        </Suspense>
      } />
      <Route path="video-gallery" element={
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <YouTubeGallery />
        </Suspense>
      } />
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-dark mb-4">Page Not Found</h1>
            <p className="text-neutral-dark/70 mb-8">The page you're looking for doesn't exist.</p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white rounded-lg hover:bg-green-dark transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      } />
    </Route>
  ),
  {
    basename: process.env.NODE_ENV === 'production' ? '' : '/',
    future: {
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                <SpeedInsights />
                <Analytics />
              </div>
            }
          >
            <AuthProvider>
              <AlumniAuthProvider>
                <MessagesProvider>
                  <RouterProvider router={router} />
                </MessagesProvider>
              </AlumniAuthProvider>
            </AuthProvider>
          </Suspense>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
