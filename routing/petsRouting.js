const express = require("express");
const {v4: uuid} = require("uuid");
const validateBody = require("../validate/validate");
const schema = require("../schema/petSchema");
const PetController = require("../controllers/petController");
const router = express.Router();

//Add validation middleware
// , upload.single("picture")
router.post("/", validateBody(schema), (req, res) =>
  PetController.newPet(req, res)
);
router.get("/", (req, res) => PetController.searchPets(req, res));

router.get("/:id", PetController.idPet);

router.put("/:id", PetController.editPet);

router.post("/:id/adopt", PetController.adoptPet);

router.post("/:id/return");

router.post("/:id/save");

router.delete("/:id/save");

router.get("/user/:id");

module.exports = router;
