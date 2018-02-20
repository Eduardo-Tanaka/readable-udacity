import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchPostDetail } from '../actions/postActions'
import { fetchComments, fetchAddComment, fetchDeleteComment } from '../actions/commentActions'

import Post from './Post'
import Comment from './Comment'
import CommentForm from './CommentForm'

// Essa classe representa todos as informações do post
class PostDetail extends React.Component {
  componentDidMount() {
    this.props.getPostDetail(this.props.match.params.post_id)
    this.props.getComments(this.props.match.params.post_id)
  }

  // deleta um comentário do post
  handleDelete = (id) => {
    this.props.deleteComment(id)
      .then(() => setTimeout(this.props.getPostDetail(this.props.match.params.post_id), 200))
  }

  // adiciona um comentário ao post
  handleSubmit = (e) => {
    e.preventDefault();
    const { body, author } = this.props.form.commentPost.values
    const { id } = this.props.post
    this.props.addComment({ body, author, id })
      .then(this.props.getPostDetail(this.props.match.params.post_id))
  }

  render() {
    const { post, comments } = this.props;
    return (
      <div>
        {(post === null || Object.keys(post).length === 0) 
          ? <h3>Post Not Found</h3>
          : <div>
              <Post post={post} detail={true} />
              <div className="offset-md-1 col-md-11">
                {(comments.length === 0)
                  ? <p>No comments yet, be the first to write a comment</p>
                  : comments.map(item => <Comment key={item.id} comment={item} handleDelete={(e) => this.handleDelete(item.id)} />)
                }
                <h4>Write a Comment</h4>
                <CommentForm handleSubmit={this.handleSubmit} id={post.id} />
              </div>
            </div>
        }
      </div>
    )
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array,
  getPostDetail: PropTypes.func,
  getComments: PropTypes.func,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
  form: PropTypes.object
}

function mapStateToProps (state, props) {
  return {
    post: state.postReducer.post,
    comments: state.commentReducer.comments,
    form: state.form,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPostDetail: (id) => dispatch(fetchPostDetail(id)),
    getComments: (id) => dispatch(fetchComments(id)),
    addComment: (comment) => dispatch(fetchAddComment(comment)),
    deleteComment: (id) => dispatch(fetchDeleteComment(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)