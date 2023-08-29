const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route("/").post(roleMiddleware("student", "teacher"), courseController.createCourse);
router.route("/").get(courseController.takeAllCourses);
router.route("/:slug").get(courseController.getCourse);

module.exports = router;
