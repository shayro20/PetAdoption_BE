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
    (type = "Dog"), "Cat", "Other";
  }
  console.log("other", type);
  let search = await dbConnection
    .from("pets")
    .whereBetween("weight", [weight.min, weight.max])
    .whereBetween("height", [height.min, height.max])
    .whereIn("adoptionStatus", adoptionStatus)
    .whereILike("name", `%${name}%`)
    .whereIn("type", [type]);

  console.log(type === "");
  return search;
}

async function addPet(req, res) {
  console.log("pet body", req.body);
  try {
    // req.body.forEach(async (element) => {
    //   console.log({element});
    const create = await dbConnection.from("pets").insert({
      ...req.body,
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

async function updatePet(req) {
  try {
    const {id} = req.params;
    const data = req.body;
    return await dbConnection.from("pets").where("petId", id).update(data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}
async function adoptMyPet(req) {
  try {
    const {id} = req.params;
    const data = req.body.adoptionStatus;
    return (
      await dbConnection
        .from("pets")
        .where("petId", id)
        .update({adoptionStatus: data}),
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
      return user
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {addPet, petsSearcher, petById, updatePet,checkMail, adoptMyPet};
