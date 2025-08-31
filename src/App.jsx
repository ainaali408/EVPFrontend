import './App.css'
import React, { useEffect, useState } from "react";
import Navbar from './Components/Navbar';
import "./Dashboard.css";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  Title, Tooltip, Legend,
  CategoryScale, LinearScale,
  BarElement, LineElement, PointElement,
  ArcElement
);

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedMake, setSelectedMake] = useState("All");
  const [filters, setFilters] = useState({ region: "all", year: "all" });

  // Load JSON
  useEffect(() => {
    fetch("/csvjson.json")
      .then((res) => res.json())
      .then((json) => {
        const cleaned = json.map((d) => ({
          ...d,
          ["Model Year"]: Number(d["Model Year"]) || null,
          ["Electric Range"]: Number(d["Electric Range"]) || 0,
        }));
        setData(cleaned);
        setFilteredData(cleaned);
      });
  }, []);

  // --- Filter handler ---
  useEffect(() => {
    let filtered = [...data];
    if (selectedYear !== "All") {
      filtered = filtered.filter((d) => d["Model Year"] === Number(selectedYear));
    }
    if (selectedMake !== "All") {
      filtered = filtered.filter((d) => d.Make === selectedMake);
    }
    setFilteredData(filtered);
  }, [selectedYear, selectedMake, data]);

  if (!data.length) return <p className="loading">Loading EV data...</p>;

  // --- KPI Metrics ---
  const totalEVs = filteredData.length;
  const bevCount = filteredData.filter((d) =>
    d["Electric Vehicle Type"]?.includes("BEV")
  ).length;
  const phevCount = filteredData.filter((d) =>
    d["Electric Vehicle Type"]?.includes("PHEV")
  ).length;
  const avgRange =
    totalEVs > 0
      ? Math.round(
          filteredData.reduce(
            (sum, d) => sum + (d["Electric Range"] || 0),
            0
          ) / totalEVs
        )
      : 0;

  // --- Adoption Trend by Year ---
  const adoptionByYearObj = filteredData.reduce((acc, d) => {
    if (d["Model Year"]) {
      acc[d["Model Year"]] = (acc[d["Model Year"]] || 0) + 1;
    }
    return acc;
  }, {});
  const adoptionYears = Object.keys(adoptionByYearObj).sort((a, b) => a - b);
  const adoptionCounts = adoptionYears.map((year) => adoptionByYearObj[year]);

  // --- Top Manufacturers ---
  const topMakesArr = Object.entries(
    filteredData.reduce((acc, d) => {
      if (d.Make) acc[d.Make] = (acc[d.Make] || 0) + 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topMakesLabels = topMakesArr.map(([make]) => make);
  const topMakesCounts = topMakesArr.map(([, count]) => count);

  // Unique filter options
  const yearOptions = ["All", ...new Set(data.map((d) => d["Model Year"]))];
  const makeOptions = ["All", ...new Set(data.map((d) => d.Make))];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="dashboard">
      {/* ✅ Navbar */}
      <Navbar onFilterChange={handleFilterChange} />

      {/* ✅ Filters */}
      <div className="filters">
        <label>
          Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {yearOptions.map((y, i) => (
              <option key={i} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label>
          Make:
          <select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            {makeOptions.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* ✅ KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <p>Total EVs</p>
          <h2>{totalEVs}</h2>
        </div>
        <div className="kpi-card">
          <p>BEVs</p>
          <h2>{bevCount}</h2>
        </div>
        <div className="kpi-card">
          <p>PHEVs</p>
          <h2>{phevCount}</h2>
        </div>
        <div className="kpi-card">
          <p>Avg Range</p>
          <h2>{avgRange} mi</h2>
        </div>
      </div>

      {/* ✅ Charts */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3>EV Adoption Over Years</h3>
          <Line
            data={{
              labels: adoptionYears,
              datasets: [
                {
                  label: "EVs Registered",
                  data: adoptionCounts,
                  borderColor: "rgb(75, 192, 192)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  tension: 0.3,
                },
              ],
            }}
          />
        </div>

        <div className="chart-card">
          <h3>Top 10 Manufacturers</h3>
          <Bar
            data={{
              labels: topMakesLabels,
              datasets: [
                {
                  label: "Vehicles",
                  data: topMakesCounts,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                },
              ],
            }}
          />
        </div>

        <div className="chart-card">
          <h3>BEV vs PHEV</h3>
          <Pie
            data={{
              labels: ["BEV", "PHEV"],
              datasets: [
                {
                  data: [bevCount, phevCount],
                  backgroundColor: ["#36A2EB", "#FF6384"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
