import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component{
    componentDidMount(){

        if (!this.props.post){
       const { id } =  this.props.match.params;
        this.props.fetchPost(id);
        }
    }

    onDeleteClick(){
        const { id } = this.props.match.params;

        this.props.deletePost(id, () =>{
            this.props.history.push('/');
        });
    }

    render(){
        const {post} = this.props; //due to referring back to a particular post

        //
        if(!post){
            return <div>Loading...</div>;
        }
        
        return(
            <div>
                <Link className="btn btn-primary"
                      to ="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                    >
                    Delete Post
                </button>
                <div className="post_content">
                    <h3 className="post_title">{post.title}</h3>
                    <h5>Categories: {post.categories}</h5>
                     <p>{post.content}</p>
                 </div>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps){

        return {post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);