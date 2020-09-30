let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// meal Model
let mealSchema = require('../Models/Meals');

// CREATE meal
router.route('/create-meal').post((req, res, next) => {
  mealSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
      
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ meals
router.route('/').get((req, res) => {
  mealSchema.find((error, data) => {
    if (error) {
      return next(error)
      
    } else {
      
      res.json(data)   
      console.log(data)
    }
  })
})

router.route('/meals').get((req, res) => {
  mealSchema.find((error, data) => {
    if (error) {
      return next(error)
      
    } else {
      
      res.json(data)   
      console.log(data)
    }
  })
})

// Get Single meal
router.route('/edit-meal/:id').get((req, res) => {
  mealSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update meal
router.route('/update-meal/:id').put((req, res, next) => {
  mealSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Meal updated successfully !')
    }
  })
})

// Delete meal
router.route('/delete-meal/:id').delete((req, res, next) => {
  mealSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;