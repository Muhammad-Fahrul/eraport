import './editUser.css';

import { useState } from 'react';

import { useUpdateUserMutation } from '../redux/userApiSlice';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';

const EditUser = () => {
  const [state, setState] = useState({
    phone: '',
    oldPassword: '',
    newPassword: '',
  });
  const navigate = useNavigate();

  const authUser = useAuth();

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        phone: state.phone,
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      }).unwrap();
      alert('Profile updated successfully');
      navigate(`/${authUser.username}`);
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container-user-edit">
      <form className="wrapper" autoComplete="off" onSubmit={handleUpdate}>
        <h1 className="title">Update Profile</h1>
        {isError && <h3>{error.data.message}</h3>}

        <label>
          <input
            name="phone"
            type="number"
            className="input"
            value={state.phone}
            onChange={handleChange}
          />
          <span>Phone</span>
        </label>

        <label>
          <input
            name="oldPassword"
            type="text"
            className="input"
            value={state.oldPassword}
            onChange={handleChange}
          />
          <span>Old Password</span>
        </label>

        <label>
          <input
            name="newPassword"
            type="text"
            className="input"
            value={state.newPassword}
            onChange={handleChange}
          />
          <span>New Password</span>
        </label>

        <button className="update">Update</button>
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default EditUser;
