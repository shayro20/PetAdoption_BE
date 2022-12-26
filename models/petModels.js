const fs = require("fs");

const path = require("path");

const PetsDBLocation = path.resolve(__dirname, "../database/petsDB.json");

function readAllPets(searchParam) {
  console.log(searchParam)
  try {
    const petsList = fs.readFileSync(PetsDBLocation);
    
    return JSON.parse(petsList);
  } catch (error) {
    console.log(error);
  }
}

function addPet(newPet) {
  try {
    const allPets = readAllPets();
    allPets.push(newPet);
    fs.writeFileSync(PetsDBLocation, JSON.stringify(allPets));
    return true;
  } catch (error) {
    console.log(error);
  }
}


module.exports = {readAllPets, addPet};
