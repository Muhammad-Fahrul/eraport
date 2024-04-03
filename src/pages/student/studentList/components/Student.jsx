import './student.css';

import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import bookIcon from '../../../../assets/icons/book.svg';

import { useGetStudentsQuery } from '../../redux/studentApiSlice';

const Student = ({ studentId, isMentor }) => {
  const navigate = useNavigate();

  const { student } = useGetStudentsQuery('studentList', {
    selectFromResult: ({ data }) => ({
      student: data?.entities[studentId],
    }),
  });

  const location = useLocation();

  const handleToRaport = () =>
    navigate(`/students/${student.username}/raports`, {
      state: { from: location },
    });

  const handleToDetail = () => {
    navigate(`/${student.username}`, {
      state: { from: location },
    });
  };

  let content = (
    <li className="container-student">
      <div className="top">
        <p className="description" onClick={handleToDetail}>
          {student.username}
        </p>
      </div>
      {isMentor && (
        <button className="raport-btn" title="raport" onClick={handleToRaport}>
          <img src={bookIcon} alt="raport" />
        </button>
      )}
    </li>
  );

  return <>{content}</>;
};

Student.propTypes = {
  studentId: PropTypes.string.isRequired,
  isMentor: PropTypes.bool.isRequired,
};

const memoizedStudent = memo(Student);

export { memoizedStudent as Student };
