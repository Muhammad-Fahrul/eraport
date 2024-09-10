import './studentList.css';

import { useState } from 'react';

import { Student } from './components/student/Student.jsx';

import Loader from '../../../components/loader/Loader.jsx';
import Error from '../../../components/error/Error.jsx';

import { useGetStudentsByMentorIdQuery } from '../redux/studentApiSlice.js';

const StudentList = () => {
  const [screen, setScreen] = useState(false);
  const [screen2, setScreen2] = useState(true);
  const [searchName, setSearchName] = useState('');

  const { data, isSuccess, isLoading, isError, error } =
    useGetStudentsByMentorIdQuery('studentList', {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const handleClose = (e) => {
    if (e.target.className === 'container-student-new') {
      setScreen(false);
      setScreen2(false);
    }
  };

  let content;

  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { ids, entities } = data;

    let filteredEntities = entities;

    let filteredIds = ids;

    let keysSearch = Object.values(filteredEntities).map((student) => {
      if (!searchName.length) {
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
        <Student key={studentId} studentId={studentId} />
      ))
    ) : (
      <h4>No Student</h4>
    );
  } else if (isError) {
    return <Error message={error.data?.message} />;
  }

  return (
    <div className="container-students">
      <div className="title">
        <h3>STUDENTS</h3>
        <button onClick={() => setScreen(true)}>
          <i className="fa-solid fa-plus"></i>
        </button>
        <button onClick={() => setScreen(true)}>
          <i className="fa-solid fa-users"></i>
        </button>
      </div>

      <ul className="students">{content}</ul>
    </div>
  );
};

export default StudentList;
