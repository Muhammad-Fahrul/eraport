import './login.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Loader from '../../../components/loader/Loader.jsx';

import { useLoginMutation } from '../redux/authApiSlice.js';
import { selectIsLogin, setCredentials, setLogin } from '../redux/authSlice.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const isLogin = useSelector(selectIsLogin);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const [login, { isLoading, isError }] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const getCred = async () => {
      try {
        const data = await login({
          username,
          password,
        }).unwrap();
        dispatch(setCredentials(data));
        dispatch(setLogin());
        navigate('/', { state: { from: location }, replace: true });
      } catch (error) {
        setErrMsg(error.data.message);
      }
    };
    getCred();
  };

  return (
    <div className="container-login">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit} className="wrapper" autoComplete="off">
        <div className="title" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1em' }}>Login</h1>
          <p
            style={{
              opacity: isError ? 1 : 0,
              color: 'red',
              fontSize: '0.6rem',
              width: '200px',
              height: '10px',
            }}
          >
            {errMsg}
          </p>
        </div>

        <div className="inputBox">
          <input
            name="username"
            type="text"
            required="required"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Username</span>
        </div>

        <div className="inputBox">
          <input
            name="password"
            type="password"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </div>

        <button className="enter">Login</button>
      </form>
    </div>
  );
};

export default Login;
