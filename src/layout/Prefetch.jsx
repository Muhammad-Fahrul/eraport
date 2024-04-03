import store from '../app/store';
import { studentApiSlice } from '../pages/student/redux/studentApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      studentApiSlice.util.prefetch('getStudents', 'studentList', {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
