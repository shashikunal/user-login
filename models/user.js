var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

//user schema

var UserSchema = mongoose.Schema({
    username:{type:String,index:true},
    password:{type:String,required:true,bcrypt:true},
    email:{type:String},
    name:{type:String}

});

var User = module.exports = mongoose.model('user' , UserSchema);

module.exports.comparePassword = function(condidatePassword , hash , callback){
	bcrypt.compare(condidatePassword , hash , function(err , isMatch){
		if(err) return callback(err);
		callback(null , isMatch);
	});
}

module.exports.getUserById = function(id , callback){
 User.findById(id , callback);
}

module.exports.getUserByUsername = function(username , callback){
   var query = {username:username};
   User.findOne(query , callback);
}

module.exports.createUser = function(newUser,callback){
	bcrypt.hash(newUser.password, 10,function(err,hash){
     if(err)throw err;
     //set hashed pw
     newUser.password = hash;
     //create user
     newUser.save(callback);
	});
 newUser.save(callback);
}