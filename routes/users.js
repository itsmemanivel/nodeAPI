"use strict";

const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/users');
var bcrypt = require('bcryptjs');

// Register
router.post('/register', (req, res, next)=>{
     let newUser = new User ({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        createdtime: new Date().toISOString(),
        bio:req.body.bio,
        image:req.body.image
     });

//chech valid fields
if(req.body.email && req.body.password){  

   // find username is available
   User.findUsername(newUser.username, (err, username)=>{
        if(username){
            res.json({ success:false, msg: "Username Already taken" });
        } else {

            // find email is available
            User.findEmail(newUser.email, (err, email)=>{
                if(email){
                    res.json({ success:false, msg: "Email Already Registered" });
                } else {

                    // register User
                    User.addUser(newUser, (err, user)=>{
                        if(err){
                            res.json({ success:false , msg: "Failed to register User" });
                        } else {
                            res.json({ success:true, data:user , msg:"Successfully Registered"});
                        }
                    });  
                    
                }

            });
        }
   });
} else {
    res.json({ success:false, msg:"Enter valid!"})
}
});


// Login
router.post('/login', (req, res, next)=>{
   
     const  email = req.body.email;
     const  password = req.body.password;
   

   //find user by email 
   User.getUserByEmail(email, (err, user)=>{
        if(user){

            User.comparePassword(password, user.password, (err, isMatch)=>{
                  if(!isMatch) {
                      res.json({ msg:"Wrong Password!" });
                  } else{
                    res.json({ success:true, data:user , msg:"Successfully Loged In" });

                  }
            });

        } else {
            res.json({ success:false , msg: "Login Failed! Email not found" });
        }
   });
});




//GET
 
 router.get('/:username', (req, res, next) =>{
   
       const username = req.params.username ;
       const email = req.params.email;

    //  check valid fields
    if(username){

        // getbyusername
        User.getUserByUsername(username, (err, user)=>{
              if(user){
                  res.json({ success:true, data:user });
              } else {
                res.json({ success:false, msg:" User Not Found! " });

              }
        });
    } else if(email){

        // getbyemail
        User.getUserByEmail(email, (err, user)=>{
            if(user){
                res.json({ success:true, data:user });
            } else {
                res.json({ success:false, msg:" User Not Found! " });

            }
        });

    }  else{
        res.json({ success:false, msg:" Enter Valid! " });
    }
        
 });





// DELETE

router.delete('/:username', (req,res, next) =>{
 
     const username = req.params.username;
     User.deleteUser(username, (err, Deleted) =>{
        if (Deleted.deletedCount === 0){
            res.json({ msg:"user not found"});
        }else{
            res.json({ msg:"Deleted"});
        }
     });
});




module.exports = router;