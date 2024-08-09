import './newRecord.css';

import PropTypes from 'prop-types';

import { useAddRecordMutation } from '../../../redux/recordApiSlice';
import { useEffect, useRef, useState } from 'react';

const NewRecord = ({
  raportName,
  studentId,
  raportId,
  columns,
  setScreenNR,
  prevRecord,
}) => {
  const [input, setInput] = useState({});
  const inpRef = useRef();

  const [addRecord, { isSuccess, isError, error }] = useAddRecordMutation();

  const handleChange = (name, value, type) => {
    setInput((prevInputs) => {
      if (type === 'checkbox') {
        const currentValues = prevInputs[name] || [];
        const updatedValues = currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value];

        return {
          ...prevInputs,
          [name]: updatedValues,
        };
      }

      return {
        ...prevInputs,
        [name]: value,
      };
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addRecord({ studentId, raportId, ...input });
    } catch (error) {
      console.log(error.data);
    }
  };

  useEffect(() => {
    inpRef.current.focus();
  }, []);

  useEffect(() => {
    if (prevRecord) {
      columns.map((item) => {
        if (item.columnType === 'string' || item.columnType === 'number') {
          setInput((prevInputs) => {
            return {
              ...prevInputs,
              [item.columnName]: prevRecord[item.columnName],
            };
          });
        }
      });
    }
  }, [prevRecord, columns]);

  useEffect(() => {
    if (isSuccess) {
      setScreenNR(false);
    }
  }, [isSuccess, setScreenNR]);

  let form = columns.map((item, i) => {
    if (item.columnType === 'boolean') {
      return (
        <div className="inputBox" key={item._id}>
          <select
            required
            onChange={(e) => handleChange(item.columnName, e.target.value)}
          >
            <option value="">--{item.columnName}--</option>
            <option value={item.trueValue}>{item.trueValue}</option>
            <option value={item.falseValue}>{item.falseValue}</option>
          </select>
        </div>
      );
    } else if (item.columnType === 'array') {
      return (
        <div className="inputBox" key={item._id}>
          <label htmlFor="">{item.columnName}</label>
          <div className="array-opt">
            {item.arrayValues.map((k) => (
              <div className="array-item" key={k}>
                <input
                  type="checkbox"
                  value={k}
                  name={k}
                  id={k}
                  onChange={(e) =>
                    handleChange(item.columnName, e.target.value, 'checkbox')
                  }
                />
                <label htmlFor={k}>{k}</label>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="inputBox" key={item._id}>
          <label htmlFor={item.columnName}>{item.columnName}</label>

          <input
            ref={i == 0 ? inpRef : null}
            type={item.columnType}
            onChange={(e) => handleChange(item.columnName, e.target.value)}
            value={input[item.columnName] || ''}
          />
        </div>
      );
    }
  });

  return (
    <div className="container-raport-new">
      <form className="wrapper" onSubmit={handleAdd} autoComplete="off">
        <h5>{raportName}</h5>
        {isError && <p>{error?.data?.message || 'muat ulang'}</p>}
        {form}
        <button className="enter">Add</button>
        <span className="close" onClick={() => setScreenNR(false)}>
          <i className="fa-solid fa-circle-xmark"></i>
        </span>
      </form>
    </div>
  );
};

NewRecord.propTypes = {
  raportName: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  raportId: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  setScreenNR: PropTypes.func.isRequired,
  prevRecord: PropTypes.object,
};

export { NewRecord };
