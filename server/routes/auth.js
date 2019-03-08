const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Medicine = require("../models/Medicines");
const DailyMedicines = require("../models/DailyMedicines");
const passport = require('passport');
const uploader = require('../config/cloudinary-setup')

// CONTROL DE ACCESO A LA APLICACÓN


const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
})


// SIGNUP
router.post('/signup', (req, res, next) => {

  const {username, password, email, dateBirth, weigth, heigth, imageUrl } = req.body;

  console.log('username', username)
  console.log('password', password)
  console.log('Parameters', req.body.imageUrl)
  // Check for non empty user or password
  if (!username || !password){
    
    //res.status(500).json({ message: 'Usuario y/o clave de acceso ivalida' });
    //next (new Error('You must provide valid credentials')); //REVISAR NO ESTA DEVOLVIENDO LOS ERRORES antes tenia un next
  }
  else {
  // Check if user exists in DB
  User.findOne({ username })
  .then( foundUser => {
    if (foundUser) return res.status(500).json(JSON.stringify({message:'Username already exists'}));

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    return imageUrl ? new User({
      username,
      password: hashPass,
      email,
      dateBirth,
      weigth,
      heigth,
      imageUrl
      
    }).save() : new User({
      username,
      password: hashPass,
      email,
      dateBirth,
      weigth,
      heigth,
      
    }).save();
    
  })
  .then( savedUser => login(req, savedUser)) // Login the user using passport
  .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
 
  .catch(e => next(e));
}
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
    // Check for errors
    if (err) next(new Error('Something went wrong')); 
    if (!theUser) next(failureDetails)

    // Return user and logged in
    login(req, theUser)
    .then(user => res.status(200).json(req.user));

  })(req, res, next);
});


router.get('/currentuser', (req,res,next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    res.status(500).json({ message: err.message });
    //next(new Error('Not logged in'))
  }
})


router.get('/logout', (req,res) => {
  req.logout();
  res.redirect("/");
  //res.status(200).json({message:'logged out'})
});

// GESTIÓN DE LOS MEDICAMENTOS QUE CONSUME EL PACIENTE
//, ensureLoggedIn("/") debo buscar la manera de asegurar que solo entre cuando esta logiado el usuario


router.get('/medicinesAll/:user_id',(req, res, next) => {
  let today1 = (new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+((new Date()).getDate())+' 00:00:00.000';
 // let today = '2019-03-07'+' 00:00:00.000';
  let theDate = new Date(today1).toISOString()
 // console.log("DAAAAAA",today,new Date(today).toISOString())
  Medicine.find({$and: [{creatorId: req.params.user_id}, 
                        {$or:[{startDate:{$gte: theDate}}, {finishDate:{$gte: theDate}}]}]})
  .sort({ startDate: 'asc', dosesTime: 'asc' })
    .then(medicine =>res.json( medicine) )
    .catch(error => { console.log(error) }) 
});

// {$or:[{startDate:{$gte: theDate}}, {finishDate:{$lte: theDate}}]}]})

router.get('/medicine/:medicine_id', (req, res, next) => {
  Medicine.findById(req.params.medicine_id)
  .then(medicine =>{ 
      res.render('Medicine', {medicine}) })
  .catch(error => { console.log(error) }) 
});

router.get('/addMedicine/:user_id',(req, res, next) => {
  res.render('addMedicine');
});


router.post('/addMedicine',(req, res, next) => {

  const {nameMedicine, startDate, finishDate, dosesTime, doses, unit} = req.body;
  
  console.log(req.session.passport.user,"Agregando un medicamento",req.body)
  new Medicine({
      creatorId     :   req.session.passport.user,
      nameMedicine,
      startDate,
      finishDate,
      dosesTime,
      doses,
      unit       
      
  })
    .save()
    .then((data) => { return res.json({data})})
    .catch(error => { return res.json({error,message:"No pude guardar"}) });
});



router.get('/updateMedicine/:medicine_id',(req, res, next) => {
  Medicine.findById(req.params.id)
    .then(medicine =>{  res.render('updateMedicine', { medicine }) })
    .catch(error => { console.log(error) }) 
  
});

router.post('/updateMedicine',(req, res, next) => {
  const {startDate,finishDate,doses,unit} = req.body;
  const DateToday=new Date();
  if (startDate< DateToday || finishDate > startDate){return res.status(500).json(JSON.stringify({message:'Username already exists'}));
  } 
  const medicineID = req.body.medicine_id;
  const medicineUpdate = { 
    startDate,
    finishDate,
    doses,
    unit
  }

  Medicine.findOneAndUpdate({_id: medicineID}, medicineUpdate, {new: true})
    .then(() => res.redirect('/addMedicine/:medicineID'))
    .catch(error => { console.log(error) }) 
  
});

// GESTIÓN DEL PLAN DE TOMA DE DOSIS DIARIA

router.get('/daily/:user_id',(req, res, next) => {
  let today1 = (new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+((new Date()).getDate())+' 00:00:00.000';
  let theDate = new Date(today1).toISOString()

  Medicine.find({creatorId: req.params.user_id, startDate:{$lte: theDate}, finishDate:{$gte: theDate }})
  .sort({ dosesTime: 'asc' })
    .then(medicine =>res.json( medicine) )
    .catch(error => { console.log(error) }) 
});



router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})

module.exports = router;
