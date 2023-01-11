const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');

//only accessible via POST method

//          "/auth/login"
router.post('/login', controller.login);



module.exports = router;