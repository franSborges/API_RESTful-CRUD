const express = require("express");
const app = express();
const mongoose = require('mongoose');

require("dotenv").config();

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json());

const personRouter = require("./routers");
app.use("/person", personRouter);


const PASSWORD_DATABASE = encodeURIComponent(process.env.PASSWORD_DATABASE);

const USER_DATABASE = process.env.USER_DATABASE;


mongoose
  .connect(
    `mongodb+srv://${USER_DATABASE}:${PASSWORD_DATABASE}@apicluster.e6yus.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Conectamos com o Banco');
    app.listen(8000);
  })
  .catch(err => {
    console.error(err);
  })