import './newStudent.css';

import { useEffect, useState } from 'react';

import Loader from '../../../components/loader/Loader.jsx';

import { useAddNewStudentMutation } from '../redux/studentApiSlice.js';

const NewStudent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);

  const [addNewStudent, { isLoading, isError, error }] =
    useAddNewStudentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const addStudent = async () => {
      try {
        const res = await addNewStudent({
          username,
          password,
        }).unwrap();
        alert(`${res.message}`);
        setUsername('');
        setPassword('');
      } catch (err) {
        alert(`${username} gagal ditambahkan`);
      }
    };
    addStudent();
  };

  useEffect(() => {
    setErr(null);
  }, [username, password]);

  useEffect(() => {
    if (isError) {
      setErr(error.data.message);
    }
  }, [isError, error]);

  return (
    <div className="container-student-new">
      <form onSubmit={handleSubmit} className="wrapper">
        <div className="title">
          <h1 style={{ fontSize: '1em' }}>New Student</h1>
          {err && <p style={{ fontSize: '.4em', color: 'red' }}>{err}</p>}
        </div>

        <div className="inputBox">
          <input
            name="username"
            type="text"
            required="required"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Username</span>
        </div>

        <div className="inputBox">
          <input
            name="password"
            type="text"
            required="required"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </div>

        <button className="enter">Enter</button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};

export default NewStudent;
