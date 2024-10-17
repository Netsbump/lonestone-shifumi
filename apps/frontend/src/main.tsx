import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';

import './index.css';

import { GameProvider } from './features/game/GameContext.tsx';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// // biome-ignore lint/style/noNonNullAssertion: <explanation>
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <GameProvider>
//       <App />
//     </GameProvider>
//   </React.StrictMode>,
// );

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </React.StrictMode>,
  );
}
