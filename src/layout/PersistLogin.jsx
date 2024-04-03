import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '../components/loader/Loader';
import { useRefreshMutation } from '../pages/auth/redux/authApiSlice';
import { selectCurrentToken } from '../pages/auth/redux/authSlice';

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const navigate = useNavigate();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  /*eslint no-undef: "error"*/
  /*eslint-env node*/

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    content = (
      <div style={{ display: 'flex', gap: '.3em' }}>
        <p>{`${error?.data?.message} - `}</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
