const Tour = require('./../models/tourModel');
const APIFeature = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,difficulty';
  next();
};

exports.getAllTour = catchAsync(async (req, res, next) => {
    //*****EXECUTE QUERY*****
    const features = new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    //*****SEND RESPONSE*****
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tour: tours,
      },
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id); //Tour.findOne({ _id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
});

// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   }
// };

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});

//we didn't actually update any data (It just demo how patch work)
exports.updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // because of this validator run again
    });
    res.status(200).json({
      status: 'success',
      result: tour.length,
      data: {
        tour: tour,
      },
    });
});

//we didn't actually delete any data (It just demo how delete work)
exports.deleteTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      result: tour.length,
      data: null,
    });
});

exports.getTourStats = catchAsync(async (req, res) => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: '$difficulty',
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
});

//find the busyest month in a year
exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      { $unwind: '$startDates' },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tour: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
    ]);

    res.status(200).json({
      status: 'success',
      result: plan.length,
      data: {
        plan,
      },
    });
});
