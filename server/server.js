// server.js
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require("http");

const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require('./routes/notificationRoutes')
const sectionRoutes = require('./routes/sectionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const storeRoutes = require('./routes/storeRoutes');

const { initializeSocket } = require("./io");

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/notifications", notificationRoutes);
app.use("/sections",sectionRoutes)
app.use("/categories",categoryRoutes)
app.use("/stores",storeRoutes)

const PORT = process.env.PORT || 5000;
const MONGOOSE_URL = "mongodb+srv://adelftouni:GxVURilGvo47QzAG@cluster0.h4a0cqm.mongodb.net/login-system";

mongoose.connect(MONGOOSE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    
    // Initialize Socket.IO
    initializeSocket(httpServer);
    
    httpServer.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;
