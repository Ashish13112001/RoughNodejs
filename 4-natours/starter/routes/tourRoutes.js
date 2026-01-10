const fs = require('node:fs');

const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

//This middleware (param middleware) only run when "/api/v1/tours" hit with id => "/api/v1/tours/4"
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
