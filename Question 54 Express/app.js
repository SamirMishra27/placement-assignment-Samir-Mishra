require("dotenv").config();

const express = require("express");
const connectDatabase = require("./config/database");
const blogRoutes = require("./controllers/blogControllers");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use("/", blogRoutes)

connectDatabase();
app.listen(process.env.PORT || 3000, () => {
    console.log("API is successfully running at Port " + process.env.PORT + "\nSolution to question 54 (Assignment/Express)");
});