import { useContext } from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './provider/AuthProvider';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <div className="container">
      <Navbar isAuth={Boolean(auth.token)} />
      <Outlet />
    </div>
  );
}

export default App;
