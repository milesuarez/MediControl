const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username  : String,
  password  : String,
  email     : String,
  dateBirth : String,
  weigth    : Number,
  heigth    : Number,
  imageUrl  : { type: String, default: 'https://res.cloudinary.com/inversiones-ladajosa-c-a/image/upload/v1551466628/thing-gallery/defailt.jpg.jpg' },
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;