import { Header } from '@/features/game/Header';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
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
