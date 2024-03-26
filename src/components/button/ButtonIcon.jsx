import './buttonIcon.css';
import PropTypes from 'prop-types';

const ButtonIcon = ({ children, text }) => {
  return (
    <button className="Btn">
      <div className="sign">{children}</div>
      <div className="text">{text}</div>
    </button>
  );
};

ButtonIcon.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default ButtonIcon;
