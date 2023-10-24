require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/dataRoutes");
const emoloyeeRoutes = require("./routes/employeeRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const zoneDetailsRoutes = require("./routes/zoneDetailsRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// express app
const app = express();

app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/employees", emoloyeeRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/zone-details", zoneDetailsRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/dashboard", dashboardRoutes);


// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
