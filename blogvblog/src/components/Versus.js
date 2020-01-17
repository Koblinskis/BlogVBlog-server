import React from 'react'
import '../styles/versus.css'

class Versus extends React.Component {
  state = {
    category: null,
    titleOne: {},
    titleTwo: {},
    disable: false,
    storedBlogs: {}
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
      const newBlogs = await res.json()
      this.setState(() => {
        return {
          storedBlogs: {
            category: newBlogs[2].category,
            titleOne: newBlogs[2].blogTitles[0],
            titleTwo: newBlogs[2].blogTitles[1]
          }
        }
      })
      console.log(this.state.storedBlogs)
    } catch(error) {
      console.error('Error:', error);
    };
  }

  postVoteResults = (e) => {
    e.preventDefault();
    if(e.target.innerText === this.state.titleOne.title) {
      const data = { winner: this.state.titleOne.id , loser: this.state.titleTwo.id }
      this.setState(() => ({ disable: true }))
      this.postVote(data)
    } else {
      const data = { winner: this.state.titleTwo.id , loser: this.state.titleOne.id }
      this.setState(() => ({ disable: true }))
      this.postVote(data)
    }
    setTimeout(() => {
      this.setState(() => ({ disable: false }))
    }, 1500)
  }

  render() {
    return (
      <div>
        <h1>Versus</h1>
        <h3>{this.state.category}</h3>
        <text>Title One: </text><a className={this.state.disable && "disable"} onClick={this.state.disable ? undefined : this.postVoteResults}>{this.state.titleOne.title}</a><hr/>
        <text>Title Two: </text><a className={this.state.disable && "disable"} onClick={this.state.disable ? undefined : this.postVoteResults}>{this.state.titleTwo.title}</a>
      </div>
    )
  }
}
export default Versus