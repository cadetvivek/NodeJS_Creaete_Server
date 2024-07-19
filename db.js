 const mongoose = require('mongoose' );
 require('dotenv').config();

 // Define the MongoDB connection URL
//  const mongoURL =  'mongodb://localhost:27017/hotels'
//const mongoURL = process.env.MONGODB_URL_LOCAL// replace mydatabases with your databaas name
 const mongoURL =process.env.MONGODB_URL;
 
 //set up Mongodb connection
 mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
 })
//get the defauld connection
//mongoose maintains a default connection object repressenting the mongoDB connection
 const db = mongoose.connection; 
 

 //define event listeners for data connnection
 db.on('connected',()=>{
    console.log('Connected to mongodb server')
 });


 db.on('error',(err)=>{
    console.error('Connected to mongodb connection error',err)
 });


 db.on('disconnected',()=>{
    console.log('Connected to mongodb disconnected')
 });

 // export database connection
 module.exports = db;