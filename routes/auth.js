const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//only accessible via POST method

//          "/auth/register"
router.post('/register', authController.register);



module.exports = router;