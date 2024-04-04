import './home.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../../components/button/Button';

import { selectCurrentToken } from '../../auth/redux/authSlice';
import useAuth from '../../../hooks/useAuth';

const Home = () => {
  const token = useSelector((state) => selectCurrentToken(state));
  const { username } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="container-home">
      <div className="wrapper">
        <div>
          <h1>Welcome</h1>
          <p>Start Your Journey</p>
        </div>
        <Button url={`/${username}`} text="Let's Go" />
      </div>
    </div>
  );
};

export default Home;
