import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

    constructor() {
        super();

        this.state = { posts: [], subreddit: '/r/monkslookingatbeer/', currentSubreddit: '' };
        this.count = 40;
        this.url = 'https://www.reddit.com';
    }

    changeSubredditState(event) { this.setState({ subreddit: event.target.value }); }

    componentDidMount() {

        let url = this.url + this.state.subreddit + '.json?limit=' + this.count;

        // ajax GET first page posts.
        axios.get(url).then(res => {
            var posts = res.data.data.children.map(obj => obj.data);
            this.setState({ posts })
        });

        this.setState({ currentSubreddit: this.state.subreddit });
    }

    getMorePosts(e) {
        
        // this method is called by a link, 
        // so we want to prevent the link's behavior.
        e.preventDefault();

        // get the last item information
        var posts = this.state.posts;
        var lastItem = posts[posts.length - 1];

        // create the next post's url 
        var url = this.url + this.state.currentSubreddit + '.json?limit=' + this.count + '&after=' + lastItem.name;

        // ajax GET next posts
        axios.get(url).then(res => {
            var posts = res.data.data.children.map(obj => obj.data);
            this.setState({ posts })
        });

        // finally scroll back to top
        window.scrollTo(0, 0);
    }

    getNewPosts() { 

        // create the next url 
        var url = this.url + this.state.subreddit + '.json?limit=' + this.count;

        // ajax GET next posts
        axios.get(url)
            .then(res => {
                var posts = res.data.data.children.map(obj => obj.data);
                this.setState({ posts })

                this.setState({ currentSubreddit: this.state.subreddit });
            })
            .catch(res => {
                alert('No subreddits found!');
            }
        );
    }

    render() {
        return (
            <div id = 'app'>

                <div id = 'header'>
                    <h1>Neat Reddit Post Explorer</h1>
                    <h2>Currently reading posts from { this.state.currentSubreddit }</h2>

                    <div id = 'inputfield'>
                        <input type = 'text' className = 'input' defaultValue = { this.state.subreddit } onChange = { this.changeSubredditState.bind(this) } ></input>
                        <button onClick = { this.getNewPosts.bind(this) }>Go!</button>
                    </div>

                </div>

                <ul id='posts'>

                    {
                        this.state.posts.map(post =>
                            <li className = 'post' key = { post.id }>
                                <a href = { 'http://www.reddit.com' + post.permalink } target='_blank'>{ post.title }</a>
                                <p className = 'votes'><i className = "fa fa-thumbs-o-up"></i> { post.ups }</p>
                                <a className = 'user' href = { 'http://www.reddit.com/user/' + post.author } target='_blank'><i className = "fa fa-user-o"></i> { post.author }</a>
                                <img src = { post.thumbnail } alt='' />
                            </li>
                        )
                    }

                    {
                        <li className='post'>
                            <a href='/' onClick = { this.getMorePosts.bind(this) }>Load more posts <i className = 'fa fa-arrow-circle-o-right'></i></a>
                        </li>
                    }

                </ul>

                <div id = 'footer'><p>Heikki Heiskanen &copy; 2017</p></div>
            </div>
        );
    }
}

export default App;
