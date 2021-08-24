const { Schema, model } = require('mongoose')

const User = new Schema({
  username: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  //   company: { type: Schema.Types.ObjectId, ref: 'Company' },
})

module.exports = model('User', User)
