// auth/auth-service.js
import axios from 'axios';

// console.log("wwww",env)process.env.REACT_APP_baseURL,
// debugger

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_baseURL,
      withCredentials: true
    });
  };
  handleUpload = theFile => {
    return this.service.post('/upload', theFile)
      .then(res => res.data)
      .catch(this.errorHandler);
  }


  signup = (username, password,dateBirth,weigth,heigth,imageUrl) => {
    return this.service.post('/signup', {username, password, dateBirth,weigth,heigth,imageUrl})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

export default AuthService;