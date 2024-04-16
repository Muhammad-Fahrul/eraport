import './profile.css';
import profile from '../../../assets/icons/user.svg';

import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Loader from '../../../components/loader/Loader';
import Button from '../../../components/button/Button';
import RaportTable from '../../../components/raportTable/RaportTable.jsx';

import useAuth from '../../../hooks/useAuth';
import { useGetUserQuery } from '../redux/userApiSlice';
import { useLogoutMutation } from '../../auth/redux/authApiSlice';
import { useDeleteStudentMutation } from '../../student/redux/studentApiSlice';

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

  const [deleteStudent, { isLoading: iLD, isError: iED, error: eD }] =
    useDeleteStudentMutation();

  const [logout, { isLoading: iLL, isError: iEL, error: eL }] =
    useLogoutMutation();

  const handleLogout = () => {
    const removeCred = async () => {
      try {
        if (confirm('anda yakin ingin keluar?')) {
          await logout().unwrap();
          navigate('/eraport/login');
        }
      } catch (err) {
        console.error(err);
      }
    };
    removeCred();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm(`anda yakin ingin menghapus ${userDisplayed.username}?`)) {
      try {
        await deleteStudent({ id: userDisplayed._id });
        navigate(previousPath, { replace: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  let content;

  let errorMsg = '';

  if (isLoading || iLL || iLD) {
    return <Loader />;
  } else if (isSuccess) {
    const buttonAuthUser = userDisplayed.username === authUser.username && (
      <div>
        <button onClick={() => navigate(`edit`, { state: { from: location } })}>
          <i className="fa-solid fa-gear"></i>
        </button>
        <button onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    );

    const button = userDisplayed.username === authUser.username && (
      <Button
        url="/eraport/students"
        text={authUser.isMentor ? 'Students' : 'Friends'}
      />
    );

    const buttonDeleteStudent = authUser.role === 'mentor' &&
      userDisplayed.username !== authUser.username && (
        <button className="button-delete-student" onClick={handleDelete}>
          delete
        </button>
      );

    content = (
      <div className="description">
        <div className="top">
          <h1>Profile</h1>
          {buttonAuthUser}
        </div>
        <div className="bottom">
          <table>
            <tbody>
              <tr>
                <th>
                  <i className="fa-solid fa-user-tie"></i>
                </th>
                <td>{userDisplayed.role}</td>
              </tr>
              <tr>
                <th>
                  <i className="fa-solid fa-signature"></i>
                </th>
                <td>{userDisplayed.username}</td>
              </tr>
              <tr>
                <th>
                  <i className="fa-solid fa-phone"></i>
                </th>
                <td>{userDisplayed.phone}</td>
              </tr>
            </tbody>
          </table>
          <div className="button-profile">{button || buttonDeleteStudent}</div>
        </div>
      </div>
    );
  } else if (isError || iEL || iLD) {
    if (isError) {
      errorMsg = error.data.message;
    } else if (iEL) {
      errorMsg = eL.data.message;
    } else if (iED) {
      errorMsg = eD.data.message;
    } else {
      return <h1>Error</h1>;
    }
  }

  return (
    <div className="container-user-profile">
      {errorMsg && <h1>{errorMsg}</h1>}
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
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      )}
      <div className="wrapper">
        <div className="profile">
          <img
            className="img-profile"
            src={userDisplayed.urlImgProfile || profile}
          />
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
                  <p>{userDisplayed.poin}</p>
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
    </div>
  );
};

export default Profile;
