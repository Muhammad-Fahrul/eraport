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

  const [login, { isLoading }] = useLoginMutation();

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
      } catch (err) {
        console.log(err);
        if (!err) {
          setErrMsg('No Server Response');
        } else if (err.status === 400) {
          setErrMsg(err.data.message);
          console.log(errMsg);
        } else if (err.status === 401) {
          setErrMsg(err.data.message);
        } else {
          setErrMsg('Login Failed');
        }
      }
    };
    getCred();
  };

  return (
    <div className="wrapper-login">
      <div className="title">
        <p>Login</p>
        <p className={`${errMsg ? 'err-alert' : 'offscreen'}`}>{errMsg}</p>
      </div>
      <form className="__form" autoComplete="off">
        <input
          className="__input"
          name="username"
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="__input"
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="__btn" onClick={(e) => handleSubmit(e)}>
          Lets go!
        </button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default Login;
