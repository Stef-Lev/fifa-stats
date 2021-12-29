const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  passwordCheck:{
    type: String, 
    required: true,
    validate: {
      validator: function(el) {
          return el === this.password;
      }, message: 'Passwords don\'t match.'
  }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  games_played: {
    list: [{ type: Schema.Types.ObjectId, ref: 'Game', default: [] }],
    statistics: {
      total: { type: Number, default: 0 },
      won: { type: Number, default: 0 },
      drawn: { type: Number, default: 0 },
      lost: { type: Number, default: 0 },
    },
  },
  tournaments_played: {
    total: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
  },
  goals: {
    for: { type: Number, default: 0 },
    against: { type: Number, default: 0 },
  },
});

//schema middleware to apply before saving 
PlayerSchema.pre('save', async function(next) {
     
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordCheck = undefined; 
  next();
});

//check password at login
PlayerSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('Player', PlayerSchema);
