const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("config");
const {getConnectedUser} = require('../io');
const User = require("../models/user");
const { emitToSuperAdmins } = require("../io"); // Import the emit function
const { CLIENT_RENEG_LIMIT } = require("tls");
const Notification = require('../models/notifications');

const getNotifications = async (req,res) => {
    const response = await Notification.find().sort({ timestamp: -1 });
    res.status(200).json({response})
};
const signinController = async (req, res) => {
    if (req.body.googleAccessToken) {
        // Google-auth
        const { googleAccessToken } = req.body;

        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        }).then(async response => {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;
            const picture = response.data.picture;

            const existingUser = await User.findOne({ email });

            if (!existingUser)
                return res.status(404).json({ message: "User doesn't exist!" });

            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, config.get("JWT_SECRET"), { expiresIn: "1h" });

            res.status(200).json({ result: existingUser, token });
            
            // Emit event to super admin
            // emitToSuperAdmins("userSignedIn", { name: `${firstName} ${lastName}` });
            if (existingUser._id.toString() !== '66c2f4ef8b23868aa136b18e') {
                // const operation = `${existingUser.role} ${firstName} ${lastName} has logged in just now.`;
            
                // Emit event to super admin
                // console.log(operation);
                await getConnectedUser(existingUser._id.toString(),existingUser.role,firstName,lastName);
            
                // Fetch notifications for super admin (if needed)
            }


        }).catch(err => {
            res.status(400).json({ message: "Invalid access token!" });
        });
    } else {
        const { email, password } = req.body;
        if (email === "" || password === "") {
            return res.status(400).json({ message: "Invalid field!" });
        }
    
        try {
            const existingUser = await User.findOne({ email });
    
            if (!existingUser) {
                return res.status(404).json({ message: "User doesn't exist!" });
            }
    
            const isPasswordOk = await bcrypt.compare(password, existingUser.password);
    
            if (!isPasswordOk) {
                return res.status(400).json({ message: "Invalid credentials!" });
            }
    
            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, config.get("JWT_SECRET"), { expiresIn: "1h" });
    
            // Send response only once
            res.status(200).json({ result: existingUser, token });
    console.log(existingUser)
            // Emit event to super admin if the logged-in user is a super admin
            // existingUser._id.toString() === '66c2f4ef8b23868aa136b18e'
           
                // Call getConnectedUser to notify super admin
                getConnectedUser(existingUser._id.toString(),existingUser.firstName,existingUser.lastName,existingUser.role);
            
    
        } catch (error) {
            console.error(error);
            // Ensure that only one response is sent, even on error
            if (!res.headersSent) {
                res.status(500).json({ message: "Server error" });
            }
        }

        
    }
};

const signupController = async (req, res) => {
    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;

        axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        }).then(async response => {
            const firstName = response.data.given_name;
            const lastName = response.data.family_name;
            const email = response.data.email;
            const picture = response.data.picture;

            const existingUser = await User.findOne({ email });

            if (existingUser)
                return res.status(400).json({ message: "User already exists!" });

            const result = await User.create({ verified: "true", email, firstName, lastName, profilePicture: picture });

            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, config.get("JWT_SECRET"), { expiresIn: "1h" });

            res.status(200).json({ result, token });

            // Emit event to super admin
            emitToSuperAdmins("userSignedUp", { name: `${firstName} ${lastName}` });

        }).catch(err => {
            res.status(400).json({ message: "Invalid access token!" });
        });

    } else {
        // Normal form signup
        const { email, password, confirmPassword, firstName, lastName } = req.body;

        try {
            if (email === "" || password === "" || firstName === "" || lastName === "" || password !== confirmPassword || password.length < 4)
                return res.status(400).json({ message: "Invalid field!" });

            const existingUser = await User.findOne({ email });

            if (existingUser)
                return res.status(400).json({ message: "User already exists!" });

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({ email, password: hashedPassword, firstName, lastName });

            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, config.get("JWT_SECRET"), { expiresIn: "1h" });

            res.status(200).json({ result, token });

            // Emit event to super admin
            emitToSuperAdmins("userSignedUp", { name: `${firstName} ${lastName}` });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
};

const updateUserPhoneRole = async (req, res) => {
    const { userId, phoneNumber, role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { phoneNumber, role },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
        console.log(updatedUser);

        // Emit event to super admin
        emitToSuperAdmins("userUpdated", { name: `${updatedUser.firstName} ${updatedUser.lastName}`, role: updatedUser.role });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    signinController,
    signupController,
    updateUserPhoneRole,
    getNotifications
};
