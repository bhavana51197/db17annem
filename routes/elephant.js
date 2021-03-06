var express = require('express');
const elephant_controlers= require('../controllers/elephant');
var router = express.Router();
/* GET costumes */
router.get('/', elephant_controlers.elephant_view_all_Page );

const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}

/* GET detail elephant page */
router.get('/detail',  elephant_controlers.elephant_view_one_Page);
/* GET create elephant page */
router.get('/create', secured, elephant_controlers.elephant_create_Page);
/* GET create update page */
router.get('/update', secured, elephant_controlers.elephant_update_Page);
/* GET delete costume page */
router.get('/delete', secured, elephant_controlers.elephant_delete_Page);

module.exports = router;