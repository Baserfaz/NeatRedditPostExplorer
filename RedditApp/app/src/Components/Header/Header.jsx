import React, { Component } from "react";
import PropTypes from "prop-types";

import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from "material-ui/FlatButton";
import Search from "material-ui/svg-icons/action/search";

const buttonStyle = {
    margin: "0 0 0 1rem"
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.subreddit = props.subReddit;
        this.currentSubreddit = props.currentSubReddit;
        this.changeSubredditState = props.changeSubredditState;
        this.getNewPosts = props.getNewPosts;
        this.viewedSubreddits = props.viewedSubreddits;
    }

    // for updating
    componentWillReceiveProps(props) {
        this.currentSubreddit = props.currentSubreddit;
        this.subreddit = props.subReddit;
        this.viewedSubreddits = props.viewedSubreddits;
    }

    render(props) {
        return (
            <div id="header">
            <h1>Neat Reddit Post Explorer</h1>
            <h2>Currently reading posts from { this.currentSubreddit }</h2>

                <div id="inputfield">
                    <AutoComplete
                        hintText = 'Enter subreddits name'
                        onUpdateInput = { value => this.changeSubredditState(value) }
                        dataSource = { this.viewedSubreddits }
                        filter = { AutoComplete.fuzzyFilter }
                        maxSearchResults = { 5 }
                    />
                    <FlatButton
                        icon = { <Search /> }
                        primary = { true }
                        onClick = { this.getNewPosts }
                        style = { buttonStyle }
                    />
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
};

export default Header;
