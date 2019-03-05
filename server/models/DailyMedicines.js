const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailySchema = new Schema({
    creatorId   : { type: Schema.Types.ObjectId, ref: "User" },
    medicinesId : { type: Schema.Types.ObjectId, ref: "Medicines" },
    date        : Date,
    doses       : Number,
    status      : Boolean
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    }
);

const Daily = mongoose.model('DailyMedicines', DailySchema);
module.exports = Daily;
