const Roles = require("../Models/Roles");
const express = require("express");
const rolesRouter = express.Router();

//#######################################################

rolesRouter.get("/getAllRoles", async (req, res) => {
  const allRoles = await Roles.find({});
  res.status(200).json(allRoles);
});

//#######################################################

rolesRouter.get("/getRolesById/:id", async (req, res) => {
  //
  const roles = await Roles.findById(req.params.id);

  if (!roles) {
    res.status(404).send({ message: `No Role matching the following ID` });
  }
  res.status(200).send({
    id: roles._id,
    RoleName: roles.RoleName,
  });
});

//#######################################################

rolesRouter.post("/createRole", async (req, res) => {
  const newRole = new Roles({
    RoleName: req.body.RoleName,
  });

  try {
    const created = await newRole.save();

    res.status(201).json({
      id: created._id,
      RoleName: created.RoleName,
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

//#######################################################

rolesRouter.put("/updateRolesById/:id", async (req, res) => {
  let oldRoleDetails = {
    RoleName: req.body.RoleName,
  };
  //
  const updatedRole = await Roles.findByIdAndUpdate(req.params.id, {
    $set: oldRoleDetails,
  });

  if (!updatedRole) {
    res.status(404).send({ message: `No Role matching the following ID` });
  }
  res.status(200).send([
    { message: "Update Successful" },
    {
      RoleName: updatedRole.RoleName,
    },
  ]);
});

//#######################################################

rolesRouter.delete("/deleteRolesById/:id", async (req, res) => {
  //
  const roleById = await Roles.findByIdAndDelete(req.params.id);

  if (!roleById) {
    res.status(404).send({ message: `No role matching the following ID` });
  }
  res.status(200).send([{ message: `Delete Successfull` }, {}]);
});

//#######################################################

rolesRouter.get(`/search/:role`, async (req, res) => {
  //########
  const role = req.body.role;
  const getSearch = await Roles.findOne(role);
  //########
  if (!getSearch) {
    res.status(404).send({ message: `No Role Found` });
  }
  //########
  res.status(200).send(getSearch);
});



module.exports = rolesRouter;
