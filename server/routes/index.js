let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact us page. */
router.get('/contactus', indexController.displayContactusPage);

/* Get route for displaying Login page*/
router.get('/login', indexController.displayLoginPage);

/* Post route for processing Login page */
router.post('/login ', indexController.processLoginPage);

/* Get route for displaying register page*/
router.get('/register', indexController.displayRegisterPage);

/* Post route for processing register page */
router.post('/register ', indexController.processRegisterPage);

/* Get route for displaying logout page */
router.get('/logout', indexController.performLogout);



module.exports = router;
