import { memo } from 'react';

import PropTypes from 'prop-types';
import { recordSanitizer } from '../../../utils/htmlGenerator';

const Record = ({ record, handleDetail }) => {
  const sanitizeRecord = recordSanitizer(record);

  return (
    <tr>
      <td>
        <button
          className="detail-raport-preview-btn"
          onClick={(e) => {
            e.preventDefault;
            handleDetail(record._id);
          }}
        >
          <i className="fa-solid fa-circle-info"></i>
        </button>
      </td>
      {sanitizeRecord.map((item) => {
        const { keyword, value } = item;
        return (
          <td key={value + keyword}>
            {Array.isArray(value) ? (
              <select>
                <option value={value[0]}>
                  {value[0]?.length > 7
                    ? `${value[0].slice(0, 7)}...`
                    : value[0]}
                </option>
              </select>
            ) : value?.length > 10 ? (
              value.slice(0, 10)
            ) : (
              value
            )}
          </td>
        );
      })}
    </tr>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
  handleDetail: PropTypes.func.isRequired,
};

const areEqual = (prevProp, nextProp) => {
  return prevProp.record._id === nextProp.record._id;
};

const memoizedRaport = memo(Record, areEqual);

export { memoizedRaport as Record };
