import './studentDetail.css';
import profile from '../../../assets/icons/user.svg';

import { useNavigate, useParams } from 'react-router-dom';

import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from '../redux/studentApiSlice';
import Loader from '../../../components/loader/Loader';

const StudentDetail = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const { student } = useGetStudentsQuery('studentList', {
    selectFromResult: ({ data }) => ({
      student: data?.entities[studentId],
    }),
  });

  const [deleteStudent, { isLoading: iLDStudent, isError: iEDStudent }] =
    useDeleteStudentMutation();

  const deleteStudentHandler = (id) => {
    const delStudent = async () => {
      try {
        if (confirm('anda yakin ingin menhapus santri ini?')) {
          await deleteStudent({ id });
          navigate('/students');
        }
      } catch (error) {
        console.log(error);
      }
    };

    delStudent();
  };

  if (!student) return <Loader />;

  const buttonDeleteStudent = (
    <button
      className="delete"
      onClick={() => deleteStudentHandler(student._id)}
      style={{ width: 'min-content', backgroundColor: 'red' }}
    >
      Delete
    </button>
  );

  let content = (
    <div className="description">
      <div className="top">
        <h1>Profile</h1>
      </div>
      <div className="bottom">
        <p>{student.role}</p>
        <p>{student.username}</p>
        <p>{student.phone}</p>
        {buttonDeleteStudent}
      </div>
    </div>
  );

  return (
    <div className="container-student-detail">
      <div className="wrapper">
        <div className="profile">
          <img src={profile} alt="error" />
        </div>
        {content}
      </div>
      <div>
        <h3 style={{ marginBottom: '.5em' }}>Statistik</h3>
        <div className="stats">
          <article>
            <div>
              <p>Lulus</p>
              <p> 20</p>
            </div>
          </article>
          <article>
            <div>
              <p>Gagal</p>
              <p>20</p>
            </div>
          </article>
        </div>
      </div>
      {iLDStudent && <Loader />}
      {iEDStudent && <h1>Gagal Menghapus siswa</h1>}
    </div>
  );
};

export default StudentDetail;
