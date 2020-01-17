import React from 'react'

class Versus extends React.Component {
  state = {
    category: null,
    titleOne: {},
    titleTwo: {},
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.getBlogs()
      .then(res => this.setState({ 
        category: res.category, 
        titleOne: { title: res.blogTitles[0].title, id: res.blogTitles[0]._id}, 
        titleTwo: { title: res.blogTitles[1].title, id: res.blogTitles[1]._id },
      }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  getBlogs = async () => {
    const response = await fetch('/versus');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
  
  postVote = async (data) => {
    try {
      const res = await fetch('/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      console.log('Success:', await res.json())
    } catch(error) {
      console.error('Error:', error);
    };
  }

  postVoteResults = (e) => {
    e.preventDefault();
    if(e.target.innerText === this.state.titleOne.title) {
      const data = { winner: this.state.titleOne.id , loser: this.state.titleTwo.id }
      this.postVote(data)
    } else {
      const data = { winner: this.state.titleTwo.id , loser: this.state.titleOne.id }
      this.postVote(data)
    }
  }

  render() {
    return (
      <div>
        <h1>Versus</h1>
        <h3>{this.state.category}</h3>
        <text>Title One: </text><a onClick={this.postVoteResults}>{this.state.titleOne.title}</a><hr/>
        <text>Title Two: </text><a onClick={this.postVoteResults}>{this.state.titleTwo.title}</a>
      </div>
    )
  }
}
export default Versus