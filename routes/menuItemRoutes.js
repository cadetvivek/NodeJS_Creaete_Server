const express = require('express');
const router = express.Router();
const MenuItem = require("./../modules/MenuItem");
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log("Data saved:");
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Get method to get data
  router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("Data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType; // Extract the work type from URL parameter
        if (tasteType === 'sweet' || tasteType === 'spicy' || tasteType === 'sour') {
            const response = await MenuItem.find({ taste: tasteType });
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

  module.exports = router;