const dbConnection = require("../knex/knex");

async function petsSearcher(req, res, searchParams) {
  const defaultSizeObj = {min: 0, max: 100};
  const defaultStatus = ["Adopted", "Available", "Fostered"];
  let {
    type = "",
    adoptionStatus = defaultStatus,
    name = "",
    height = defaultSizeObj,
    weight = defaultSizeObj,
  } = searchParams;
  if (type === "") {
    type = "Dog", "Cat", "Other";
  }
  let search = await dbConnection
    .from("pets")
    .whereBetween("weight", [weight.min, weight.max])
    .whereBetween("height", [height.min, height.max])
    .whereIn("adoptionStatus", adoptionStatus)
    .whereILike("name", `%${name}%`)
    .whereIn("type", [type]);

  return search;
}

// async function allSavedPets(req, res) {
//   const getPet = await dbConnection
//     .from("saved_pets")
//     .join("pets", "pets.petid", "=", "saved_pets.petId");
//   return getPet;
// }

async function addPet(req, res) {
  try {
    // req.body.forEach(async (element) => {
    const create = await dbConnection.from("pets").insert({
      ...req.body,
      // ...element
    });
    return create;
    // })
  } catch (error) {
    console.log(error);
  }
}

async function petById(req, res) {
  const {id} = req.params;
  return await dbConnection.from("pets").where("petId", id);
}

async function updatePet(req, res) {
  try {
    const {id} = req.params;
    const data = req.body;
    console.log(data);
    return await dbConnection.from("pets").where("petId", id).update(data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}
async function petStatus(req) {
  console.log(req.body);
  try {
    const {id} = req.params;
    const data = req.body.adoptionStatus;
    const userId = req.body.id;
    return (
      await dbConnection
        .from("pets")
        .where("petId", id)
        .update({adoptionStatus: data, ownerId: userId}),
      data
    );
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}

async function petReturn(req) {
  console.log(req.body);
  try {
    const {id} = req.params;
    const data = req.body.adoptionStatus;
    return (
      await dbConnection
        .from("pets")
        .where("petId", id)
        .update({adoptionStatus: data, ownerId: null}),
      data
    );
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}

async function checkMail(req) {
  try {
    const user = await dbConnection
      .from("users")
      .where("email", req.body.email)
      .first();
    return user;
  } catch (error) {
    res.status(500).send(error);
  }
}
async function savedPet(req, res) {
  const petId = req.params.id;
  const userId = req.body.id;
  try {
    const save = await dbConnection.from("saved_pets").insert({userId, petId});
    return save;
  } catch (e) {
    console.log(e);
    res.status(500).send("didnt saved to user");
  }
}
async function deletedPet(req, res) {
  const petId = req.params.id;
  const userId = req.body.id;
  try {
    const unsave = await dbConnection
      .from("saved_pets")
      .where({userId, petId})
      .del();
  } catch (e) {
    console.log(e);
    res.status(500).send("didnt saved to user");
  }
}
async function getSavedPetsByUser(req, res) {
  console.log("i got to model");
  const id = req.params.id;
  console.log("saved", id);
  try {
    const savedPets = await dbConnection
      .from("saved_pets")
      .join("pets", "pets.petid", "=", "saved_pets.petId")
      .where({userId: id});
    console.log(savedPets);
    return savedPets;
  } catch (e) {
    console.log(e);
    res.status(500).send("didnt saved to user");
  }
}
async function getOwnedPetsByUser(req, res) {
  console.log("i got to model");
  const id = req.params.id;
  console.log("owned", id);
  try {
    const ownedPets = await dbConnection.from("pets").where({ownerId: id});
    console.log(ownedPets);
    return ownedPets;
  } catch (e) {
    console.log(e);
    res.status(500).send("didnt saved to user");
  }
}

async function getSavedPetsByUserId(user) {
  console.log("i got to model ID", user);
  const id = user;
  console.log("saved", id);
  try {
    const savedPets = await dbConnection
      .from("saved_pets")
      .select("petId")
      .pluck("petId")
      .where({userId: id});
    console.log(savedPets);
    return savedPets;
  } catch (e) {
    console.log(e);
    return e;
  }
}
async function getOwnedPetsByUserId(user) {
  console.log("i got to model");
  const id = user;
  console.log("owned", id);
  try {
    const ownedPets = await dbConnection
      .from("pets")
      .select("petId")
      .pluck("petId")
      .where({ownerId: id});
    console.log(ownedPets);
    return ownedPets;
  } catch (e) {
    console.log(e);
    res.status(500).send("didnt saved to user");
  }
}

module.exports = {
  addPet,
  petsSearcher,
  petById,
  updatePet,
  checkMail,
  petStatus,
  petReturn,
  savedPet,
  deletedPet,
  getSavedPetsByUser,
  getOwnedPetsByUser,
  getSavedPetsByUserId,
  getOwnedPetsByUserId,
  // allSavedPets,
};
