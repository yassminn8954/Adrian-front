import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/book/:id',
    Component: BookDetails,
  },
]);
