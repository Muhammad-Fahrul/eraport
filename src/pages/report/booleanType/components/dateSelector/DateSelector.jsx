import './dateSelector.css';
// Store both the month name and its index
const months = [
  { name: 'January', index: 1 },
  { name: 'February', index: 2 },
  { name: 'March', index: 3 },
  { name: 'April', index: 4 },
  { name: 'May', index: 5 },
  { name: 'June', index: 6 },
  { name: 'July', index: 7 },
  { name: 'August', index: 8 },
  { name: 'September', index: 9 },
  { name: 'October', index: 10 },
  { name: 'November', index: 11 },
  { name: 'December', index: 12 },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years
const DateSelector = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className="filter-section">
      <label htmlFor="month-select">Month:</label>
      <select id="month-select" value={selectedMonth} onChange={onMonthChange}>
        {months.map((month) => (
          <option key={month.index} value={month.index}>
            {month.name}
          </option>
        ))}
      </select>

      <label htmlFor="year-select">Year:</label>
      <select id="year-select" value={selectedYear} onChange={onYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
