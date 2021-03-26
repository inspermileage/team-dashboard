import React from "react";
import Chart from 'chart.js';

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

class BarChart extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    // componentDidUpdate() {
    //   this.myChart.data.labels = this.props.data.map(d => d.label);
    //   this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    //   this.myChart.update();
    // }
  
    componentDidMount() {
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'bar',
        options: {
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  max: 600
                }
              }
            ]
          }
        },
        data: {
          labels: this.props.label,
          datasets: [{
            label: this.props.title,
            data: this.props.data,
            backgroundColor: this.props.color
          }]
        }
      });
    }
  
    render() {
      return (
          <canvas ref={this.canvasRef} />
      );
    }
  }
  
  export default BarChart;