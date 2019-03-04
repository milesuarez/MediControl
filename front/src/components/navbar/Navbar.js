
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })

  }

  handleLogout = (e) => {
    this.props.logout()
  }


  render() {
    

    if (this.state.loggedInUser) {
      
      console.log("WWWWggg", this.state.loggedInUser._id);
  
      return (
        <div>
          <img width="20%" alt="Mi foto" src={this.state.loggedInUser.imageUrl} />
          <nav className="nav-style">
            <ul>
              <li>
                <Link to={`/medicineAll/${this.state.loggedInUser._id}`}>
                  {<p>Planificación</p>}

                </Link>
              </li>

              <li><a onClick={this.handleLogout}>Salir</a></li>
            </ul>

            <h4>Welcome, {this.state.loggedInUser.username}</h4>
            <p>Aqui va el listado de medicinas del dia</p>
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

export default Navbar;