import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { FaCaretUp, FaCaretDown, FaComments, FaClockO, FaTrash, FaPencil } from 'react-icons/lib/fa'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

import { fetchPostVote, fetchDeletePost } from '../actions/postActions'

// Essa classe representa 1 post na lista de leitura
class Post extends React.Component {
  handleVote = (type, id, votes) => {
    this.props.postVote(type, id)
  }

  // deleta o post e redireciona para a página principal
  handleDelete = (e) => {
    e.stopPropagation()
    this.props.deletePost(this.props.post.id)
      .then(this.props.redirect("/"))
  }

  // vai para a página de detalhes do post
  detail = (e) => {
    const { post } = this.props;
    // url de destino
    const url = `/${post.category}/${post.id}`
    // se a url de destino for a mesma que a página atual não faz nada
    if(window.location.pathname === url) {
      return
    }
    // senão redireciona
    this.props.redirect(url)
  }

  // vai para a página de edição do post
  handleEditPost = (e) => {
    e.stopPropagation()
    this.props.redirect(`/editpost/${this.props.post.id}`)
  }

  // vai para a página de posts por categoria
  handleCategory = (e) => {
    e.stopPropagation()
    this.props.redirect('../' + this.props.post.category)
  }

  render() {
    const { post } = this.props;
    return (  
      <div className="row">
        <div className="col-md-1 col-sm-2 text-center">
          <div className="caret"><FaCaretUp size={50} onClick={ (e) => this.handleVote('upVote', post.id, post.voteScore + 1) } /></div>
          <div style={{fontSize:24}}>{post.voteScore}</div>
          <div className="caret"><FaCaretDown size={50} onClick={ (e) => this.handleVote('downVote', post.id, post.voteScore - 1) } /></div>
        </div>
        <div className="post-content col-md-11 col-sm-10" onClick={this.detail}>
          <div className="row">
            <div className="col-sm-10">
              <h1>{post.title}</h1>
            </div>
            <div className="col-sm-2" style={{marginTop:"10px"}}>
              <button className="btn btn-danger float-right" onClick={this.handleDelete}><FaTrash /></button>
              <button className="btn btn-primary float-right" onClick={this.handleEditPost}><FaPencil /></button>
            </div>
          </div>
          <h3>Author: {post.author}</h3>
          <div>
            <small style={{color:"#333347ad"}}>
              <button onClick={this.handleCategory} className="btn btn-info btn-sm" style={{marginTop:"-5px",marginRight:"10px"}}>{post.category}</button>  
              <FaClockO /> <Moment format="MM/DD/YYYY">{post.timestamp}</Moment> 
              <span className="float-right">{post.commentCount} comments <FaComments /></span>
            </small>
          </div>
          {this.props.detail && <p style={{marginTop:"10px"}}>{post.body}</p>}
          <hr />
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  detail: PropTypes.bool,
  post: PropTypes.object,
  postVote: PropTypes.func,
  redirect: PropTypes.func,
  deletePost: PropTypes.func,
}

function mapDispatchToProps (dispatch) {
  return {
    postVote: (option, id) => dispatch(fetchPostVote(option, id)),
    redirect: (url) => dispatch(push(url)),
    deletePost: (id) => dispatch(fetchDeletePost(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Post)