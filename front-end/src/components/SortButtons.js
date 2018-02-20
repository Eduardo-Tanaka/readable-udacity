import React from 'react'
import { connect } from 'react-redux'
import { sortPosts } from '../actions/postActions'
import { Link } from 'react-router-dom'
import { MdThumbUp, MdThumbDown } from 'react-icons/lib/md'
import { FaCalendar, FaFire, FaEdit } from 'react-icons/lib/fa'
import PropTypes from 'prop-types'

// Essa classe representa os botões de ordenação dos posts
class SortButtons extends React.Component {
  constructor(props) {
    super(props);
    // por padrão ordena pelo número de votos
    this.state = {
      sortActive: 'popular',
    }
  }

  // ordena os posts de acordo com a opção escolhida(por padrão ordena pelo mais popular => mais votos)
  handleClick = (e) => {
    let sort = e.target.value
    // caso clique no ícone sobe até o elemento pai(button) para pegar o value do botão
    if(e.target.parentElement.nodeName === "BUTTON") {
      const node = e.target.parentElement
      sort = node.value
    } else if(e.target.parentElement.nodeName === "g") {
      const node = e.target.parentElement.parentElement.parentElement
      sort = node.value
    }
    this.props.sortPosts(sort, this.props.posts)
    this.setState({ sortActive: sort })
  }

  render() {
    // array com os tipos de botões de ordenação
    const sortOptions = [
      {value: 'date', icon: <FaCalendar /> },
      {value: 'popular', icon: <MdThumbUp /> },
      {value: 'unpopular', icon: <MdThumbDown /> },
      {value: 'hot', icon: <FaFire /> }
    ]
    return (
      <div className="row" style={{marginBottom:10}}>
        <div className="col-md-10 col-sm-12">
          <ul className="nav nav-tabs">
            {sortOptions.map(item => 
              <li className="nav-item" key={item.value}>
                <button
                  className={this.state.sortActive === item.value ? "nav-link btn btn-link active sortButtonActive" : "nav-link btn btn-link"}
                  value={item.value} onClick={this.handleClick}>{item.value} {item.icon}
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="col-md-2 col-sm-6">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link to='/newpost' className="float-right nav-link">New Post <FaEdit /></Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

SortButtons.propTypes = {
  posts: PropTypes.array,
  sortPosts: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    posts: state.postReducer.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    sortPosts: (sort, posts) => dispatch(sortPosts(sort, posts))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortButtons)