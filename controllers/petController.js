const {
  addPet,
  petsSearcher,
  petById,
  updatePet,
  adoptMyPet,
} = require("../models/petModels");

async function searchPets(req, res) {
  try {
    const result = await petsSearcher(req, res, req.query);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function newPet(req, res) {
  try {
    const result = await addPet(req, res);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function idPet(req, res) {
  try {
    const result = await petById(req, res);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function editPet(req, res) {
  try {
    const result = await updatePet(req);
    res.send("done");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function adoptPet(req, res) {
  console.log(req.body.adoptionStatus)
  try {
    const result = await adoptMyPet(req);
    res.send(req.body.adoptionStatus)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {searchPets, newPet, idPet, editPet, adoptPet};
