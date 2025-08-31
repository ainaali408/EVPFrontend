import React from "react";
import { Pie } from "react-chartjs-2";

function VehicleTypeChart({ bevCount, phevCount }) {
  return (
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
  );
}

export default VehicleTypeChart;
