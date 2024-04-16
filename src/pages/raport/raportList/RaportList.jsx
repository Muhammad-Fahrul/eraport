import './raportList.css';

import { useNavigate, useParams, useLocation } from 'react-router-dom';

import addIcon from '../../../assets/icons/add.svg';

import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import ButtonIcon from '../../../components/button/ButtonIcon';
import NewRaport from '../../../components/newRaport/NewRaport';

import RaportTable from '../.';

const RaportList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuth();
  const [screenNR, setScreenNR] = useState(false);
  const { username } = useParams();

  const previousPath = location.state && location.state.from.pathname;

  return (
    <div className="container-raport">
      <div className="top">
        <h1 className="username">
          <span>{username}</span> record
        </h1>
        <button className="back" onClick={() => navigate(previousPath)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>

      <RaportTable username={username} />

      {screenNR && <NewRaport setScreenNR={setScreenNR} />}

      {currentUser?.isMentor && (
        <div onClick={() => setScreenNR(true)}>
          <ButtonIcon text="NEW">
            <img src={addIcon} />
          </ButtonIcon>
        </div>
      )}
    </div>
  );
};

export default RaportList;
