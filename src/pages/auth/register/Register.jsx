import './register.css';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Loader from '../../../components/loader/Loader';

import { useRegisterMutation } from '../../user/redux/userApiSlice';
import { setCredentials } from '../redux/authSlice';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(username);
  }, [username]);

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = (e) => {
    e.preventDefault();
    const getCred = async () => {
      try {
        const res = await register({
          username,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        // navigate('/');
      } catch (err) {
        console.error(err?.data?.message || err.error);
      }
    };
    getCred();
  };

  return (
    <div className="wrapper">
      <div className=" register">
        <div className="title">Sign Up</div>
        <form className="__form" onSubmit={submitHandler}>
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
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button className="__btn">Lets go!</button>
        </form>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Register;
