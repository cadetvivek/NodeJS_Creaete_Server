const express = require('express');
const router = express.Router();
const Person = require('../modules/Person')

//POST route to add a person
router.post("/", async (req, res) => {
    try {
      const data = req.body; //body contain the data
  
      //create a new person document using the mongoose model
      const newPerson = new Person(data);
  
      // Save the new person to the database
      const response = await newPerson.save();
      console.log("data save");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } 
  });
  
  //GET method to get the person
  router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from URL parameter
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error fetching person data:', err); // Log detailed error
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  });

  router.put('/:id', async(req,res)=>{
    try{
      const personId = req.params.id;// Extract the id from the URL parameter
      const updatePersonData = req.body;// Update data for the person

      const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
        new:true, //Return the update document
        runValidator:true,// Run Mongoose validation

        
      })

      if(!response){
        return res.status(404).json({error:'Person not found'})
      }
      console.log('data updated');
      res.status(200).json(response)
    }catch(err){
      console.error('Error fetching person data:', err); // Log detailed error
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  })

  router.delete('/:id', async(req,res)=>{
    try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId)
    if(!response){
      return res.status(404).json({error:'Person not found'})
    }
    console.log('data deleted');
    res.status(200).json({massage:'person Delete Successfully'})
    }catch(err){
      console.error('Error fetching person data:', err); // Log detailed error
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  })

  module.exports = router;