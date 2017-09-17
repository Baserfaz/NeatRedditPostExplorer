import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FaCaretRight from 'react-icons/lib/fa/caret-right';

class Header extends Component {

    constructor(props) {
        super(props);
        this.subreddit = props.subReddit;
        this.currentSubreddit = props.currentSubReddit;
        this.changeSubredditState = props.changeSubredditState;
        this.getNewPosts = props.getNewPosts;
        this.topFive = props.topFive;
    }

    // for updating currentSubReddit
    componentWillReceiveProps(props) { 
        this.currentSubreddit = props.currentSubreddit;
        this.topFive = props.topFive;
    }

    render(props) {
        return (

            <div id = 'header'>
                <h1>Neat Reddit Post Explorer</h1>

                <h2>Currently reading posts from { this.currentSubreddit }</h2>                                

                <div id = 'inputfield'>
                    <input type = 'text' className = 'input' defaultValue = { this.subreddit } onChange = { this.changeSubredditState } ></input>
                    <button onClick = { this.getNewPosts }>Go!</button>
                </div>

                <div id = 'top5'>
                    <h3>Top 5 subreddits</h3>
                    <ul>
                        {
                            this.topFive.map(top =>
                                <li key = { top.name }> <p><FaCaretRight/> { top.name } ({ top.hitcount })</p></li>
                            )
                        }
                    </ul>
                </div>

            </div>

        );
    }
}

Header.PropTypes = {
    currentSubReddit: PropTypes.string,
    subReddit: PropTypes.string,
    changeSubredditState: PropTypes.func,
    getNewPosts: PropTypes.func,
    topFive: PropTypes.array
}

export default Header;
