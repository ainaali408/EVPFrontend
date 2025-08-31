import './Navbar.css'

function Navbar({ onFilterChange }) {
  return (
    <div>

      <h1 className="dashboard-title">⚡  Insights Dashboard</h1>
      <p className="dashboard-subtitle">
        Track performance, trends & adoption of electric vehicles
      </p>

      <div className="filters">
        <label>
          Region:
          <select onChange={(e) => onFilterChange("region", e.target.value)}>
            <option value="all">All</option>
            <option value="north-america">North America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
          </select>
        </label>

        <label>
          Year:
          <select onChange={(e) => onFilterChange("year", e.target.value)}>
            <option value="all">All</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </label>
      </div>
  
    </div>
  )
}

export default Navbar;
