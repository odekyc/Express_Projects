var express = require('express');
var router = express.Router();

console.log("in contact");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res){
	console.log("hihi");

	res.send("Form Submitted");
  

});


module.exports = router;