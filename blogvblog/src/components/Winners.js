import React from 'react'

class Winners extends React.Component {
  state = {
    categories: [],
    winners: []
  }

  getWinners = async () => {
    try {
      const res = await fetch('/winners')
      const data = await res.json()
      
      console.log(data)
    } catch (e) {
      alert('Error')
    }
  }

  render() {
    return (
      <div>
        <h1>Winner</h1>
        <button onClick={this.getWinners}>winners</button>
      </div>
    )
  }
}

export default Winners