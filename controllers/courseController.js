const Course = require("../moduls/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.takeAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort("-createdAt");
    res.status(200).render('courses',{
      page_name: 'courses',
      courses
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug: req.params.slug});
    res.status(200).render('course',{
      page_name: 'course',
      course
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};