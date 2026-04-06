import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import Home from "./pages/Home.jsx";
import Charts from "./pages/Charts";
import CoinDetail from "./pages/CoinDetail";
import { HeroUIProvider } from "@heroui/react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/charts",
        element: <Charts />,
      },
      {
        path: "/coin/:id",
        element: <CoinDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </StrictMode>
);