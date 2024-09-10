import './raport.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../../components/loader/Loader.jsx';

import { Student } from './components/Student.jsx';
import {
  useAddStudentsToGroupMutation,
  useGetGroupByIdQuery,
  useGetStudentsByMentorIdQuery,
} from '../../student/redux/studentApiSlice.js';

const GroupStudents = () => {
  const [screen, setScreen] = useState(false);
  const [stds, setStds] = useState([]);
  const [searchName, setSearchName] = useState('');

  const { groupId } = useParams();

  const { data, isLoading, isSuccess, isError, error } =
    useGetGroupByIdQuery(groupId);

  const {
    data: AllStudent,
    isSuccess: iSStudents,
    isLoading: iLStudents,
    isError: iEStudents,
    error: eStudents,
  } = useGetStudentsByMentorIdQuery('studentList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [
    addStudentsToGroup,
    {
      isLoading: iLUpdate,
      isSuccess: iSAdd,
      isError: iEUpdate,
      error: eUpdate,
    },
  ] = useAddStudentsToGroupMutation(groupId);

  const onCheckboxClick = (student) => {
    setStds((prevStudents) => {
      if (prevStudents.some((s) => s.id === student.id)) {
        // Jika sudah ada, hapus dari array
        return prevStudents.filter((s) => s.id !== student.id);
      } else {
        // Jika belum ada, tambahkan ke array
        return [
          ...prevStudents,
          { id: student.id, username: student.username },
        ];
      }
    });
  };

  const onaddStudentsToGroup = async (e) => {
    e.preventDefault();
    try {
      const result = await addStudentsToGroup({ groupId, students: stds });
      console.log(result);
      if (result?.data?.status === 'success') {
        setStds([]);
      }
    } catch (error) {
      console.log(error?.data.message);
    }
  };

  useEffect(() => {
    if (iSAdd) {
      setScreen(false);
    }
  }, [iSAdd]);

  let groupEl;

  let studentsEl;

  let groupStdsEl;

  let loadingElement;

  if (isLoading || iLStudents || iLUpdate) {
    return <Loader />;
  } else if (isSuccess || iSStudents) {
    const { group } = data;
    const { ids, entities } = AllStudent;

    const stdIdsToRemove = group.students.map((s) => s.id);

    let filteredEntities = Object.values(entities).filter(
      (s) => !stdIdsToRemove.includes(s._id)
    );

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

    groupEl = <h1>{group.groupName}</h1>;

    groupStdsEl = group.students.length ? (
      group.students.map((s) => <Student key={s.id} studentId={s.id} />)
    ) : (
      <p>Tidak ada anggota</p>
    );

    studentsEl = searchedIds.length ? (
      searchedIds.map((studentId) => (
        <Student
          key={studentId}
          studentId={studentId}
          onCheckboxClick={onCheckboxClick}
          isChecked={stds.some((s) => s.id === studentId)}
        />
      ))
    ) : (
      <p>No Student</p>
    );
  } else if (isError || iEStudents) {
    return <p>{error?.data?.message}</p>;
  }

  return (
    <div className="container-raport">
      {loadingElement}
      <div>
        <div className="group-info">
          {groupEl}
          <button className="add-new" onClick={() => setScreen(!screen)}>
            <i className="fa-solid fa-add"></i>
          </button>
        </div>
        <h4>students</h4>
        <ul className="group-stds">{groupStdsEl}</ul>
      </div>
      {screen && (
        <div className="container-raport-group">
          <div className="group-forms">
            <button className="close-btn" onClick={() => setScreen(!screen)}>
              <i className="fa-solid fa-close"></i>
            </button>
            <form className="form-add" onSubmit={onaddStudentsToGroup}>
              <ul className="added-stds">
                {stds.map((std) => (
                  <li className="added-std" key={`added-${std.id}`}>
                    <span>{std.username}</span>
                  </li>
                ))}
              </ul>
              <button type="submit" disabled={!stds.length}>
                Add
              </button>
            </form>
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
            <ul className="students">{studentsEl}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupStudents;
