import './Filters.css'

function Filters({ selectedYear, setSelectedYear, selectedMake, setSelectedMake, yearOptions, makeOptions }) {
  return (
    <div className="filters">
      <label>
        Filter by Year:{" "}
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          {yearOptions.map((y, i) => (
            <option key={i} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <label>
        Filter by Make:{" "}
        <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
          {makeOptions.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Filters;
