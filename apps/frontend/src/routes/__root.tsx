import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="text-white">
        <div className="mx-auto flex h-screen w-full max-w-8xl flex-col">
           {/* Todo: externaliser en component ?  */}
          <header className="m-9">
            <h2 className="text-light-blue">Shifumi !</h2>
          </header>

          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </div>
    </>
  ),
});
