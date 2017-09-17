import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import FaChevronCircleRight from 'react-icons/lib/fa/chevron-circle-right';
import FaUser from 'react-icons/lib/fa/user';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

class Content extends Component {

    constructor(props) {
        super(props);

        this.posts = props.posts;
        this.getMorePosts = props.getMorePosts;
    }

    // when the state changes in app.js 
    // this method will be called.
    componentWillReceiveProps(props) {
        this.posts = props.posts;
    }

    render(props) {

        return (
            <ul id='posts'>

                {
                    this.posts.map(post =>
                        <li className = 'post' key = { post.id }>
                            <a href = { 'http://www.reddit.com' + post.permalink } target='_blank'>{ post.title }</a>
                            <p className = 'votes'><FaThumbsOUp/> { post.ups }</p>
                            <a className = 'user' href = { 'http://www.reddit.com/user/' + post.author } target='_blank'><FaUser/> { post.author }</a>
                            <img src = { post.thumbnail } alt='' />
                        </li>
                    )
                }

                {
                    this.posts.length > 0 &&
                    <li className='post'>
                        <a href='/' onClick = { this.getMorePosts }>Load more posts <FaChevronCircleRight/></a>
                    </li>
                }

            </ul>
        );
    }
}

Content.PropTypes = {
    posts: PropTypes.array,
    getMorePosts: PropTypes.func
}

export default Content;