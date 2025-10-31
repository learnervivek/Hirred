import { Button } from "./components/ui/button"
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/landing";
// import Onboarding from "./pages/onboarding";
import JobListing from "./pages/joblisting";
import JobPage from "./pages/job";
import MyJobs from "./pages/my-job";
import PostJob from "./pages/post-job";
import SaveJobs from "./pages/saved-job";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      // {
      //   path: '/Onboarding',
      //   element: (<ProtectedRoute>
      //   <Onboarding /></ProtectedRoute>),
      // },
      {
        path: '/jobs',
        element: (<ProtectedRoute>
          <JobListing />
        </ProtectedRoute>
        ),
      },

      {
        path: '/post-job',
        element: (<ProtectedRoute>
          <PostJob /></ProtectedRoute>),
      },

      {
        path: '/my-job',
        element: (<ProtectedRoute>
          <MyJobs /></ProtectedRoute>),
      },
      {
        path: '/saved-job',
        element:
          (<ProtectedRoute>
            <SaveJobs />  </ProtectedRoute>),
      },
      {
        path: '/job/:id',
        element:
          (<ProtectedRoute>
            <JobPage /></ProtectedRoute>),
      },


    ],
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>

  )

}

export default App
