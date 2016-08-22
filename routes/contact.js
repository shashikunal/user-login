var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('contact', { title: 'Contact' });
});

router.post('/send' , function(req,res,next){
  var transporter = nodemailer.createTransport({ 
  	service: 'Gmail', 
  	auth: { user: 'shashikunal@gmail.com',
  	pass: 'something' } 

});

  var mainOptions = {
  		from:'manu<manu@yahoo.com>',
  		to:'shashikunal@gmail.com',
  		subject:'website submission',
  		text:'you have a new submission with the following details ..Name:'+req.body.name+'Email:'+req.body.email+'Message:'+req.body.message,
  		html:'<p>you got a new submission with following details' +'<hr>'+req.body.name+'<hr>' + 'Email:'+' ' +req.body.email+'<hr>' + 'message:' + ' ' +req.body.message
  	}
  	transporter.sendMail(mainOptions, function(err , info){
  		if(err){
  			console.log(err);
  			res.redirect('/');
  		}else{
  			console.log('messgae sent'+info.response);
  			res.redirect('/');
  		}
  	});

});

module.exports = router;