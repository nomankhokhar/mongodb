const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255,
    // match : /pattern/
    required: true
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'network'] // this mean only comes these array values
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: {
        function(v) {
          return v && v.length > 0
        },
        message: "A course should have at least one tag."
      }
    },
    date: Date,
    isPublished: Boolean,
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
      min: 10,
      max: 200,
    },
  });

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find({ isPublished: true })
    .or([
      { price: { $gte: 15 } },
      { name: /.*by.*/i }
    ])
    .sort('-price')
    .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();