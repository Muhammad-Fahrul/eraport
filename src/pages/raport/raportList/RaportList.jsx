import './raportList.css';

import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import ButtonIcon from '../../../components/button/ButtonIcon';

import { RaportTable } from '../../../components/raportTable/RaportTable.jsx';
import { NewRaport } from './components/newRaport/NewRaport.jsx';
import Back from '../../../components/button/back/Back.jsx';

const RaportList = () => {
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
        <Back previousPath={previousPath} />
      </div>

      <RaportTable username={username} />

      {screenNR && <NewRaport setScreenNR={setScreenNR} />}

      {currentUser?.isMentor && (
        <div onClick={() => setScreenNR(true)}>
          <ButtonIcon text="NEW">
            <i className="fa-solid fa-plus"></i>
          </ButtonIcon>
        </div>
      )}
    </div>
  );
};

export default RaportList;
