import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { MessagesProvider } from './contexts/MessagesContext';
import RequireAdmin from './components/auth/RequireAdmin';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import AuthInitializer from './components/auth/AuthInitializer';
import { AlumniAuthProvider } from './contexts/AlumniAuthContext';
import AlumniRegister from './pages/alumni/AlumniRegister';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Pages
const Admissions = lazy(() => import('./pages/Admissions'));
const Home = lazy(() => import('./pages/Home'));
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
const Register = lazy(() => import('./pages/alumni/Register'));
const Gallery = lazy(() => import('./pages/Gallery'));
const EventGallery = lazy(() => import('./pages/EventGallery'));

// Admin pages
const AdminSetup = lazy(() => import('./pages/admin/AdminSetup'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageEvents = lazy(() => import('./pages/admin/ManageEvents'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const ManageUpdates = lazy(() => import('./pages/admin/ManageUpdates'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));

// Add these new imports
const CoCurricular = lazy(() => import('./pages/CoCurricular'));
const PerformingArts = lazy(() => import('./pages/co-curricular/PerformingArts'));
const SportsAthletics = lazy(() => import('./pages/co-curricular/SportsAthletics'));
const VisualArts = lazy(() => import('./pages/co-curricular/VisualArts'));
const ClubsSocieties = lazy(() => import('./pages/co-curricular/ClubsSocieties'));
const Contact = lazy(() => import('./pages/Contact'));
const Events = lazy(() => import('./pages/EventGallery'));
const Alumni = lazy(() => import('./pages/alumni/AlumniNetwork'));
const Scholarship = lazy(() => import('./pages/Scholarship'));

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthInitializer />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Add login at root level
      {
        path: "login",
        element: (
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          }>
            <Login />
          </Suspense>
        ),
      },
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
              </div>
            }>
              <Home />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      // About routes
      {
        path: "about",
        element: <About />,
      },
      {
        path: "about/vision",
        element: <Vision />,
      },
      {
        path: "about/messages",
        element: <Messages />,
      },
      {
        path: "scholarship",
        element: <Scholarship />,
      },
      // Academic routes
      {
        path: "academics",
        element: <Academics />,
      },
      {
        path: "academics/pre-primary",
        element: <PrePrimary />,
      },
      {
        path: "academics/primary",
        element: <Primary />,
      },
      {
        path: "academics/middle",
        element: <Middle />,
      },
      {
        path: "academics/secondary",
        element: <Secondary />,
      },
      {
        path: "academics/senior-secondary",
        element: <SeniorSecondary />,
      },
      // Campus routes
      {
        path: "campuses",
        element: <Campuses />,
      },
      {
        path: "campus/:id",
        element: <CampusHome />,
      },
      // Co-curricular routes
      {
        path: "co-curricular",
        element: <CoCurricular />,
      },
      {
        path: "co-curricular/performing-arts",
        element: <PerformingArts />,
      },
      {
        path: "co-curricular/sports-athletics",
        element: <SportsAthletics />,
      },
      {
        path: "co-curricular/visual-arts",
        element: <VisualArts />,
      },
      {
        path: "co-curricular/clubs-societies",
        element: <ClubsSocieties />,
      },
      // Alumni routes
      {
        path: "alumni",
        children: [
          {
            index: true,
            element: <AlumniNetwork />,
          },
          {
            path: "register",
            element: <AlumniRegister />, // Add the new registration component
          },
          {
            path: "success",
            element: <AlumniSuccess />,
          },
          {
            path: "directory",
            element: (
              <ProtectedRoute requiredRole="alumni">
                <Directory />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute requiredRole="alumni">
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                }>
                  <Profile />
                </Suspense>
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Gallery routes
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "events/:id",
        element: <EventGallery />,
      },
      // Other main routes
      {
        path: "admissions",
        element: <Admissions />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "invites",
        element: <Events />,
      },
      // Admin routes
      {
        path: "admin",
        children: [
          {
            path: "setup",
            element: <AdminSetup />,
          },
          {
            path: "dashboard",
            element: (
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            ),
          },
          {
            path: "events",
            element: (
              <RequireAdmin>
                <ManageEvents />
              </RequireAdmin>
            ),
          },
          {
            path: "messages",
            element: (
              <RequireAdmin>
                <ManageMessages />
              </RequireAdmin>
            ),
          },
          {
            path: "updates",
            element: (
              <RequireAdmin>
                <ManageUpdates />
              </RequireAdmin>
            ),
          },
          {
            path: "gallery",
            element: (
              <RequireAdmin>
                <AdminGallery />
              </RequireAdmin>
            ),
          },
        ],
      },
      // Catch all route
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <AuthProvider>
            <AlumniAuthProvider>
              <MessagesProvider>
                <RouterProvider router={router} />
                <SpeedInsights />
                <Analytics />
              </MessagesProvider>
            </AlumniAuthProvider>
          </AuthProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
