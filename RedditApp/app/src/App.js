import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Content from './Components/Content/Content';

import Snackbar from 'material-ui/Snackbar';

class App extends Component {

    constructor() {
        super();

        firebase.initializeApp(DB_CONFIG);

        this.state = { posts: [], subreddit: '', currentSubreddit: '', viewedSubreddits: [], alertOpen: false };
        this.count = 40;
        this.url = 'https://www.reddit.com';

        this.getViewedSubreddits = this.getViewedSubreddits.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
    }

    componentDidMount() { this.getViewedSubreddits(true); }

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

    closeAlert() { this.setState({ alertOpen: false }); }
    openAlert() { this.setState({ alertOpen: true }); }

    changeSubredditState(event) { 
        this.setState({ subreddit: '/r/' + event.target.value });
    }

    changeSubredditStateWithStringNoAutoSearch(subredditName) {
        var fullName = '/r/' + subredditName;
        this.setState({ subreddit: fullName });
    }

    changeSubredditStateWithString(subredditName) {
        var fullName = '/r/' + subredditName;

        this.setState({ subreddit: fullName }, function() {
            this.getNewPosts();
        });
    }

    getNewPosts() { 

        // create the next url 
        var url = this.url + this.state.subreddit + '.json?limit=' + this.count;

        // ajax GET next posts
        axios.get(url)
            .then(res => {

                // GET is successful
                var posts = res.data.data.children.map(obj => obj.data);
                this.setState({ posts })
                this.setState({ currentSubreddit: this.state.subreddit });

                this.writeData(this.state.subreddit);

            })
            .catch(res => {
                // no subreddits found
                this.openAlert();
            }
        );
    }

    getViewedSubreddits(getOnlyNames) {

        var objs = [];

        firebase.database().ref('searches').orderByChild('count').limitToLast(20).once('value').then((snap) => {
            
            // create objects and push them to an array.
            snap.forEach(function (snapshot) {
                var obj = snapshot.val();

                let name = obj.subreddit;
                let hitcount = obj.count;
                
                if(getOnlyNames) { objs.push(name); } 
                else { objs.push({name, hitcount}); }

            });

            // orderByChild('count') orders the data in ascending order
            // therefore we need to reverse the array to get descending order.
            objs = objs.reverse();

            this.setState({ viewedSubreddits: objs });
        });
    }

    // Arguments:
    // data (string): the name of the subreddit 
    writeData(data) {
        
        // remove '/r/'
        data = data.substring(3, data.length);

        var elementExists = false;
        var hitCount = 0;

        // get db 
        firebase.database().ref('searches').once('value', function(snap) {

            // loop through the db data
            snap.forEach(function (snapshot) {
                var obj = snapshot.val();

                // if to be added data already exists in DB
                if(obj.subreddit === data) {
                    elementExists = true;
                    hitCount = obj.count;

                    // TODO: implement other type of for-loop
                    // because forEach doesn't support break.

                }

            })

            if(elementExists) {
                // update data
    
                hitCount += 1;
                var updates = {};
                updates['count'] = hitCount;
    
                firebase.database().ref().child('searches/' + data).update(updates).then(function() {
                    //console.log('SUCCESSFULLY UPDATED DATA FIELD');
                }).catch(function(error) {
                    console.log(error);
                });
    
            } else {
                // create new data
                
                firebase.database().ref().child('searches/' + data).set({ subreddit: data, count: 1 }).then(function() {
                    //console.log('SUCCESSFULLY CREATED NEW DATA FIELD');
                }).catch(function(error) {
                    console.log(error);
                });
    
            }

        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div id = 'app'>

                    <Header 
                        getNewPosts = { this.getNewPosts.bind(this) } 
                        changeSubredditState = { this.changeSubredditStateWithStringNoAutoSearch.bind(this) } 
                        subReddit = { this.state.subreddit } 
                        currentSubreddit = { this.state.currentSubreddit }
                        viewedSubreddits = { this.state.viewedSubreddits }
                    />

                    <Content posts = { this.state.posts } getMorePosts = { this.getMorePosts.bind(this) } />

                    <Footer/>

                    <Snackbar 
                        open = { this.state.alertOpen } 
                        message = 'No subreddits were found! '
                        autoHideDuration = { 5000 }
                        onRequestClose = { this.closeAlert }
                        onActionTouchTap = { this.closeAlert }
                        action = 'Close'
                    />

                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
