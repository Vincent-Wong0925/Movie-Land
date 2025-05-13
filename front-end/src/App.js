import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import './App.css';
import Root from './components/root';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>

  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
