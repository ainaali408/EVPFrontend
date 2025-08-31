
import React from "react";

function KPISection({ totalEVs, bevCount, phevCount, avgRange }) {
  return (
    <div className="kpi-grid">
      <div className="kpi-card"><p>Total EVs</p><h2>{totalEVs}</h2></div>
      <div className="kpi-card"><p>BEVs</p><h2>{bevCount}</h2></div>
      <div className="kpi-card"><p>PHEVs</p><h2>{phevCount}</h2></div>
      <div className="kpi-card"><p>Avg Range</p><h2>{avgRange} mi</h2></div>
    </div>
  );
}

export default KPISection;
