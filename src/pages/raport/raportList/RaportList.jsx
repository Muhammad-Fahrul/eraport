import './raportList.css';

import { useNavigate, useParams, useLocation } from 'react-router-dom';

import addIcon from '../../../assets/icons/add.svg';

import Raport from './components/Raport';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import ButtonIcon from '../../../components/button/ButtonIcon';
import NewRaport from './components/newRaport/NewRaport';
import Loader from '../../../components/loader/Loader';
import Error from '../../../components/error/Error';
import { useGetRaportsByUsernameQuery } from '../redux/raportApiSlice';
import RaportDetail from './components/raportDetail/RaportDetail';

const RaportList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuth();
  const [screen, setScreen] = useState(false);
  const [detailRaport, setDetailRaport] = useState({});
  const [screenNR, setScreenNR] = useState(false);
  const { username } = useParams();

  const { data, isSuccess, isLoading, isError, error } =
    useGetRaportsByUsernameQuery(username);

  const handleDetail = (id) => {
    const detailRaport = data.raports.find((raport) => raport._id === id);

    setDetailRaport(detailRaport);
    setScreen(true);
  };

  const previousPath = location.state && location.state.from.pathname;

  let content;
  if (isLoading) {
    return <Loader />;
  } else if (isSuccess) {
    const { raports } = data;

    content = raports?.length
      ? raports.map((raport) => (
          <Raport
            key={raport._id}
            raport={raport}
            handleDetail={handleDetail}
          />
        ))
      : null;
  } else if (isError) {
    return <Error message={error.data?.message} />;
  }

  return (
    <div className="container-raport">
      <div className="top">
        <h1 className="username">
          <span>{username}</span> record
        </h1>
        <button className="back" onClick={() => navigate(previousPath)}>
          <p>&lt;</p>
        </button>
      </div>
      <table className="table-raport">
        <thead>
          <tr>
            <th>Chapter</th>
            <th>Verse</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {screen && <RaportDetail raport={detailRaport} setScreen={setScreen} />}
      {currentUser?.isMentor && (
        <div onClick={() => setScreenNR(true)}>
          <ButtonIcon text="NEW">
            <img src={addIcon} />
          </ButtonIcon>
        </div>
      )}
      {screenNR && <NewRaport setScreenNR={setScreenNR} />}
    </div>
  );
};

export default RaportList;
