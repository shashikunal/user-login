var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
        res.location('/users/login');
        res.redirect('/users/login');
     }

});

passport.serializeUser(function(user,done){
	done(null , user.id);
});
passport.deserializeUser(function(id , done){
	User.getUserById(id,function(err , user){
		done(err , user);
	});
});


//localStrategy
passport.use(new LocalStrategy(function(username, password,done){
 User.getUserByUsername(username , function(err , user){
 	if(err)throw err;
 	if(!user){
 		console.log('unknown user');
 		return done(null,false,{message:'unknown User'});
 	}

 	User.comparePassword(password , user.password , function(err , isMatch){
 		if(err) throw err;
 		if(isMatch){
 			return done(null , user);
 		}else{
 			console.log('Invalid Password');
 			return done(null , false , {message:'Invalid password'});
 		}
 	});
 });
}
));

//passport authenticate

router.post('/login' , passport.authenticate('local' , {failureRedirect:'/users/login' , failureFlash:'Invalid Username Or Password'}), 
	function(req , res, next){
console.log('authentication is succesfull');
req.flash('success' , 'You are logged in');
res.redirect('/');

});


router.get('/logout' , function(req , res){
  req.logout();
  req.flash('success' , 'You have logged out');
  res.redirect('/users/login');
});


module.exports = router;
