import './studentList.css';

import addIcon from '../../../assets/icons/add.svg';

import { useState, lazy } from 'react';

import ButtonIcon from '../../../components/button/ButtonIcon.jsx';
import { Student } from './components/Student.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import Error from '../../../components/error/Error.jsx';

import { useGetStudentsQuery } from '../redux/studentApiSlice.js';
import useAuth from '../../../hooks/useAuth.js';

const NewStudent = lazy(() => import('./components/newStudent/NewStudent.jsx'));

const StudentList = () => {
  const [screen, setScreen] = useState(false);

  const authUser = useAuth();

  const { data, isSuccess, isLoading, isError, error } = useGetStudentsQuery(
    'studentList',
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  let content;

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { ids, entities } = data;

    let filteredIds;

    if (authUser.isStudent) {
      const authUserId = Object.values(entities).find(
        (e) => e.username === authUser.username
      )?.id;

      filteredIds = ids.filter((studentId) => studentId !== authUserId);
    } else {
      filteredIds = ids;
    }

    content = filteredIds.length ? (
      filteredIds.map((studentId) => (
        <Student
          key={studentId}
          studentId={studentId}
          isMentor={authUser.isMentor}
        />
      ))
    ) : (
      <h4>Belum ada siswa</h4>
    );
  } else if (isError) {
    return <Error message={error.data?.message} />;
  }

  const handleClose = (e) => {
    if (e.target.className === 'container-student-new') {
      setScreen(false);
    }
  };

  return (
    <div className="container-students">
      <ul className="students">{content}</ul>

      {screen && (
        <div className="container-student-new" onClick={handleClose}>
          <NewStudent setScreen={setScreen} />
        </div>
      )}

      <div onClick={() => setScreen(true)}>
        <ButtonIcon text="NEW">
          <img src={addIcon} />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default StudentList;
