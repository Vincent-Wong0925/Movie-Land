import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import './App.css';
import Root from './components/root';
import Home from './pages/home';
import Detail from './pages/detail';
import Search from './pages/search';
import Favorite from './pages/favorite';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    <Route index element={<Home />} />
    <Route path='/detail/:id' element={<Detail />} />
    <Route path='/search' element={<Search />} />
    <Route path='/favorite' element={<Favorite />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/profile' element={<Profile />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
