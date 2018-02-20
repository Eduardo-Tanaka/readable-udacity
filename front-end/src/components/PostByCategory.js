import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchPostsByCategory } from '../actions/postActions'

import Post from './Post'
import SortButtons from './SortButtons'

// Essa classe representa 1 post na lista de leitura por categoria
class PostByCategory extends React.Component {
  // carrega todos os posts da categoria
  componentDidMount() {
    this.props.getPostsByCategory(this.props.match.params.category)
  }

  componentWillReceiveProps (nextProps) {
    const { location } = this.props
    if (location.pathname !== nextProps.location.pathname ) {
      this.props.getPostsByCategory(nextProps.match.params.category)
    }
  }

  render() {
    return (
      <div>
        <SortButtons />
        {this.props.posts.length === 0
          ? <h1>There're no posts in this category, be the first to write a post</h1>
          : this.props.posts.map(item =>
            <Post post={item} key={item.id} />
          )
        }
      </div>
    )
  }
}

PostByCategory.propTypes = {
  posts: PropTypes.array,
  active: PropTypes.string,
  getPostsByCategory: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    posts: state.postReducer.posts,
    active: state.categoryReducer.active
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostByCategory)