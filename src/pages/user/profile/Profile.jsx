import './profile.css';
import profile from '../../../assets/icons/user.svg';
import logoutIcon from '../../../assets/icons/logout.svg';
import editIcon from '../../../assets/icons/settings.svg';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loader from '../../../components/loader/Loader';
import Button from '../../../components/button/Button';

import useAuth from '../../../hooks/useAuth';
import { useGetUserQuery } from '../redux/userApiSlice';
import { useLogoutMutation } from '../../auth/redux/authApiSlice';
import NotFound from '../../public/notFound/NotFound';
import RaportTable from '../../../components/raportTable/RaportTable';

const Profile = () => {
  const authUser = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();
  const location = useLocation();

  const previousPath = location.state && location.state.from.pathname;

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

    const button = userDisplayed.username === authUser.username && (
      <Button
        url="/students"
        text={authUser.isMentor ? 'Students' : 'Friends'}
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
          {button}
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
      {authUser.username !== username && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1em',
            marginBottom: '.5em',
          }}
        >
          <span
            style={{ height: '2px', border: '1px dashed black', flex: '2' }}
          />
          <button
            className="back"
            onClick={() => navigate(previousPath, { replace: true })}
          >
            <p>&lt;</p>
          </button>
        </div>
      )}
      <div className="wrapper">
        <div className="profile">
          <img src={profile} alt="error" />
        </div>
        {content}
      </div>
      {(userDisplayed.role === 'student' || authUser.isStudent) && (
        <>
          <h3 style={{ marginBlock: '.5em' }}>Statistik</h3>
          <div>
            <div className="stats">
              <article>
                <div>
                  <p>Poin</p>
                  <p> </p>
                </div>
              </article>
              <article>
                <div>
                  <p>Lulus</p>
                  <p> {userDisplayed.success}</p>
                </div>
              </article>
              <article>
                <div>
                  <p>Gagal</p>
                  <p>{userDisplayed.fail}</p>
                </div>
              </article>
            </div>
          </div>
          {authUser.username === username && (
            <>
              <h3 style={{ marginBlock: '.5em' }}>My Raport</h3>
              <RaportTable username={username} />
            </>
          )}
        </>
      )}
      {iELogout && <h1>Gagal Keluar</h1>}
      {iLLogout && <Loader />}
    </div>
  );
};

export default Profile;
