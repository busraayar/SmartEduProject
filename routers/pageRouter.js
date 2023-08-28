const express = require('express');
const pageController = require('../controllers/pageController');
const userMiddleware = require('../middlewares/userMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(userMiddleware, pageController.getRegisterPage);
router.route('/login').get(userMiddleware, pageController.getLoginPage);


module.exports = router;
