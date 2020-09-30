const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mealSchema = new Schema({
  name: {
    type: String
  },
  ingredients: {
    type: String
  },
  healthy: {
    type: Boolean
  }
}, {
    collection: 'meals'
  })

module.exports = mongoose.model('Meal', mealSchema)