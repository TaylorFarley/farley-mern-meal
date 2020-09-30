const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mealSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  healthy: {
    type: Boolean,
    required: true
  }
}, {
    collection: 'meals'
  })

module.exports = mongoose.model('Meal', mealSchema)