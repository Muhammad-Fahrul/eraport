import './navbar.css';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import profileIcon from '../../assets/icons/user.svg';

import useAuth from '../../hooks/useAuth';
import useScroll from '../../hooks/useScroll';

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const { username, urlImg } = useAuth();
  const height = useScroll();
  return (
    <div className={`container-navbar ${height >= 10 ? 'shadow' : ''}`}>
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
            <div className="nav-btns">
              <Link to={`${username}`}>
                <span className="profile">
                  <img src={urlImg || profileIcon} alt={username} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
