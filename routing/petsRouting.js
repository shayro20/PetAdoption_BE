const express = require("express");
const {v4: uuid} = require("uuid");
//const {addPet, readAllPets, deletePet} = require("../models/petModels");
const PetController = require("../controllers/petController");
const router = express.Router();

//Add validation middleware
router.post("/", (req, res) => PetController.newPet(req, res));

router.get("/", (req, res) => PetController.searchPets(req, res));

router.get("/pets/:id");

router.put("/pets/:id");

router.post("/pets/:id/adopt");

router.post("/pets/:id/return");

router.post("/pets/:id/save");

router.delete("/pets/:id/save");

router.get("/pet/user/:id");

module.exports = router;
