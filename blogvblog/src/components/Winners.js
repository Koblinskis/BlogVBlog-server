import React from 'react'

class Winners extends React.Component {
  state = {
    categories: [],
    winners: []
  }

  componentDidMount = async () => {
    const winnersAsync = await this.getWinners()
    console.log(winnersAsync)
    winnersAsync.forEach(winner => {
      this.setState((preState) => ({ winners: preState.winners.concat(winner)}))
    });
  }

  getWinners = async () => {
    try {
      const res = await fetch('/winners')
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
          {this.state.winners.map(winner => (<div key={winner.id}><p className="winner__category">{winner._id}:</p>   <p className="winner__winning-title">{winner.title}<hr/>{winner.score}</p></div>))}

        </div>
      </div>
    )
  }
}

export default Winners