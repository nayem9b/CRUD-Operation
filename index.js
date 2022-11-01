const express = require("express");

const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://nayem:SqvH0NNaQWRXeEJl@cluster0.dafmrk2.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
