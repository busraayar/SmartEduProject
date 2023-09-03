const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route("/").post(roleMiddleware(["admin", "teacher"]), courseController.createCourse);
router.route("/").get(courseController.takeAllCourses);
router.route("/:slug").get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourse);
router.route("/release").post(courseController.releaseCourse);



module.exports = router;
