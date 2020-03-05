import React from 'react'
import Spinner from './Spinner'

class Versus extends React.Component {
  state = {
    category: undefined,
    titleOne: {},
    titleTwo: {},
    disable: false,
    loading: true,
    storedBlogs: {}
  };

  componentDidMount() {
    this.getBlogs()
      .then(res => this.setState({ 
        loading: false,
        category: res.category, 
        titleOne: { title: res.blogTitles[0].title, _id: res.blogTitles[0]._id}, 
        titleTwo: { title: res.blogTitles[1].title, _id: res.blogTitles[1]._id },
      }))
      .catch(err => console.log(err));
  }
  
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
    } catch(error) {
      console.error('Error:', error);
    };
  }

  postVoteResults = async ({title}) => {
    const data = title === this.state.titleOne.title
    ?  { winner: this.state.titleOne._id , loser: this.state.titleTwo._id }
    :  { winner: this.state.titleTwo._id , loser: this.state.titleOne._id }
    
    this.setState(() => ({ disable: true, loading: true}))
    await this.postVote(data)
    setTimeout(() => {
      this.setState((preState) => {
        return {
          disable: false,
          loading: false,
          category: preState.storedBlogs.category,
          titleOne: preState.storedBlogs.titleOne,
          titleTwo: preState.storedBlogs.titleTwo,
        }
      })
    }, 500)
  }

  render() {
    return (
      <div>
        <div className="versus__category">
          <div className="versus__category-subtext">Category</div>
          <div className="versus__category-subbox">
            <h3 className="versus__category-title">{this.state.category}</h3>
          </div>
        </div>
        <div className="versus__flexbox">
          <div className="versus__box" onClick={this.state.disable ? undefined : () => this.postVoteResults(this.state.titleOne)}>
            {this.state.loading ? <Spinner/> :
            <a className={this.state.disable ? "versus__disable" : "versus__enable"}>{this.state.titleOne.title}</a>}
            
          </div>
          <div className="versus__line"></div>
          <div className="versus__box" onClick={this.state.disable ? undefined : () => this.postVoteResults(this.state.titleTwo)}>
            {this.state.loading ? <Spinner/> :
            <a className={this.state.disable ? "versus__disable" : "versus__enable"}>{this.state.titleTwo.title}</a>}
          </div>
        </div>
    
        <div className="versus__footer">
          <p>Which title is more interesting?</p>
        </div>
      </div>
    )
  }
}
export default Versus