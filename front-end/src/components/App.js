import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'
import { Switch, Route, withRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink,
  Container, Row, Col 
} from 'reactstrap'

import { FaGithub } from 'react-icons/lib/fa'

import Home from './Home'
import PostByCategory from './PostByCategory'
import PostDetail from './PostDetail'
import CategoryButtons from './CategoryButtons'
import NewPost from './NewPost'
import EditPost from './EditPost'

import { fetchActiveCategory } from '../actions/categoryActions'

class App extends Component {
  // marca qual a categoria está ativa no menu lateral esquerdo
  componentDidMount() {
    this.props.setActiveCategory(window.location.pathname)
  }

  componentWillReceiveProps (nextProps) {
    this.props.setActiveCategory(window.location.pathname)
  }
    
  render() {
    return (
      <div className="App">
        <LoadingBar showFastActions />
        <ToastContainer />
        <Navbar dark expand="md" className="navbarHeader">     
          <NavbarBrand href="/">Readable Udacity React Nanodegree - Project 2</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/Eduardo-Tanaka/readable-udacity" style={{color:"white"}}>GitHub <FaGithub /></NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Container style={{marginTop:20}}>
          <Row>
            <Col md="2">
              <CategoryButtons />
            </Col>
            <Col md="10" sm="12">     
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/newpost" component={NewPost} />
                <Route path="/editPost/:post_id" component={EditPost} />
                <Route path="/:category/:post_id" component={PostDetail} />
                <Route path="/:category" component={PostByCategory} />
              </Switch>
            </Col>
          </Row>
        </Container>  
      </div>
    );
  }
}

App.propTypes = {
  setActiveCategory: PropTypes.func,
}

function mapDispatchToProps (dispatch) {
  return {
    setActiveCategory: (category) => dispatch(fetchActiveCategory(category))
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App))