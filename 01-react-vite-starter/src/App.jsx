import { useState, useEffect } from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [currentMenu, setCurrentMenu] = useState('');

    useEffect(() => {
      setCurrentMenu(getFirstSegment());
      console.log("Active Menu: ", getFirstSegment());
    }, []);

    const updateCurrentMenu = (menu) => {
      setCurrentMenu(menu);
    }

    const getFirstSegment = () => {
      const seg = window.location.pathname.split("/")[1];
      return seg === "" ? "home" : seg;
    };

  return (
    <>
      <Header currentMenu={currentMenu} updateCurrentMenu={updateCurrentMenu} />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
