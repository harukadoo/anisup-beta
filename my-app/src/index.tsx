import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignUpPage, SignInPage, MainPage, AboutPage, AnimePage, TopAnimePage, SearchList, HomePage, GenrePage } from './pages/index';


const router = createBrowserRouter([
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/search-list/:titles',
    element: <SearchList />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/about-us',
    element: <AboutPage />,
  },
  {
    path: '/anime/:id',
    element: <AnimePage />,
  },
  {
    path: '/top100',
    element: <TopAnimePage />,
  },
  {
    path: '/genre/:genre',
    element: <GenrePage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<RouterProvider router={router} />);
