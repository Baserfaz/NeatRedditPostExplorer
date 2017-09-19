import React, { Component } from "react";
import PropTypes from "prop-types";

import { List, ListItem } from "material-ui/List";

const listStyle = {
    width: '230px',
    backgroundColor: '#f1f1f1',
    borderRadius: '15px',
    margin: '0 1rem',
    padding: '1rem',
    wordWrap: 'break-word',
}

class TopFive extends Component {

    constructor(props) {
        super(props);
        this.topFive = props.topFive;
        this.changeSubredditStateWithString = props.changeSubredditStateWithString;
    }

    componentWillReceiveProps(props) {
        this.topFive = props.topFive;
    }

    handleSubredditChange(name) {
        this.changeSubredditStateWithString(name);
    }

    render() {
        return(
            <List className = 'topFive' style = { listStyle }>
                <ListItem 
                    primaryText="Top 5 subreddits" 
                    initiallyOpen = { true } 
                    primaryTogglesNestedList = { true }
                    nestedItems = {[
                        this.topFive.map(elem => (
                            <ListItem
                                primaryText = { elem.name } 
                                key = { elem.name } 
                                secondaryText = { 'Hits: ' + elem.hitcount } 
                                onClick = { () => this.handleSubredditChange(elem.name) }
                            />
                        ))
                    ]}
                />
            </List>
        )
    }
}

TopFive.PropTypes = {
    topFive: PropTypes.array,
    changeSubredditState: PropTypes.func
};
  
export default TopFive;