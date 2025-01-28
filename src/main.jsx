import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from './Routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SkeletonTheme } from 'react-loading-skeleton';
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SkeletonTheme baseColor="#212121" highlightColor="#555">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>

        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>

      </QueryClientProvider>
    </AuthProvider>
    </SkeletonTheme>
  </StrictMode>,
)
