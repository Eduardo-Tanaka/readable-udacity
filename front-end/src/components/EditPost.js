import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import  { fetchEditPost, fetchPostDetail } from '../actions/postActions'

import EditPostForm from './EditPostForm'

// Essa classe representa a página de edição do post
class EditPost extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.post_id)
  }

  // altera o post e redireciona para a página principal
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, author, category, id } = this.props.form.editPost.values
    this.props.editPost({ title, body, author, category, id })
      .then(this.props.redirect("/"))
  }

  render() {
    const { categories, post } = this.props
    return (
      <div className="container">
        <h1>Edit Post</h1>
        <EditPostForm categories={categories} handleSubmit={this.handleSubmit} post={post} />
      </div>
    )
  }
}

EditPost.propTypes = {
  categories: PropTypes.array,
  form: PropTypes.object,
  editPost: PropTypes.func,
  redirect: PropTypes.func,
  getPost: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    categories: state.categoryReducer.categories,
    form: state.form,
    post: state.postReducer.post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    editPost: (post) => dispatch(fetchEditPost(post)),
    redirect: (url) => dispatch(push(url)),
    getPost: (id) => dispatch(fetchPostDetail(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost)