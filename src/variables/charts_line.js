import React from "react";
import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

// LineChart
class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.label;
      this.myChart.data.datasets[0].data = this.props.data; 
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        
        type: 'line',
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          
        //   scales: {
        //     xAxes: [
        //       {
        //         ticks: {
        //             min: 0
        //           }
        //       }
        //     ],
        //     yAxes: [
        //       {
        //         ticks: {
        //           min: 0
        //         }
        //       }
        //     ]
        //   }
        },
        data: {
          labels: this.props.label,
          datasets: [{
            data: this.props.data,
            fill: "none",
            backgroundColor: this.props.color,
            pointRadius: 2,
            lineTension: 0,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#1f8ef1",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#1f8ef1",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4
          }]
        }
       
      });
    }
  
    render() {
      return <canvas ref={this.canvasRef} />;
    }
  }
  
  export default LineChart;