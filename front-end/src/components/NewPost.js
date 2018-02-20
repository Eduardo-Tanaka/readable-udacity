import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import  { fetchAddPost } from '../actions/postActions'

import NewPostForm from './NewPostForm'

// página de escrita de novo post
class NewPost extends Component {
  // cria o novo post e redireciona para a página principal
  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, author, category } = this.props.form.newPost.values
    this.props.addPost({ title, body, author, category })
      .then(this.props.redirect("/"))
  }

  render() {
    const { categories } = this.props
    return (
      <div className="container">
        <h1>Write a New Post</h1>
        <NewPostForm categories={categories} handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

NewPost.propTypes = {
  categories: PropTypes.array,
  form: PropTypes.object,
  addPost: PropTypes.func,
  redirect: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    categories: state.categoryReducer.categories,
    form: state.form,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (post) => dispatch(fetchAddPost(post)),
    redirect: (url) => dispatch(push(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost)