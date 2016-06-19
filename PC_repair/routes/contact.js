var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

console.log("in contact");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res){
	console.log("hihi");

	res.send("Form Submitted");

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'elvac8866@gmail.com',
			pass: 'iloveeddiepeng'
		}
		});
	
	var mailOptions = {
    from: 'Fred Foo 👥 <elvac8866@gmail.com>', // sender address
    to: 'odekyc@gmail.com', // list of receivers
    subject: 'Website Submission', // Subject line
    text: 'You have  a submission with the following details....Name: '+req.body.name +' Email: '+req.body.email+' Message: '+ req.body.message, // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
        res.redirect('/');
    }
    console.log('Message sent: ' + info.response);
});
  

});


module.exports = router;