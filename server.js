const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
let app = express();
const dbConnect = require("./config/dbConnect");
let fs = require("fs");


//Connection to mongoDB database
dbConnect(); 

app.use(cors({
  origin: "*",
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//models
const TypeClientModel = require("./model/typeclientModels")
//import Data

let TypeClientData = JSON.parse(
  fs.readFileSync("./documentmongo/TypeClient.json", "utf-8")
);

let importData = async () => {
  try {
    let typeclient = await TypeClientModel.find();
    if (typeclient.length === 0) {
      await TypeClientModel.create(TypeClientData);
    }
  } catch (error) {
    console.log("error", error);
  }
}; 

//Routes
const ClientRoutes = require('./Routes/clientRoute')
const TypeProduitRoutes = require('./Routes/TypeProduitRoute')
const CementerieRoutes = require('./Routes/CementerieRoute')
const RoleRoutes = require('./Routes/RoleRoute')
const VisitRoutes = require('./Routes/VisitRoute')

app.use("/api", ClientRoutes);
app.use("/api", TypeProduitRoutes);
app.use("/api", CementerieRoutes);
app.use("/api", RoleRoutes);
app.use("/api", VisitRoutes);
    

app.listen(process.env.PORT, () => {
  importData()
    console.log(`Server running at PORT http://localhost:${process.env.PORT}`);
});
    