import React from "react";
import { Line } from "react-chartjs-2";

function AdoptionTrendChart({ adoptionYears, adoptionCounts }) {
  return (
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
  );
}

export default AdoptionTrendChart;
