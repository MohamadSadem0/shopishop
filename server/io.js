const { Server } = require("socket.io");
const Notification = require('./models/notifications');
let io;

const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust this according to your client origin
      methods: ["GET", "POST","PUT","DELETE"]
    }
  });

  io.on("connection", (socket) => {
    // console.log(`A user connected: ${socket.id}`);

    // Example event for a simple message
    socket.on("message", (msg) => {
      // console.log(`Message received: ${msg}`);
      io.emit("message", msg); // Broadcast the message to all connected clients
    });

    socket.on("disconnect", () => {
      // console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getConnectedUser = async (userId, role,firstName,lastName) => {
    // console.log(operation);

    // Replace '66c2f4ef8b23868aa136b18e' with the actual super admin ID
    const superAdminId = '66c2f4ef8b23868aa136b18e';
    
    if (userId !== superAdminId) {
        // Save the notification to the database
        const operation = `The ${role} ${firstName} ${lastName} just logged in`
        const newNotification = await Notification.create({
            superAdminId: superAdminId,
            userId : userId,
            operation  : operation// Save the operation string
        });

        // console.log('New notification:', newNotification);

        // Emit the notification to the super admin
        io.emit("userLoggedIn", {
           newNotification
        });
    }
};
const emitStoreRequest = async (userId,userName,storeName,detailedAddress) => {
  // console.log(operation);

  // Replace '66c2f4ef8b23868aa136b18e' with the actual super admin ID
  const superAdminId = '66c2f4ef8b23868aa136b18e';
  
  if (userId !== superAdminId) {
      // Save the notification to the database
      const operation = `The merchant ${userName} just requested for a store named ${storeName} in ${detailedAddress}`
      const newNotification = await Notification.create({
          superAdminId: superAdminId,
          userId : userId,
          operation  : operation// Save the operation string
      });

      // console.log('New store request:', newNotification);

      // Emit the notification to the super admin
      io.emit("newStoreRequest", {
         newNotification,
         superAdminId
      });
  }
};
const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIoInstance, getConnectedUser,emitStoreRequest };
