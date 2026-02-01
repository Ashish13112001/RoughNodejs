const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have name'],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // response send k time ye include nahi hogi
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//we can't use virtual property when we do any query(because this is not part of the BD)
tourSchema.virtual('durationWeeka').get(function () {
  return this.duration / 7;
});

//4 types of middleware in mongodb -- document, query, aggregate, model

//DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function () {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
});
// tourSchema.post('save', function (doc) {
//   console.log('😂', doc);
// });

//QUERY MIDDLEWARE
// tourSchema.pre('find', function () {
tourSchema.pre(/^find/, function () {
  // this regular expression is use all query which start with find
  this.start = Date.now();
  this.find({ secretTour: { $ne: true } });
});
tourSchema.post(/^find/, function (docs) {
  console.log(`query took ${Date.now() - this.start} milliseconds`);
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log('00--', this.pipeline());
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
