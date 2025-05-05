import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from '@/App';
import NotFoundPage from '@/pages/NotFoundPage';
import Books from '@/pages/Books';
import Layout from '@/components/Layout';
import Magazines from './pages/Magazines';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <App /> },
      // Using multiple routes to demonstrate the Table component's dynamic behavior
      { path: 'books', element: <Books /> },
      { path: 'magazines', element: <Magazines /> },
    ],
  },
]);

/**
TODOs
- add tailwind config / styles
- add testing
- update readme
 **/
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
