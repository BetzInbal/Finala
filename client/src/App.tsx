import { RouterProvider } from 'react-router-dom';
import { routes } from './compnents/routes';
import Navbar from './compnents/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <RouterProvider router={routes} />
    </>
  );
}
