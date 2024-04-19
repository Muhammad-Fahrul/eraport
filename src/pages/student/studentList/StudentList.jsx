import './studentList.css';

import addIcon from '../../../assets/icons/add.svg';

import { useState } from 'react';

import ButtonIcon from '../../../components/button/ButtonIcon.jsx';
import { Student } from './components/student/Student.jsx';
import { NewStudent } from './components/newStudent/NewStudent.jsx';

import Loader from '../../../components/loader/Loader.jsx';
import Error from '../../../components/error/Error.jsx';

import { useGetStudentsQuery } from '../redux/studentApiSlice.js';
import useAuth from '../../../hooks/useAuth.js';

const StudentList = () => {
  const [screen, setScreen] = useState(false);
  const [searchName, setSearchName] = useState('');

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

    console.log(searchName);

    let keysSearch = Object.values(entities).map((student) => {
      if (searchName.length <= 0) {
        return student.id;
      } else if (
        student.username
          .toLocaleLowerCase()
          .includes(searchName.toLocaleLowerCase())
      ) {
        return student.id;
      }
    });

    let searchedIds = keysSearch
      .filter((item) => item !== undefined)
      .map((keyId) => {
        return filteredIds.filter((id) => id === keyId)[0];
      });

    content = searchedIds.length ? (
      searchedIds.map((studentId) => (
        <Student
          key={studentId}
          studentId={studentId}
          isMentor={authUser.isMentor}
        />
      ))
    ) : (
      <h4>No Student</h4>
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
      <form className="form-search">
        <span className="search-icon-container">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="search"
          placeholder="Search by Name"
          onChange={(e) => setSearchName(e.target.value)}
          value={searchName}
        />
      </form>
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
