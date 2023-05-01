import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Documentation from './components/Documentation';
import Home from './components/Home';
import Login from './components/auth/Login';
import { AuthService } from './services/AuthService';
import Register from './components/auth/Register';
import Token from './components/Token';
import { AuthProvider } from './provider/AuthProvider';
import ConfirmEmail from './components/auth/ConfirmEmail';

const authService = new AuthService();

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', Component: Home },
      { path: '/api', Component: Documentation },
      {
        path: '/login',
        Component: () => {
          return <Login authService={authService} />;
        },
      },
      {
        path: '/signup',
        Component: () => {
          return <Register authService={authService} />;
        },
      },
      { path: '/token', Component: Token },
      { path: '/verify-code', Component: () => <ConfirmEmail authService={authService} /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider authService={authService}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
