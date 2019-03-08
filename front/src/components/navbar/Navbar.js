
import React, { Component } from 'react';
import Signup from '../auth/Signup';
import Login from '../auth/Login';
import { Switch, Route, Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';
import DailyMedicines from '../contents/DailyMedicines'
import Medicines from '../contents/Medicines';
import Contents from '../contents/Contents';
import MedicinesAll from '../contents/MedicinesAll';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.getUser();
  }

  
  getUser = () => {
    this.service.loggedin()
    .then(loggedInUser => this.setState({...this.state, loggedInUser}))
  }

  componentWillReceiveProps(nextProps) {
    this.getUser();
    // this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })

  }

  handleLogout = (e) => {
    this.props.logout()
  }


  render() {

    if (this.state.loggedInUser) {

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
              <li>
                <Link to={`/dailyMedicines/${this.state.loggedInUser._id}`}>
                  {<p>Dosis hoy</p>}

                </Link>
              </li>

              <li><a onClick={this.handleLogout}>Salir</a></li>
            </ul>

          </nav>
          <Switch>
            <Route exact path='/medicineAll/:user_id' render={() => <MedicinesAll userData={this.state.loggedInUser._id} />} />
            {/* <Route exact path='/' render={() => <MedicinesAll userData={this.state.loggedInUser._id} />} /> */}
            <Route exact path='/dailyMedicines/:user_id' render={() => <DailyMedicines userData={this.state.loggedInUser._id} />} />
            <Route exact path='/medicines/:user_id' render={() => <Medicines userData={this.state.loggedInUser._id} getUser={this.props.getUser} />} />

          </Switch>
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
            <Switch>
              <Route exact path='/signup' render={() => <Signup getUser={this.props.getUser} />} />
              <Route exact path='/login' render={() => <Login getUser={this.props.getUser} />} />

            </Switch>
          </nav>
        </div>
      )
    }
  }
}

export default Navbar;