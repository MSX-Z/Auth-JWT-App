import { Route, Routes } from 'react-router-dom';
import NotFound404 from './Components/NotFound404';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Setting from './Pages/Setting';
import ProtectRoute from './Routes/ProtectRoute';
import AuthProvider from './Services/Contexts/AuthProvider';

export default function App() {
  console.log('app render');

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </AuthProvider >
  );
}
