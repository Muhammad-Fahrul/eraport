import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ roles }) => {
  const location = useLocation();
  const { role } = useAuth();

  const content = roles.includes(role) ? (
    <Outlet />
  ) : !role ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/notfound" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
