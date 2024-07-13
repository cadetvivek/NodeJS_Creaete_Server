const express = require('express')
const app = express()
const db = require('./db')
const Person = require('./modules/person');
const MenuItem = require('./modules/MenuItem')
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/', (req, res) => {
 res.send('wellcome to my restorent ')
})

//POST route to add a person
app.post('/person',async (req,res)=>{
   try{
const data = req.body;//body contain the data

//create a new person document using the mongoose model
const newPerson = new Person(data);

// Save the new person to the database
const response = await newPerson.save()
console.log('data save');
res.status(200).json(response);
   }catch(err){
     console.log(err)
     res.status(500).json({error:'Internal Server Error'})
   }
})

//GET method to get the person
app.get('/person',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

app.listen(3000,()=>{   
    console.log('you are listening on port 3000')
})

  