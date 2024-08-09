import PropTypes from 'prop-types';
import { useState } from 'react';

const RaportGroup = ({ raportData }) => {
  const [selectedValue, setSelectedValue] = useState(
    raportData.columnAnalytics[0].columnValue
  );

  const handleValueChange = (e) => {
    setSelectedValue(Number(e.target.value));
  };

  const selectedAnalytics = raportData.columnAnalytics.find(
    (analytics) => analytics.columnValue === selectedValue
  );

  return (
    <div className="report-group">
      <h3>
        {raportData.raportName} - {raportData.columnName}
      </h3>
      <select onChange={handleValueChange} value={selectedValue}>
        {raportData.columnAnalytics.map((analytics) => (
          <option key={analytics.columnValue} value={analytics.columnValue}>
            {analytics.columnValue}
          </option>
        ))}
      </select>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {selectedAnalytics.students[0].columnStatic.map((val) =>
                Object.keys(val.value).map((k, i) => (
                  <th key={val + k + i}>{k}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {selectedAnalytics.students.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentName}</td>
                {student.columnStatic.map((key) =>
                  Object.values(key.value).map((k, i) => (
                    <td key={key.columnName + k + i}>{k}</td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RaportGroup.propTypes = {
  raportData: PropTypes.object.isRequired,
};

export default RaportGroup;
