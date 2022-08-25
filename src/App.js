import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfo } from './store/auth-slice';
import ProtectedRoutes from './routes/ProtectedRoutes';
import RedirectRoute from './routes/RedirectRoute';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  const authState = useSelector(userInfo);
  const isAuth = authState.isAuthenticated ? true : false;

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate replace to='/Login' />} />
        <Route element={<RedirectRoute isLogged={isAuth} />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes isLogged={isAuth} />}>
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
