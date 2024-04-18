import './navbar.css';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import profileIcon from '../../assets/icons/user.svg';

import useAuth from '../../hooks/useAuth';
import useScroll from '../../hooks/useScroll';
import { useLogoutMutation } from '../../pages/auth/redux/authApiSlice';
import Loader from '../loader/Loader';

const Navbar = () => {
  const [screen, setScreen] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const { username, urlImg } = useAuth();
  const height = useScroll();

  const [logout, { isSuccess, isLoading, isError, error }] =
    useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/eraport/login');
    }
  }, [isSuccess, navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setScreen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToProfile = () => {
    navigate(`${username}`);
    setScreen(false);
  };

  if (isError) {
    alert(error?.data?.message);
  }

  return (
    <div className={`container-navbar ${height >= 10 ? 'shadow' : ''}`}>
      {isLoading && <Loader />}
      <div className="wrapper">
        <div className="left">
          <Link to="/eraport">
            <h1>
              R<span style={{ fontSize: '1rem' }}>aport</span>
            </h1>
          </Link>
        </div>
        <div className="right">
          {token && (
            <div
              className="nav-btns"
              onMouseEnter={() => setScreen(true)}
              onMouseLeave={() => setScreen(false)}
            >
              <button className="profile">
                <img src={urlImg || profileIcon} alt={username} />
              </button>
              {screen && (
                <div className="hidden">
                  <button onClick={handleToProfile}>
                    <i className="fa-solid fa-user"></i>
                    <span>profile</span>
                  </button>
                  <button onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
