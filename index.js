const express = require("express");
const app = express();
const cors = require("cors");
require("colors");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middlewere
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dafmrk2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
async function run() {
  try {
  } catch (error) {
    console.log(error.name.bgRed, error.message.bold);
  }
}
run();

const Product = client.db("practiceRun").collection("products");

// End Points
app.post("/product", async (req, res) => {
  try {
    const result = await Product.insertOne(req.body);
    if (result.insertedId) {
      res.send({
        success: true,
        message: `successfully created ${req.body.name}`,
      });
    } else {
      res.send({
        success: false,
        error: "Couldn't add the product",
      });
    }
  } catch {}
});

app.delete("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: ObjectId(id) });
  const result = await Product.deleteOne({ _id: ObjectId(id) });
});

app.get("/product", async (req, res) => {
  try {
    const cursor = Product.find({});
    const products = await cursor.toArray();
    res.send({
      data: products,
    });
  } catch {}
});
app.listen(port, () => {
  console.log(`port is running on ${port}`);
});
