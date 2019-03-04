
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import Contents from './Contents'

class MyDaily extends Component {
  
  render() {
    console.log("ww22",this.props.userInSession.username)
    if (this.props.userInSession.username ==='uu') {
      let photo = '../../../public/images/default.jpg'
      
      
      return (
        <div>
          <img width="20%" alt ="Mi foto" src={photo} />
          <nav className="nav-style">
            <ul>
              <li><a onClick={this.handleLogout}>Salir</a></li>
            </ul>

            <h2>Welcome, {this.props.userInSession.username}</h2>
            <Contents></Contents>
          </nav>
        </div>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul>
              <li><Link to='/signup'>Registrarse</Link></li>
              <li><Link to='/login'>Ingresar</Link></li>
            </ul>
          </nav>
        </div>
      )
    }
  }
}

export default MyDaily;