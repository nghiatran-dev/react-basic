import { useState, useEffect, useContext } from 'react';
import { Spin } from 'antd';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './components/context/auth.context';
import { apiGetAccount } from './services/api.service';

const App = () => {
  const [currentMenu, setCurrentMenu] = useState('');
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

    useEffect(() => {
      fetchUserInfo();
      setCurrentMenu(getFirstSegment());
    }, []);

    const updateCurrentMenu = (menu) => {
      setCurrentMenu(menu);
    }

    const getFirstSegment = () => {
      const seg = window.location.pathname.split("/")[1];
      return seg === "" ? "home" : seg;
    };

    const fetchUserInfo = async () => {
      const res =  await apiGetAccount();
      if (res && res.data) {
        setUser(res.data.user);
      }
      setIsAppLoading(false);
    }

  return (
    <>
      {isAppLoading ?
        <Spin size="large" />
      :
        <>
          <Header currentMenu={currentMenu} updateCurrentMenu={updateCurrentMenu} />
          <Outlet />
          <Footer />
        </>
      }
    </>
  )
}

export default App;
