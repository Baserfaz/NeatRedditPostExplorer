import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = { posts: [] };
    this.count = 40;
    this.url = 'https://www.reddit.com/r/monkslookingatbeer/.json?limit=' + this.count;
  }

  componentDidMount() {
    
    // ajax GET first page posts.
    axios.get(this.url).then( res => { 
      var posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts })
      //console.log(posts);
     });
     
  }

  getPosts(e) {

    e.preventDefault();

    // get the last item information
    var posts = this.state.posts;
    var lastItem = posts[posts.length - 1];

    // create the next url 
    var url = this.url + '?limit=' + this.count + '&after=' + lastItem.name;

    // ajax GET next posts
    axios.get(url).then( res => { 
      var posts = res.data.data.children.map(obj => obj.data);
      this.setState({ posts })
    });

    // finally scroll back to top
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="App">
        <h1>Posts from /r/monkslookingatbeer</h1>
        <p>Links open up in a new window.</p>

        <ul id = 'posts'>
          {
            this.state.posts.map(
              post =>
                <li className = 'post'  key = { post.id }>
                  <a href = { 'http://www.reddit.com' + post.permalink } target = '_blank'>{ post.title }</a>
                  <p className = 'votes'><i className="fa fa-thumbs-o-up"></i> { post.ups } &nbsp; <i className="fa fa-thumbs-o-down"></i> { post.downs }</p>
                  <a className = 'user' href = { 'http://www.reddit.com/user/' + post.author } target = '_blank'><i className="fa fa-user-o"></i> { post.author }</a>
                  <img src = { post.thumbnail } alt = '' />
                </li>
            )
          }

          {
            <li className = 'post'>
                <a href='/' onClick = { this.getPosts.bind(this) }>Get more posts <i className='fa fa-arrow-circle-o-right'></i></a>
            </li>
          }

        </ul>
      </div>
    );
  }
}

export default App;
