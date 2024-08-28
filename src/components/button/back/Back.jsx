import './back.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Back = ({ classIcon, previousPath }) => {
  const navigate = useNavigate();
  return (
    <button
      className="back"
      onClick={() => navigate(previousPath, { replace: true })}
    >
      <i className={classIcon}></i>
    </button>
  );
};

Back.propTypes = {
  classIcon: PropTypes.string.isRequired,
  previousPath: PropTypes.string.isRequired,
};

export default Back;
