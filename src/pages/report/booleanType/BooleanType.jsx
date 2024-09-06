import './booleanType.css';
import { useGetReportsQuery } from '../redux/reportApiSlice';
import RaportGroup from './components/raportGroup/RaportGroup';
import DateSelector from './components/dateSelector/DateSelector';
import { useState } from 'react';

// Component for date selection

const BooleanType = () => {
  const currentMonthIndex = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Set the selected state to month index and year
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data, error, isLoading } = useGetReportsQuery({
    month: selectedMonth,
    year: selectedYear,
  });

  // Handlers for changing month and year
  const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value)); // Ensure it's a number
  const handleYearChange = (e) => setSelectedYear(Number(e.target.value));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.data.message}</div>;

  const raports = data?.data || []; // Ensure raports is safely accessed

  return (
    <div className="student-reports">
      {/* Render the DateSelector for month and year input */}
      <DateSelector
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />

      {/* Display reports based on selected month and year */}
      {raports.length ? (
        raports.map((raport) => (
          <RaportGroup
            key={raport.raportId + raport.columnName + raport.name}
            raportData={raport}
            entryValue={raport.columnAnalytics[0].columnValue}
          />
        ))
      ) : (
        <p>No records found for the selected month and year.</p>
      )}
    </div>
  );
};

export default BooleanType;
