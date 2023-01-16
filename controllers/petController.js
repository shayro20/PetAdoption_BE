const {
  addPet,
  petsSearcher,
  petById,
  updatePet,
  petStatus,
  petReturn,
  deletedPet,
  savedPet,
  getSavedPetsByUser,
  getOwnedPetsByUser,
} = require("../models/petModels");

async function searchPets(req, res) {
  console.log(req.query);
  try {
    const result = await petsSearcher(req, res, req.query);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function newPet(req, res) {
  try {
    console.log("done");
    const result = await addPet(req, res);
    return res.send(result);
  } catch (error) {
    console.log(error);
    //  return res.status(500).send(error);
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
    const result = await updatePet(req, res);
    res.send("done");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function adoptPet(req, res) {
  console.log("is it", req.body);
  try {
    const result = await petStatus(req);
    res.send(req.body.adoptionStatus);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function returnPet(req, res) {
  console.log(req);
  req.body.adoptionStatus = "Available";
  try {
    const result = await petReturn(req);
    res.send(req.body.adoptionStatus);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function savePet(req, res) {
  try {
    const save = await savedPet(req);
    if (save) {
      res.status(200).send(save);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function deletePet(req, res) {
  try {
    const unSave = await deletedPet(req);
    if (unSave) {
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function getPetsById(req, res) {
  console.log("i got to controller");
  try {
    const getOwnedPets = await getOwnedPetsByUser(req, res);
    const getSavedPets = await getSavedPetsByUser(req, res);
    res.send({saved: getSavedPets, owned: getOwnedPets});
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
  searchPets,
  newPet,
  idPet,
  editPet,
  adoptPet,
  returnPet,
  savePet,
  deletePet,
  getPetsById,
};
