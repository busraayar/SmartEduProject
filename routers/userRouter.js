const express = require('express');
const { body } = require('express-validator');
const authController = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../moduls/User');


const router = express.Router();

router.route("/signup").post(
    [
        body('name').notEmpty().withMessage('Please enter your name'),


        body('email').isEmail().withMessage('Please enter your email')
        .custom((userEmail) => {
            return User.findOne({email: userEmail}).then(user => {
                if(user){
                    return Promise.reject('This email already exist');
                }
            })
        }),


        body('password').notEmpty().withMessage('Please enter your password')
    ],
    authController.createUser);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware ,authController.getDashboardPage);

module.exports = router;
