const express = require("express");
const router = express.Router();
const Zone = require("../models/ZoneModel");

// Get all zones
router.get("/", async (req, res) => {
  try {
    // Define the zones you want to create or check for
    const zonesToCreate = [
      { name: "gold-star-1", categories: ["New Tea", "Tea"] },
      {
        name: "gold-star-2",
        categories: ["Durian", "Tea", "New Cinnamon", "Old Cinnamon"],
      },
      { name: "gold-star-3", categories: ["New Tea"] },
      { name: "gold-star-4", categories: ["Coconut"] },
    ];

    // Loop through the zones to create or check
    for (const zoneData of zonesToCreate) {
      const existingZone = await Zone.findOne(zoneData);

      if (!existingZone) {
        // Zone doesn't exist, create a new one
        const newZone = new Zone(zoneData);
        await newZone.save();
      }
    }

    // Fetch all zones and send them as a response
    const zones = await Zone.find();
    res.json(zones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
