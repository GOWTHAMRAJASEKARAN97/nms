const express = require("express");
const router = express.Router();

const { getConnectedClient } = require("./datasbase");
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("nmsdb").collection("nms");
  return collection;
};

/* GET /datas */
router.get("/datas", async (req, res) => {
  const collection = getCollection();

  const datas = await collection.find({}).toArray();

  res.status(200).json(datas);
});

/* POST /datas */
router.post("/datas", async (req, res) => {
  const collection = getCollection();
  const { data } = req.body;
  const newData = await collection.insertOne({ data });
  if (!data) {
    return res.status(400).json({ msg: "error no data found" });
  }
  res.status(201).json({ data, _id: newData.insertedId });
});

/* DELETE /datas/:id */
router.delete("/datas/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const deletedData = await collection.deleteOne({ _id });
  res.status(200).json(deletedData);
});

/* PUT /datas/:id */
router.put("/datas/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { datas } = req.body;
  const updatedDatas = await collection.updateOne(
    { _id },
    { $set: { data: datas } }
  );
  res.status(200).json(updatedDatas);
});

module.exports = router;
