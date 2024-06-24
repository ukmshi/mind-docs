import { MainErrorFallback } from '@/components/errors/main';
import { createBrowserRouter } from 'react-router-dom';

export const createRouter = () =>{
  console.log('render main provider');

  return createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('@/app/routes/loading');
        return { Component: LandingRoute };
      },
    },
    // {
    //   path: '/auth/register',
    //   lazy: async () => {
    //     const { RegisterRoute } = await import('./auth/register');
    //     return { Component: RegisterRoute };
    //   },
    // },
    // {
    //   path: '/auth/login',
    //   lazy: async () => {
    //     const { LoginRoute } = await import('./auth/login');
    //     return { Component: LoginRoute };
    //   },
    // },
    // {
    //   path: '*',
    //   lazy: async () => {
    //     const { NotFoundRoute } = await import('./not-found');
    //     return { Component: NotFoundRoute };
    //   },
    // },
  ])
}