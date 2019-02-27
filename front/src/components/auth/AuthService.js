// auth/auth-service.js
import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/api/auth',
      withCredentials: true
    });
  }

  handleUpload = theFile => {
    return this.service.post('/upload', theFile)
      .then(res => res.data)
      .catch(this.errorHandler);
  }


  signup = (username, password,dateBirth,weigth,heigth) => {
    return this.service.post('/signup', {username, password, dateBirth,weigth,heigth})
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