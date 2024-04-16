import infoIcon from '../../../assets/icons/info.svg';

import PropTypes from 'prop-types';

const Raport = ({ raport, handleDetail }) => {
  return (
    <tr key={raport._id}>
      <td>{raport.chapter}</td>
      <td>{raport.verse}</td>

      <td>
        {raport.status && <span className="status success"></span>}
        {!raport.status && <span className="status fail"></span>}
      </td>
      <td
        style={{ cursor: 'pointer' }}
        onClick={() => {
          handleDetail(raport._id);
        }}
      >
        <img src={infoIcon} alt="" />
      </td>
    </tr>
  );
};

Raport.propTypes = {
  raport: PropTypes.object.isRequired,
  handleDetail: PropTypes.func.isRequired,
};

export default Raport;
