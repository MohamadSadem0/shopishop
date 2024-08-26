const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Ideally, password should be hashed before saving
    profilePicture: { type: String, required: false },
    role: { 
        type: String, 
        required: false, 
        enum: ['magazineOwner', 'user', 'driver', 'biker','noRole'],
        default : 'noRole'
    },
    id: { type: String }
});

module.exports = mongoose.model("User", userSchema);
