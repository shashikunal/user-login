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