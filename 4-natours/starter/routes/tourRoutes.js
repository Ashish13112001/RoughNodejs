const fs = require('node:fs');

const express = require('express');
/*Another way of accessing callback function
const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('../controllers/tourController');
*/
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTour);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTour)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
