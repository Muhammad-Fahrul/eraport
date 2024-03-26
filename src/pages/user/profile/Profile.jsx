import './profile.css';
import profile from '../../../assets/icons/user.svg';
import logoutIcon from '../../../assets/icons/logout.svg';
import editIcon from '../../../assets/icons/settings.svg';

import { useNavigate, useParams } from 'react-router-dom';

import Loader from '../../../components/loader/Loader';
import Button from '../../../components/button/Button';

import useAuth from '../../../hooks/useAuth';
import { useGetUserQuery } from '../redux/userApiSlice';
import { useLogoutMutation } from '../../auth/redux/authApiSlice';
import NotFound from '../../public/notFound/NotFound';

const Profile = () => {
  const authUser = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();

  const {
    data: userDisplayed,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUserQuery(username);

  const [logout, { isLoading: iLLogout, isError: iELogout }] =
    useLogoutMutation();

  const logoutHandler = () => {
    const removeCred = async () => {
      try {
        if (confirm('anda yakin ingin keluar?')) {
          await logout().unwrap();
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    };
    removeCred();
  };

  let content;

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const buttonAuthUser = userDisplayed.username === authUser.username && (
      <div>
        <button onClick={() => navigate(`/${authUser.username}/edit`)}>
          <img title="edit" src={editIcon} alt="" />
        </button>
        <button onClick={logoutHandler}>
          <img title="logout" src={logoutIcon} alt="" />
        </button>
      </div>
    );

    const buttonMentor = userDisplayed.username === authUser.username &&
      authUser.role === 'mentor' && <Button url="/students" text="Students" />;

    const buttonStudent = userDisplayed.username === authUser.username &&
      authUser.role === 'student' && (
        <Button
          url={`/students/${userDisplayed.username}/raports`}
          text="Raport"
        />
      );

    content = (
      <div className="description">
        <div className="top">
          <h1>Profile</h1>
          {buttonAuthUser}
        </div>
        <div className="bottom">
          <p>{userDisplayed.role}</p>
          <p>{userDisplayed.username}</p>
          <p>{userDisplayed.phone}</p>
          {buttonMentor}
          {buttonStudent}
        </div>
      </div>
    );
  } else if (isError) {
    if (error.status === 400) {
      return <NotFound />;
    }
    return <h1>{error.data.message}</h1>;
  }

  return (
    <div className="container-user-profile">
      <div className="wrapper">
        <div className="profile">
          <img src={profile} alt="error" />
        </div>
        {content}
      </div>
      {iELogout && <h1>Gagal Keluar</h1>}
      {iLLogout && <Loader />}
    </div>
  );
};

export default Profile;
