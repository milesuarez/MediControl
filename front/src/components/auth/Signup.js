// auth/Signup.js
import React, { Component } from 'react';
import AuthService from './AuthService'
import '../../style/form.css';


//signup y login son iguales a excepción de el html renderizado y el endpoint de nuestra API rest a la que llamamos
//uno llama a /signup y el otro a /login usando nuestro AuthService
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', dateBirth:'', weight:'', height:'',imageUrl: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const dateBirth = this.state.dateBirth;
    const weight = this.state.weight;
    const height = this.state.height;
    const imageUrl = this.state.imageUrl

    //aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
    this.service.signup(username, password,dateBirth,weight,height.imageUrl)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          dateBirth: "",
          weight : "",
          height : "",
          imageUrl: ""
        });
        //aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
        //por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
        //y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
        this.props.getUser(response.user)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          dateBirth: dateBirth,
          weight: weight,
          height: height,
          imageUrl: imageUrl,

          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    this.service.handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}

  render() {
    return (
      <div>
        
        <h4>Para crear su perfil complete el siguiente formulario</h4>
        <form id="form" onSubmit={this.handleFormSubmit}>
          
          <fieldset>
            <label>Usuario:</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Clave de acceso:</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Fecha de Nacimiento:</label>
            <input type="date" name="dateBirth" value={this.state.dateBirth} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Peso:</label>
            <input type="text" name="weight" value={this.state.weight} onChange={e => this.handleChange(e)} />
          </fieldset>

          <fieldset>
            <label>Altura:</label>
            <input type="text" name="height" value={this.state.height} onChange={ e => this.handleChange(e)}/>
          </fieldset>

          <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
          

          <button type="submit">Registrarse</button>
        </form>

        <h1>{this.state.error ? 'Errorttt' : ''}</h1>
        <h1>{console.log("RRR",this.state)}</h1>
      </div>
    )
  }
}

export default Signup;