import React from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/postActions'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Post from './Post'
import SortButtons from './SortButtons'

// Essa classe representa todos os posts do app
class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    return (
      <div>
        <SortButtons />
        {this.props.posts.length === 0 
          ? <h1>There're no posts yet, be the first to write a post</h1>
          : this.props.posts.map(item =>
            <Post post={item} key={item.id} />
          )
        }
      </div>
    )
  }
}

Home.propTypes = {
  posts: PropTypes.array,
  getPosts: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    posts: state.postReducer.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts()),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))