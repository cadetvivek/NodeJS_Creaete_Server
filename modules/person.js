const mongoose = require('mongoose');
//here we are define a person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        requred:true
    }
})

// Create person model
const Person = mongoose.model('Person',personSchema);
module.exports=Person;