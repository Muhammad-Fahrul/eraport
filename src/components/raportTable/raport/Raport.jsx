import { memo } from 'react';

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
        <i className="fa-solid fa-circle-info"></i>
      </td>
    </tr>
  );
};

Raport.propTypes = {
  raport: PropTypes.object.isRequired,
  handleDetail: PropTypes.func.isRequired,
};

const areEqual = (prevProp, nextProp) => {
  return prevProp.raport_id === nextProp.raport_id;
};

const memoizedRaport = memo(Raport, areEqual);

export { memoizedRaport as Raport };
