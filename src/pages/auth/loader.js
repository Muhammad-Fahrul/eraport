import { redirect } from 'react-router-dom';

const loader = async () => {
  const isLogin = JSON.parse(localStorage.getItem('login'));
  if (isLogin) {
    throw redirect('/eraport', { replace: true });
  }
  return null;
};

export { loader };
