import './streakComponent.css';

import PropTypes from 'prop-types';

const StreakDisplay = ({ streakCount, lastPracticeDate }) => {
  return (
    <div className="streak-container">
      <div className="streak-count-container">
        <span>
          <i className="fa-solid fa-fire"></i>
        </span>
        <span>
          {streakCount} <span className="streak-text-sm">runtutan hari</span>
        </span>
      </div>
      <p className="last-practice">
        Last practice on {new Date(lastPracticeDate).toLocaleDateString()}
      </p>
    </div>
  );
};

StreakDisplay.propTypes = {
  streakCount: PropTypes.number.isRequired,
  lastPracticeDate: PropTypes.object.isRequired,
};

export default StreakDisplay;
