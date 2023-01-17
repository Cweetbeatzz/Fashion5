const express = require("express");
const GroupMessagesModel = require("../Models/GroupMessages");
const GroupMessageRouter = express.Router();

//new conv

GroupMessageRouter.post("/", async (req, res) => {
  const newConversation = new GroupMessagesModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

GroupMessageRouter.get("/:userId", async (req, res) => {
  try {
    const conversation = await GroupMessagesModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

GroupMessageRouter.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await GroupMessagesModel.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = GroupMessageRouter;
