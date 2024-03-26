import './raportDetail.css';
import deleteIcon from '../../../../../assets/icons/delete.svg';

import { useState } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../../../../components/loader/Loader';

import { useDeleteRaportMutation } from '../../../redux/raportApiSlice';

const RaportDetail = ({ raport, setScreen }) => {
  const [error, setError] = useState(null);
  const [deleteRaport, { isLaoding }] = useDeleteRaportMutation();

  const handleClick = (e) => {
    if (e.target.className === 'container-raport-detail') {
      setScreen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm('anda yakin ingin menghapus record ini?')) {
        await deleteRaport({ id });
        setScreen(false);
      }
    } catch (error) {
      setError(error?.data.message);
    }
  };

  return (
    <div className="container-raport-detail" onClick={handleClick}>
      <div className="wrapper">
        {error && <p>{error}</p>}
        <div>
          <h3>Detail</h3>
          <button className="delete" onClick={() => handleDelete(raport._id)}>
            <img src={deleteIcon} />
          </button>
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

export default RaportDetail;
