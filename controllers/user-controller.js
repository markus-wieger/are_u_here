const jwt = require('jsonwebtoken');
const db = require("../database/db");

class UserController {


    login = async (req, res) => {


        const{ email, password } = req.body;

        if(!email ||!password) return res.json({ status: 'error', message: 'Please fill in all the fields' });
        else {
            db.query("SELECT * FROM teachers WHERE email =?",[email], async (Err, results) => {
                if (Err) throw Err;
                if(results.length == 0 || results[0].password!= password) return res.json({ status: 'error', message: 'Wrong email or password' });
                else {
                    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '100d' });
                    
                    const cookieOptions = {
                        expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                        httpOnly: true,
                    }
                    res.cookie('userRegistered', token, cookieOptions);

                    return res.json({ status:'success', message: 'Successfully logged in' });
                }

            })
        }

    }


    logout = (req, res) => {
        res.clearCookie('userRegistered');
        return res.json({ status:'success', message: 'Successfully logged out' });
    }

    loggedIn = (req, res, next) => {
        if (!req.cookies.userRegistered) return next();
        try {
            const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);

            db.query('SELECT * FROM users WHERE id =?', [decoded.id], (err, results) => {
                if (err) return next();
                req.user = results[0];
                return next();
            })
        } catch {
            if (err) return next();}
        
    }


}

module.exports = new UserController();