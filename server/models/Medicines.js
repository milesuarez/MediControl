const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicinesSchema = new Schema({
    creatorId   : { type: Schema.Types.ObjectId, ref: "User" },
    nameMedicine: String,
    startDate   : Date,
    finishDate  : Date,
    dosesTime   : String,
    doses       : Number,
    unit        : { type: String, enum: ['mg', 'ml'], default: 'mg' },
}, {
    timestamps: {
      createdAt : 'created_at',
      updatedAt : 'updated_at'
    }
  });

const Medicines = mongoose.model('Medicines', medicinesSchema);
module.exports = Medicines;

