const Store = require('../models/store');
const { cloudinaryConfig, upload } = require('../cluodinaryMulter');
const { io } = require('../io');
const Image = require('../models/image');
const cloudinary = cloudinaryConfig;
var mongoose = require('mongoose');
const User=require("../models/user.js");
const CategoryStoreJunction = require('../models/category-store-junction.js');
const StoreStoreCategoryjunction = require('../models/store-storeCategory-junction.js');

const {emitStoreRequest} = require('../io');

// const { emitToSuperAdmins } = require("../io"); // Import the emit function
// Controller function to add an item
const addStore = async (req, res) => {
  try {
    const { file, body } = req;
    const {
      name,
      currency,
      address,
      deliveryTime,
      whatTheySell,
      rating,
      reviews,
      openUntil,
      exchangeRate,
      userId,
      requestedCategories,
      categories // Array of category IDs
    } = body;

    if (!file) {
      return res.status(400).json({ message: 'No image file provided!' });
    }

    const existingStoreByName = await Store.findOne({ name });
    if (existingStoreByName) {
      return res.status(400).json({ message: 'Store with this name already exists!' });
    }

    const existingStoreByUser = await Store.findOne({ userId });
    if (existingStoreByUser) {
      return res.status(400).json({ message: 'User already has a store!' });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: 'your_desired_public_id',
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    const userName = user.firstName + " " + user.lastName;
// console.log(JSON.stringify(user));
    const isApproved = user._id === '66c2f4ef8b23868aa136b18e';

    // Create the new store
    const newStore = new Store({
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      name,
      currency,
      address,
      deliveryTime,
      whatTheySell,
      rating,
      reviews,
      openUntil,
      exchangeRate,
      approved: isApproved,
      userId: user._id,
      requestedCategories,
      categories // Array of category IDs
    });

    const savedStore = await newStore.save();

    // Handle the many-to-many relationship with junction tables
    const categoryStorePromises = categories.map(categoryId => {
      return CategoryStoreJunction.create({
        categoryId,
        storeId: savedStore._id,
      });
    });

    // const storeCategoryInStorePromises = categories.map(categoryId => {
    //   return StoreStoreCategoryjunction.create({
    //     storeId: savedStore._id,
    //     categoryId,
    //   });
    // });

    await Promise.all([...categoryStorePromises]);

    // emitToSuperAdmins('newStore', savedStore);
   
    res.status(201).json({ message: 'Store added successfully', store: savedStore });
    // if (existingUser._id.toString() !== '66c2f4ef8b23868aa136b18e') {
      if (user._id.toString() !== '66c2f4ef8b23868aa136b18e') {
        emitStoreRequest(userId,userName,name,address);
      }
   
    // }
  } catch (error) {
    console.error('Error adding store:', error);
    res.status(500).json({ error: error.message });
  }
};




const approveStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      return res.status(400).json({ message: 'Invalid store ID format!' });
    }

    const updatedStore = await Store.findByIdAndUpdate(
      storeId,
      { approved: true },
      { new: true }
    );

    if (!updatedStore) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.status(200).json({ message: 'Store approved successfully', store: updatedStore });
    io.emit('new Store',updatedStore)
  } catch (error) {
    console.error('Error approving store:', error.message);
    res.status(500).json({ error: 'An error occurred while approving the store' });
  }
};
//update Store
const updateStore = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format!' });
    }
    
    const { file, body: { name, currency, address, deliveryTime, rating, reviews, openUntil, exchangeRate, whatTheySell,sectionId,CategoryId,requestedCategories} } = req;

    const store = await Store.findOne({ userId }).populate('userId');
    if (!store) {
      return res.status(404).json({ message: 'Store not found!' });
    }

    if (name && name !== store.name) {
      const existingStore = await Store.findOne({ name });
      if (existingStore) {
        return res.status(400).json({ message: 'Store with this name already exists!' });
      }
      store.name = name;
    }

    if (currency) store.currency = currency;
    if (address) store.address = address;
    if (deliveryTime) store.deliveryTime = deliveryTime;
    if (rating) store.rating = rating;
    if (reviews) store.reviews = reviews;
    if (openUntil) store.openUntil = openUntil;
    if (exchangeRate) store.exchangeRate = exchangeRate;
    if (whatTheySell) store.whatTheySell = whatTheySell;
    if (sectionId) store.sectionId = sectionId;
    if (CategoryId) store.CategoryId = CategoryId;
  if(requestedCategories) store.requestedCategories=requestedCategories;
    if (file) {
      await cloudinary.uploader.destroy(store.imagePublicId);
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        public_id: 'your_updated_public_id',
      });

      store.imageUrl = uploadResult.secure_url;
      store.imagePublicId = uploadResult.public_id;
    }

    const updatedStore = await store.save();
    io.emit('updateStore', updatedStore);

    res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
  } catch (error) {
    console.error('Error updating store:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const approveWithImage = async (req, res) => {
  const id = req.body.id;
  const approved = req.body.approved;
  const imgUrl = req.body.imageUrl;
  // Update the store with the sent data
  Store.findByIdAndUpdate(id, { approved: approved ,imageUrl: imgUrl }, { new: true })
   .then(updatedStore => {
      res.status(200).json({ message: updatedStore });
    })
   .catch(error => {
      res.status(500).json({ message: 'Error updating store' });
    });
  };
const approve = async (req, res) => {
  const id = req.body.id;
  const approved = req.body.approved;

  // Update the store with the sent data
  Store.findByIdAndUpdate(id, { approved: approved }, { new: true })
   .then(updatedStore => {
      res.status(200).json({ message: updatedStore });
    })
   .catch(error => {
      res.status(500).json({ message: 'Error updating store' });
    });
};

const saveBeforeUpdate = async (req, res) => {
  try {
    const { file, body: { content } } = req;

    // Check if a file is provided
    if (!file) {
      return res.status(400).json({ message: 'No image file provided!' });
    }

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: 'your_desired_public_id', // Set your desired public ID
    });

    // Create a new Image document with the uploaded image URL and public ID
    const newImage = new Image({
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id
    });

    // Save the new Image document
    await newImage.save();

    // Emit an event with the new image details
    io.emit('newImageBeforeUpdate', newImage);

    // Respond with the newImage details
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const reject= async (req, res) => {
  const id = req.body.id;
  const approved = req.body.approved;

  // Update the store with the sent data
  Store.findByIdAndUpdate(id, { approved: approved }, { new: true })
   .then(updatedStore => {
      res.status(200).json({ message: updatedStore });
    })
   .catch(error => {
      res.status(500).json({ message: error });
      console.log(error)
    });
};
//get store by id
const getStoreByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const stores = await Store.find({ userId });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStoreByStoreId = async (req, res) => {
  try {
    const { storeId } = req.body; // Extract storeId from the request body

    if (!storeId) {
      return res.status(400).json({ message: 'Store ID is required' });
    }

    const store = await Store.findById(storeId); // Use findById for a single store

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getStoreBySectionId = async (req, res) => {
  try {
    const { sectionId } = req.body; // Extract sectionId from the request body

    if (!sectionId) {
      return res.status(400).json({ message: 'section ID is required' });
    }

    const store = await Store.findOne({ sectionId }); // Use findOne to find a store by sectionId

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const countStores = async (req, res) => {
  try {
    // Count approved stores
    const approvedCount = await Store.countDocuments({ approved: true });

    // Count unapproved stores
    const unapprovedCount = await Store.countDocuments({ approved: false });

    res.status(200).json({ approvedCount, unapprovedCount });
  } catch (error) {
    console.error('Error counting stores:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
module.exports = {
  addStore,
  getStores,
  approveStore,
  updateStore,
  reject,
  saveBeforeUpdate,
  approve,
  approveWithImage,
  getStoreByUserId,
  getStoreByStoreId,
  getStoreBySectionId,
  countStores


};
