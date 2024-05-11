import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

import { selectCurrentToken } from '../pages/auth/redux/authSlice';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isMentor = false;
  let isStudent = false;
  let status = 'student';

  if (token) {
    const decoded = jwtDecode(token);
    const { username, role, urlImg } = decoded.UserInfo;

    isMentor = role === 'mentor';
    isStudent = role === 'student';

    if (isMentor) status = 'mentor';
    if (isStudent) status = 'student';

    return { username, role, status, isMentor, isStudent, urlImg };
  }

  return { username: '', role: null, isMentor, isStudent, status };
};
export default useAuth;
