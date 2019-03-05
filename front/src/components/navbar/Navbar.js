
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import DailyMedicines from '../contents/DailyMedicines'
import Medicines from '../contents/Medicines'

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
      
      console.log("WWWWggg", this.props);
  
      return (
        <div>
          <img width="20%" alt="Mi foto" src={this.state.loggedInUser.imageUrl} />
          <h4>{this.state.loggedInUser.username}</h4>
          <nav className="nav-style">
            <ul>
              <li>
                <Link to={`/medicineAll/${this.state.loggedInUser._id}`}>
                  {<p>Planificación</p>}

                </Link>
              </li>

              <li><a onClick={this.handleLogout}>Salir</a></li>
            </ul>

           
          
            <Medicines creatorId={this.state.loggedInUser._id} getUser={this.props.getUser} />
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