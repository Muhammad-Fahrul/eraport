import './raportDetail.css';

import { useEffect } from 'react';

import deleteIcon from '../../../assets/icons/delete.svg';

import useAuth from '../../../hooks/useAuth';
import { useDeleteRaportMutation } from '../../../pages/raport/redux/raportApiSlice';

import PropTypes from 'prop-types';

import Loader from '../../loader/Loader';

const RaportDetail = ({ raport, setScreen }) => {
  const user = useAuth();

  const [deleteRaport, { isLaoding, isSuccess, isError, error }] =
    useDeleteRaportMutation();

  const handleClick = (e) => {
    if (e.target.className === 'container-raport-detail') {
      setScreen(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('anda yakin ingin menghapus record ini?')) {
      await deleteRaport({ id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setScreen(false);
    }
  }, [isSuccess, isError, setScreen]);

  if (isLaoding) {
    return <Loader />;
  }

  return (
    <div className="container-raport-detail" onClick={handleClick}>
      <div className="wrapper-raport-detail">
        {isError && <p>{error?.data?.message}</p>}
        <div>
          <h3>Detail</h3>
          {user.isMentor && (
            <button className="delete" onClick={() => handleDelete(raport._id)}>
              <img src={deleteIcon} />
            </button>
          )}
        </div>
        <div>
          <p>Chapter: {raport.chapter}</p>
          <p>Verse: {raport.verse}</p>
          {raport.status && <p className="success">Lulus</p>}
          {!raport.status && <p className="failed">Mengulang</p>}
        </div>

        <p>{raport.detail}</p>
      </div>
      {isLaoding && <Loader />}
    </div>
  );
};

RaportDetail.propTypes = {
  raport: PropTypes.object.isRequired,
  setScreen: PropTypes.func.isRequired,
};

export { RaportDetail };
