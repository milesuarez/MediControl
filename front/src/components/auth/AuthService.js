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


  signup = (username, password, email, dateBirth, weigth, heigth, imageUrl) => {
    return this.service.post('/signup', {username, password, email, dateBirth, weigth, heigth, imageUrl})
    .then(response => response.data)
  }

  login = (username, password) => {console.log("en el login")
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

  medicines = (creatorId) => { console.log("en el server")
    return this.service.get('/medicines',{creatorId})
    .then(response => response.data)
  }

  medicinesAdd = (creatorId, nameMedicine, startDate, finishDate, doses, unidades) => {
    return this.service.post('/medicines/add',{creatorId, nameMedicine, startDate, finishDate, doses, unidades})
    .then(response => response.data)
  }

  medicinesDelete = (id) => {
    return this.service.post('/medicines/delete',{id})
    .then(response => response.data)
  }

  medicinesUpdate = (id) => {
    return this.service.post('/medicines/update',{id})
    .then(response => response.data)
  }


  dailyMedicines = (creatorId) => {
    return this.service.get('/dailyMedicines',{creatorId})
    .then(response => response.data)
  }

  dailyMedicinesDone = (id) => {
    return this.service.get('/dailyMedicinesDone',{id})
    .then(response => response.data)
  }

  dailyMedicinesUnDone = (id) => {
    return this.service.get('/dailyMedicines',{id})
    .then(response => response.data)
  }


}

export default AuthService;