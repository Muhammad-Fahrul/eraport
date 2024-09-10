import './student.css';
import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useGetStudentsByMentorIdQuery } from '../../../student/redux/studentApiSlice.js';

const Student = ({ studentId, onCheckboxClick, isChecked }) => {
  const navigate = useNavigate();

  const { student } = useGetStudentsByMentorIdQuery('studentList', {
    selectFromResult: ({ data }) => ({
      student: data?.entities[studentId],
    }),
  });

  const location = useLocation();

  const handleToDetail = () => {
    navigate(`${student.username}`, {
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
      {isChecked !== undefined && (
        <input
          type="checkbox"
          name=""
          id=""
          onChange={() =>
            onCheckboxClick({ id: student.id, username: student.username })
          }
          checked={isChecked}
        />
      )}
    </li>
  );

  return <>{content}</>;
};

Student.propTypes = {
  studentId: PropTypes.string.isRequired,
  on: PropTypes.string,
  isChecked: PropTypes.bool,
};

const memoizedStudent = memo(Student);

export { memoizedStudent as Student };
