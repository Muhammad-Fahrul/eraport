import './recordTable.css';

import { memo, useCallback, useState } from 'react';

import { Record } from './record/Record';
import { RecordDetail } from './recordDetail/RecordDetail';

import PropTypes from 'prop-types';
import { recordSanitizer } from '../../utils/htmlGenerator';

const RecordTable = ({ raportStatus, records }) => {
  const [detailRecord, setDetailRecord] = useState({});
  const [screen, setScreen] = useState(false);

  const studentId = records[0].studentId;
  const raportId = records[0].raportId;

  const handleDetail = useCallback(
    (id) => {
      const detailRecord = records.find((record) => record._id === id);

      setDetailRecord(detailRecord);
      setScreen(true);
    },
    [records]
  );

  let initialElemen;

  let raportThead = (
    <>
      <th>info</th>
      {recordSanitizer(records[0]).map((item) => {
        return <th key={item.keyword}>{item.keyword}</th>;
      })}
    </>
  );

  let raportsBody = records.map((record) => (
    <Record key={record._id} record={record} handleDetail={handleDetail} />
  ));

  return (
    <div>
      <div className="container-table-raport">
        <table className="table-raport">
          <thead>
            <tr>{raportThead}</tr>
          </thead>
          <tbody>{raportsBody}</tbody>
        </table>
      </div>
      {initialElemen}

      {screen && (
        <RecordDetail
          studentId={studentId}
          raportId={raportId}
          raportStatus={raportStatus}
          record={detailRecord}
          setScreen={setScreen}
        />
      )}
    </div>
  );
};

RecordTable.propTypes = {
  raportStatus: PropTypes.bool.isRequired,
  records: PropTypes.array.isRequired,
};

const areEqual = (prevProp, nextProp) => {
  return (
    prevProp.raportStatus === nextProp.raportStatus &&
    prevProp.records.length === nextProp.records.length
  );
};

const memoizedRecordTable = memo(RecordTable, areEqual);

export { memoizedRecordTable as RecordTable };
