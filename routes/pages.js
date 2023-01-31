const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('startseite');
});

router.get('/student', (req, res) => {
    res.render('student');
});

module.exports = router;