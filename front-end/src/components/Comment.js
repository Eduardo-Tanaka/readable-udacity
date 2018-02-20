import React from 'react'
import { FaCaretUp, FaCaretDown, FaClockO, FaTrash, FaPencil, FaFloppyO, FaTimesCircle } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { fetchPostVoteComment, fetchEditComment } from '../actions/commentActions'
import Moment from 'react-moment'
import { Input } from 'reactstrap'
import PropTypes from 'prop-types'

// Essa classe representa 1 comentário no post
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      body: this.props.comment.body
    }
  }

  handleVoteComment = (type, id, votes) => {
    this.props.postVoteComment(type, id)
    this.setState({
      voteScoreComment: votes
    })
  }

  toggleEditComment = () => {
    this.setState({ edit: !this.state.edit })
  }

  handleEditComment = () => {
    const { id } = this.props.comment
    const { body } = this.state
    this.props.editComment({ body, id })
      .then(this.setState({ edit: false }))
  }

  handleBody = (e) => {
    this.setState({ body: e.target.value })
  }

  render() {
    const { comment } = this.props
    return (
      <div className="row">
        <div className="col-md-1 col-sm-2 text-center">
          <div className="caret"><FaCaretUp size={34} onClick={ (e) => this.handleVoteComment('upVote', comment.id, comment.voteScore + 1) } /></div>
          <div style={{fontSize:18}}>{comment.voteScore}</div>
          <div className="caret"><FaCaretDown size={34} onClick={ (e) => this.handleVoteComment('downVote', comment.id, comment.voteScore + 1) } /></div>
        </div>
        <div className="post-content col-md-11 col-sm-10" onClick={this.detail}>
          <div className="row">
            <div className="col-md-9 col-sm-7">
              <h3>Author: {comment.author}</h3>
            </div>
            <div className="col-md-3 col-sm-5">
              <button className="btn btn-danger float-right" onClick={this.props.handleDelete}><FaTrash /></button>
              {this.state.edit 
                ? <div>
                    <button className="btn btn-default float-right" onClick={this.toggleEditComment}><FaTimesCircle /></button>
                    <button className="btn btn-success float-right" onClick={this.handleEditComment}><FaFloppyO /></button>
                  </div>
                : <button className="btn btn-primary float-right" onClick={this.toggleEditComment}><FaPencil /></button>
              }
            </div>
          </div>
          <div>
            {this.state.edit 
              ? <Input type="textarea" value={this.state.body} onChange={this.handleBody} />
              : comment.body
            }
          </div>
          <div>
            <small style={{color:"#333347ad"}}>
              <FaClockO /> <Moment format="MM/DD/YYYY">{comment.timestamp}</Moment> 
            </small>
          </div>
          <hr />
        </div>
      </div>     
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  postVoteComment: PropTypes.func,
  editComment: PropTypes.func,
  handleDelete: PropTypes.func
}

function mapDispatchToProps (dispatch) {
  return {
    postVoteComment: (option, id) => dispatch(fetchPostVoteComment(option, id)),
    editComment: (comment) => dispatch(fetchEditComment(comment))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)