import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignUpPage, SignInPage, MainPage, AboutPage, AnimePage, TopAnimePage, SearchList, HomePage, GenrePage } from './pages/index';


const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/main/:user',
    element: <MainPage />,
  },
  {
    path: '/search-list/:user/:titles',
    element: <SearchList />,
  },
  {
    path: '/home/:user',
    element: <HomePage />,
  },
  {
    path: '/about-us/:user',
    element: <AboutPage />,
  },
  {
    path: '/anime/:user/:id',
    element: <AnimePage />,
  },
  {
    path: '/top100/:user',
    element: <TopAnimePage />,
  },
  {
    path: '/genre/:user/:genre',
    element: <GenrePage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<RouterProvider router={router} />);
