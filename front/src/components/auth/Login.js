// auth/Signup.js
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import AuthService from './AuthService'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' , error:false};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        
        this.setState({
          username: response.username,
          password: response.password,
          error: false
        });

        this.props.getUser(response)
        console.log("MMM",response)
      })
      .catch(error => {
        console.log(error)
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {

    return (<div>
      <h3>Ingrese sus datos de acceso</h3>

      <form id="form" onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label>Usuario:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
        </fieldset>

        <fieldset>
          <label>Clave de acceso:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        </fieldset>

        <button type="submit">Ingresar</button>
      </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
    </div>)
  }
}

export default Login;