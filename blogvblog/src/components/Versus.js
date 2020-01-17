import React from 'react'
import '../styles/versus.css'

class Versus extends React.Component {
  state = {
    category: null,
    titleOne: {},
    titleTwo: {},
    disable: undefined,
    storedBlogs: {}
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.getBlogs()
      .then(res => this.setState({ 
        category: res.category, 
        titleOne: { title: res.blogTitles[0].title, _id: res.blogTitles[0]._id}, 
        titleTwo: { title: res.blogTitles[1].title, _id: res.blogTitles[1]._id },
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
      console.log(newBlogs)
      if(!newBlogs[2].category) {
        throw new Error()
      }
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

  postVoteResults = async (e) => {
    e.preventDefault();
    if(e.target.innerText === this.state.titleOne.title) {
      console.log(this.state)
      const data = { winner: this.state.titleOne._id , loser: this.state.titleTwo._id }
      this.setState(() => ({ disable: true }))
      console.log(data)
      await this.postVote(data)
    } else {
      console.log(this.state)
      const data = { winner: this.state.titleTwo._id , loser: this.state.titleOne._id }
      this.setState(() => ({ disable: true }))
      console.log(data)
      await this.postVote(data)
    }
    setTimeout(() => {
      this.setState((preState) => {
        return {
          disable: undefined,
          category: preState.storedBlogs.category,
          titleOne: preState.storedBlogs.titleOne,
          titleTwo: preState.storedBlogs.titleTwo,
        }
      })
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