"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//user schema

const UserSchema = mongoose.Schema ({

     
   
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdtime:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    bio:{
        type:String
    }

});

const User = module.exports = mongoose.model('users', UserSchema);


// add user
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err,salt)=>{
      bcrypt.hash(newUser.password, salt, (err, hash)=>{
         if(err) throw err;
         newUser.password = hash;
         newUser.save(callback);
      }); 
    });
}


// comparePassword
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err) throw err;
        callback(null, isMatch);
    });
}

// getByID
module.exports.getUserById = function(id, callback) {
    // const query = ({ _id : id })
    User.findById(id, callback);
  }


// getByUsername
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback);
  }

 
// getByEmail
module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}
    User.findOne(query, callback);
  }
  
// getAllUsers  
module.exports.getUsers = function (username, callback){
    User.find({
      username: {
          $ne: username
      }
  }).exec( callback );
}


// findUsername
module.exports.findUsername = function(username, callback){

    const query = {username: username}
    User.findOne(query, callback);
  }


// findEmail
module.exports.findEmail = function(email, callback){

    const query = {email: email}
    User.findOne(query, callback);
  }

// updateEmail

module.exports.updateEmail = function(key,email ,callback){

    const query = { username: key};
    const values = { $set: {email: email}};
    User.updateOne(query, values, callback, (err, user)  =>{
        if (err) throw err;
    });    
    
}

// updateUsername

module.exports.updateUsername = function(key,username ,callback){

    const query = { username: key};
    const values = { $set: {username: username}};
    User.updateOne(query, values, callback, (err, user)  =>{
        if (err) throw err;
    });    
    
}

// updatePassword

module.exports.updatePassword = function(key,password ,callback){

    const query = { username: key};
    const values = { $set: {password: password}};
    User.updateOne(query, values, callback, (err, user)  =>{
        if (err) throw err;
    });    
    
}

// updateBio

module.exports.updateBio = function(key,bio ,callback){

    const query = { username: key};
    const values = { $set: {bio: bio}};
    User.updateOne(query, values, callback, (err, user)  =>{
        if (err) throw err;
    });    
    
}

// updateImage

module.exports.updateImage = function(key,image ,callback){

    const query = { username: key};
    const values = { $set: {image: image}};
    User.updateOne(query, values, callback, (err, user)  =>{
        if (err) throw err;
    });    
    
}

// deleteUsers
module.exports.deleteUser = function(username, callback){
     const query = { username: username };
    User.deleteOne(query,callback);
}
