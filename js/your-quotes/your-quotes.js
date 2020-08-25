var ctx = document.getElementById("bar-char").getContext("2d");
Chart.defaults.global.defaultFontColor = "#8097B1";
Chart.defaults.global.defaultFontSize = 15;
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        // barThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.4,
        label: "2018",
        backgroundColor: "#508FF4",
        borderColor: "#508FF4",
        data: [25, 10, 5, 2, 20, 29, 15, 3, 5, 14, 21, 6],
      },
      {
        // barThickness: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.4,
        label: "2019",
        backgroundColor: "#FF6A6A",
        borderColor: "#FF6A6A",
        data: [23, 14, 7, 5, 17, 26, 13, 5, 8, 13, 20, 5],
      },
    ],
  },

  // Configuration options go here
  options: {
    cornerRadius: 20,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          // stacked: true,
          gridLines: {
            borderDash: [2, 2],
          },
          ticks: {
            userCallback: (item) => {
              return item === 0 ? item : "$" + item + "k";
            },
          },
        },
      ],
      xAxes: [
        {
          // stacked: true,
          gridLines: {
            display: false,
          },
        },
      ],
    },
    legend: {
      position: "top",
      align: "end",
      labels: {
        boxWidth: 5,
        usePointStyle: true,
      },
    },
  },
});
