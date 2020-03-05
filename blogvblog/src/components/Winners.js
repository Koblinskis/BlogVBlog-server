import React from 'react'

import { Chart } from 'chart.js'



class Winners extends React.Component {
  state = {
    categories: [],
    winners: []
  }

  chartRef = React.createRef();

  componentDidMount = async () => {
    const winnersAsync = await this.getWinners()
    console.log(winnersAsync)
    winnersAsync.forEach(winner => {
      this.setState((preState) => ({ winners: preState.winners.concat(winner)}))
    });
    const myChartRef = this.chartRef.current.getContext("2d");
        
    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        winners: this.state.winners.map(winner => {
          let str = winner.title
          let title = str.charAt(0).toUpperCase() + str.slice(1);
          return title
        }),
        labels: this.state.winners.map(winner => {
          let str = winner._id
          let title = str.charAt(0).toUpperCase() + str.slice(1);
          return title
        }),
        datasets: [{
          label: "Highest Score",
          data: this.state.winners.map(winner => winner.score),
            //backgroundColor:'green',
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
        }],
        
      },
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              callback: function(value) {
                if (value.length > 10) {
                  return value.substr(0, 10) + '...'; //truncate
                } else {
                  return value
                }
              },
            }
          }]
        },
        tooltips: {
          callbacks: {
            title: function(tooltipItems, data) {
              var idx = tooltipItems[0].index;
              var title = data.winners[idx]
              return title; //do something with title
            },
          }
      }
      }
    });
  }

  getWinners = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_NODE_SERVER_URL + '/winners')
      const data = await res.json()
      
      return data
    } catch (e) {
      alert('Error')
    }
  }

  getWinnersResults = async () => {
  }

  render() {
    return (
      <div className="winner__big-box">
        <h1 className="winner__title">Winners</h1>
        <div className="winner__box">
        <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
          {this.state.winners.map(winner => (<div key={winner.id}><p className="winner__category">{winner._id}:</p>   <p className="winner__winning-title">{winner.title}<hr/>Number of Votes: {winner.score}</p></div>))}
          
        </div>
      </div>
    )
  }
}

export default Winners