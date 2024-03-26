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
        {raport.detail.split('').slice(0, 6).join('') + '...'}
      </td>
    </tr>
  );
};

Raport.propTypes = {
  raport: PropTypes.object.isRequired,
  handleDetail: PropTypes.func.isRequired,
};

export default Raport;
