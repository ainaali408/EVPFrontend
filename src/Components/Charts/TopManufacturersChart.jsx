import React from "react";
import { Bar } from "react-chartjs-2";

function TopManufacturersChart({ topMakesLabels, topMakesCounts }) {
  return (
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
  );
}

export default TopManufacturersChart;
