import './studentList.css';

import { useState } from 'react';

import { Student } from './components/student/Student.jsx';
import { NewStudent } from './components/newStudent/NewStudent.jsx';

import Loader from '../../../components/loader/Loader.jsx';
import Error from '../../../components/error/Error.jsx';

import {
  useGetGroupsQuery,
  useGetStudentsByMentorIdQuery,
} from '../redux/studentApiSlice.js';
import NewStudents from './components/newStudents/NewStudents.jsx';

const StudentList = () => {
  const [screen, setScreen] = useState(false);
  const [screen2, setScreen2] = useState(true);
  const [stdsByGroupId, setStdsByGroupId] = useState('');
  const [searchName, setSearchName] = useState('');

  const { data, isSuccess, isLoading, isError, error } =
    useGetStudentsByMentorIdQuery('studentList', {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const {
    data: allGroup,
    isSuccess: iSG,
    isLoading: iLG,
  } = useGetGroupsQuery();

  const handleClose = (e) => {
    if (e.target.className === 'container-student-new') {
      setScreen(false);
      setScreen2(false);
    }
  };

  let content;

  let groupNamesEl;

  if (isLoading || iLG) {
    return <Loader />;
  } else if (isSuccess || iSG) {
    const { ids, entities } = data;
    const { groups } = allGroup;

    const stdIdsToRemove = groups
      .filter((g) => g._id === stdsByGroupId)[0]
      ?.students.map((s) => s.id);

    let filteredEntities = stdIdsToRemove?.length
      ? Object.values(entities).filter((s) => stdIdsToRemove.includes(s._id))
      : Object.values(entities);

    let filteredIds = ids;

    let keysSearch = filteredEntities.map((student) => {
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

    groupNamesEl = groups.map((g) => (
      <li
        onClick={() => setStdsByGroupId(g._id)}
        className={`group-info ${stdsByGroupId === g._id ? 'active' : ''}`}
        key={g._id}
      >
        {g.groupName}
      </li>
    ));

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
        <button onClick={() => setStdsByGroupId('')}>
          <i className="fa-solid fa-remove"></i>
        </button>
      </div>
      <ul className="group-names">{groupNamesEl}</ul>
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
          {screen2 ? <NewStudent setScreen={setScreen} /> : <NewStudents />}
          <button
            style={{ padding: '.1em', width: '200px', color: 'blue' }}
            onClick={() => {
              setScreen2(!screen2);
            }}
          >
            add {screen2 ? 'multipe user here' : 'single user here'}
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
