import React, { Component } from "react";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";
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
        this.topFive = props.topFive;
    }

    // for updating
    componentWillReceiveProps(props) {
        this.currentSubreddit = props.currentSubreddit;
        this.subreddit = props.subReddit;
        this.topFive = props.topFive;
    }

    render(props) {
        return (
            <div id="header">
            <h1>Neat Reddit Post Explorer</h1>
            <h2>Currently reading posts from {this.currentSubreddit}</h2>

                <div id="inputfield">
                    <TextField
                        hintText = { this.subreddit }
                        onChange = { this.changeSubredditState }
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
