var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/register' , function(req, res, next){
   res.render('register' , {
   	'title':'Register'
   });
});
router.get('/login' , function(req, res, next){
   res.render('login' , {
   	'title':'Login'
   });
});

router.post('/register' , function(req,res,next){
      var name      = req.body.name;
      var email     = req.body.email;
      var username  = req.body.username;
      var password  = req.body.password;
      var confirm   = req.body.confirm;  
  
  //form validation
  req.checkBody('name' , 'Name field is required').notEmpty(); 
  req.checkBody('email' , 'Email field is required').notEmpty(); 
  req.checkBody('email' , 'Email is not valid').isEmail(); 
  req.checkBody('username' , 'Username field is required').notEmpty(); 
  req.checkBody('password' , 'Password field is required').notEmpty(); 
  req.checkBody('confirm' , 'Password do not match').equals(req.body.password); 

   //check for errors
var errors = req.validationErrors();

     if(errors){
     	res.render('register' , {
         errors:errors,
         name:name,
         email:email,
         username:username,
         password:password,
         confirm:confirm
     	});
     }else{
     	var newuser = new User({
     		name:name,
     		email:email,
     		username:username,
     		password:password

     	});
     	User.createUser(newuser , function(err , user){
     		if(err) throw err;
     		console.log(user);
     	});
     	req.flash('success' , 'you are now registered and may log in');
        res.location('/');
        res.redirect('/');
     }

});






module.exports = router;
