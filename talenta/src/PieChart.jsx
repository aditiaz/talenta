import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ users }) => {
  const genderData = {
    male: 0,
    female: 0,
  };

  const ageData = {
    below19: 0,
    above20: 0,
  };

  users.forEach((friend) => {
    if (friend.gender === "Laki-Laki") {
      genderData.male++;
    } else if (friend.gender === "Perempuan") {
      genderData.female++;
    }

    const age = parseInt(friend.age);
    if (age <= 19) {
      ageData.below19++;
    } else {
      ageData.above20++;
    }
  });

  const totalFriends = users.length;
  const genderPercentages = [
    (genderData.male / totalFriends) * 100,
    (genderData.female / totalFriends) * 100,
  ];

  const agePercentages = [
    (ageData.below19 / totalFriends) * 100,
    (ageData.above20 / totalFriends) * 100,
  ];

  // Data untuk chart
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender",
        data: genderPercentages,
        backgroundColor: ["#4169E1", "#FF1493"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const labelIndex = context.dataIndex;
            const dataset = context.dataset;
            const data = dataset.data;
            const total = data.reduce((acc, curr) => acc + curr);
            const value = data[labelIndex];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="flex" style={{ width: "300px", height: "300px" }}>
      <h2>Gender Percentage</h2>
      <Doughnut data={data} options={options} />

      <h2>Age Percentage</h2>
      <Doughnut
        data={{
          labels: ["Below 19", "Above 20"],
          datasets: [
            {
              label: "Age",
              data: agePercentages,
              backgroundColor: ["#FFA500", "#008000"],
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default PieChart;
