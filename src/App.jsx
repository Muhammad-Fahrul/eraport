import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import store from './app/store.js';
import { ROLES } from './config/roles.js';
import { lazyLoad } from './lazyLoad.js';

import MainLayout from './layout/MainLayout';
import PersistLogin from './layout/PersistLogin.jsx';
import RequireAuth from './layout/RequireAuth.jsx';
import Prefetch from './layout/Prefetch.jsx';

const NotFound = lazyLoad('pages/public/notFound/NotFound');
const Login = lazyLoad('pages/auth/login/Login');

const Home = lazyLoad('pages/user/home/Home');
const Profile = lazyLoad('pages/user/profile/Profile');
const EditUser = lazyLoad('pages/user/editUser/EditUser');

// const StudentList = lazyLoad('pages/student/studentList/StudentList');
// const RaportList = lazyLoad('pages/raport/raportList/RaportList');

const allRoles = [...Object.values(ROLES)];

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/eraport" element={<MainLayout />}>
            <Route path="login" element={<Login />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth roles={allRoles} />}>
                <Route element={<Prefetch />}>
                  <Route index element={<Home />} />
                  <Route path=":username" element={<Profile />} />
                  <Route path=":username/edit" element={<EditUser />} />
                  {/* <Route path="students">
                    <Route index element={<StudentList />} />
                    <Route path=":username/raports" element={<RaportList />} />
                  </Route> */}
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
