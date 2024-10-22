import { Header } from '@/features/game/Header';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient }>()({
    component: () => (
      <>
        <div className="text-white">
          <div className="mx-auto flex h-screen w-full max-w-8xl flex-col">
            <Header />
            <Outlet />
            <TanStackRouterDevtools />
          </div>
        </div>
      </>
    ),
  });
 
