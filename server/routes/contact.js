let express= require('express');
let router= express.Router();
let mongoose= require('mongoose');

let passport = require('passport');

let contactController = require('../controllers/contact');

//helper function for gaurd purposes
function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/* Get route for the contact list page - READ Operation*/
router.get('/', contactController.displayContactList);

/* Get route for displaying ADD page - CREATE Operation*/
router.get('/add', requireAuth, contactController.displayAddPage);

/* Post route for processing ADD page - UPDATE Operation*/
router.post('/add', requireAuth, contactController.processAddPage);

/* Get route for displaying EDIT page - CREATE Operation*/
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* Post route for processing EDIT page - UPDATE Operation*/
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* Get route for displaying DELETE page - DELETE Operation*/
router.get('/delete/:id', requireAuth, contactController.performDelete);


module.exports= router;