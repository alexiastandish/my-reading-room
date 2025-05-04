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
- loading and skeleton ui on load / in flight data 
- vite deployment 
- make column headers clickable (but keep dropdown functionality as well)
- add testing
- pagination styling 
- update readme
 **/
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
