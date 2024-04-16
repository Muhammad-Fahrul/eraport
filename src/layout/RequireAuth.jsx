import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ roles }) => {
  const location = useLocation();
  const authUser = useAuth();

  const content = roles.includes(authUser.role) ? (
    <Outlet />
  ) : !authUser.role ? (
    <Navigate to="/eraport/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/eraport/notfound" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
