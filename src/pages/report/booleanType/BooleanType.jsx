import './booleanType.css';
import { useGetReportsQuery } from '../redux/reportApiSlice';
import RaportGroup from './components/raportGroup/RaportGroup';

const BooleanType = () => {
  const { data, error, isLoading } = useGetReportsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.data.message}</div>;

  const { data: raports } = data;

  return raports.length ? (
    <div className="student-reports">
      {raports.map((raport) => (
        <RaportGroup
          key={raport.raportId + raport.columnName}
          raportData={raport}
        />
      ))}
    </div>
  ) : (
    <p>No data availabe</p>
  );
};

export default BooleanType;
