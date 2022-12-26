// const {v4: uuid} = require("uuid");
// const {addPet, readAllPets, deletePet} = require("../models/petModels");
const {v4: uuid} = require("uuid");

const {readAllPets, addPet} = require("../models/petModels");

function searchPets(req, res) {
  try {
    const allPets = readAllPets(req.query);
    res.send(allPets);
  } catch (error) {
    console.log(error);
  }
}

// function petDelete(req, res) {
//   const {petId} = req.params;
//   const deleted = deletePet(petId);
//   if (deleted) {
//     res.send({ok: true, deleted: petId});
//   }
// }

function newPet(req, res) {
  try {
    const {name, type} = req.body;
    const newPet = {name, type, id: uuid(), date: new Date()};

    const petAdded = addPet(newPet);
    if (petAdded) res.send(newPet);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
module.exports = {searchPets, newPet};
