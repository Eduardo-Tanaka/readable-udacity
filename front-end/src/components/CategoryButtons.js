import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCategories } from '../actions/categoryActions'

// Essa classe representa os botões de categoria do menu lateral esquerdo
class CategoryButtons extends React.Component {
  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    return (
      <nav className="nav flex-column">
        <Link to='/' className={this.props.active === 'all' ? "nav-link sidenav-border sidenav-active" : "nav-link sidenav-border"}>
          Todos
        </Link>
        {this.props.categories.map(item =>
          <Link to={{pathname: `/${item.name}`}} key={item.name} 
          className={this.props.active === `${item.name}` ? "nav-link sidenav-border sidenav-active" : "nav-link sidenav-border"}>
            {item.name}
          </Link>
        )}
      </nav>
    )
  }
}

CategoryButtons.propTypes = {
  categories: PropTypes.array,
  active: PropTypes.string,
  getCategories: PropTypes.func,
}

function mapStateToProps (state, props) {
  return {
    categories: state.categoryReducer.categories,
    active: state.categoryReducer.active
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryButtons)