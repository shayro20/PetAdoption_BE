const express = require("express");
const validateBody = require("../validate/validate");
const schema = require("../schema/petSchema");
const PetController = require("../controllers/petController");
const {upload, valueModifier, picModifier} = require("../middleware/petMid");
const {auth, authAdmin} = require("../tokenmiddelware/tokengen");
const router = express.Router();

router.post(
  "/",
  authAdmin,
  upload.single("picture"),
  picModifier,
  valueModifier,
  validateBody(schema),
  (req, res) => PetController.newPet(req, res)
);
router.get("/", (req, res) => PetController.searchPets(req, res));

router.get("/:id", PetController.idPet);

router.put(
  "/:id",
  authAdmin,
  upload.single("picture"),
  picModifier,
  valueModifier,
  validateBody(schema),
  PetController.editPet
);

router.post("/:id/adopt", auth, PetController.adoptPet);

router.post("/:id/return", auth, PetController.returnPet);

router.post("/:id/save", auth, PetController.savePet);

router.delete("/:id/save", auth, PetController.deletePet);

router.get("/user/:id", PetController.getPetsById);

module.exports = router;
