/*
 * © 2025 Florencio Jorge Vilca Taipe. All rights reserved.
 * License: Non-Commercial Use Only
 * Contact: jorgevilcataipe@gmail.com
 * Unauthorized commercial use is prohibited.
 */

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { SeatingMapContainer } from "./components/SeatingMapContainer";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" replace />
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/seating-chart',
            element: <SeatingMapContainer />
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;
