import React, { Component} from 'react';
import { connect } from 'react-redux';
import { fetchPosts} from '../actions'
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex extends Component {

    componentDidMount(){
        this.props.fetchPosts();
}

renderPosts(){
return _.map(this.props.posts, post =>{
    return(
        <li className="list-group-item"
            key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
            </Link>
            
        </li>
        
    );
});
}
    render(){
        console.log(this.props.posts);
        return (
            <div>
                <div className="text-xs-right">
                <Link className="btn btn-primary" to="/posts/new">
                Add a Post
                </Link>
                </div>
<h3 className="posts_heading">All Posts</h3>
<ul className="list-group">
    {this.renderPosts()}
    </ul>
    <p className="credit">
            @Jon D. Wilson 2017
        </p>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}
//shortcut to wire up action creator
//define map state to props arg as null
//pass action creator inside object

export default connect(mapStateToProps, {fetchPosts})(PostsIndex);