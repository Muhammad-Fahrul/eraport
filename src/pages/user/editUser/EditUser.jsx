import './editUser.css';

import { useState } from 'react';

const EditUser = () => {
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    oldpassword: '',
    newpassword: '',
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  //   const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     if (password !== conPassword) {
  //       alert("Passwords does not match");
  //     } else {
  //       try {
  //         const res = await updateUser({
  //           _id: userInfo._id,
  //           fullname,
  //           nickname,
  //           phoneNumber,
  //           password,
  //         }).unwrap();
  //         dispacth(setCredentials(res));
  //         alert("Profile updated successfully");
  //         navigate(`/me/${userInfo._id}`);
  //       } catch (err) {
  //         alert(err?.data?.message || err.error);
  //       }
  //     }
  //   };

  return (
    <div className="container-user-edit">
      <form className="wrapper" autoComplete="off">
        <h1 className="title">Update Profile</h1>
        {/* {isError && <h3>{error.data.message}</h3>} */}
        <div>
          <label>
            <input
              name="firstname"
              type="text"
              className="input"
              value={state.firstname}
              onChange={handleChange}
            />
            <span>Fullname</span>
          </label>

          <label>
            <input
              name="lastname"
              type="text"
              className="input"
              value={state.lastname}
              onChange={handleChange}
            />
            <span>Nickname</span>
          </label>
        </div>

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
            name="oldpassword"
            type="text"
            className="input"
            value={state.oldpassword}
            onChange={handleChange}
          />
          <span>Old Password</span>
        </label>

        <label>
          <input
            name="newpassword"
            type="text"
            className="input"
            value={state.newpassword}
            onChange={handleChange}
          />
          <span>New Password</span>
        </label>

        <button className="update">Update</button>
        {/* {isLoading && <Loader />} */}
      </form>
    </div>
  );
};

export default EditUser;
