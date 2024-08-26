const Category = require('../models/category');
const { cloudinaryConfig, upload } = require('../cluodinaryMulter');
const { io } = require('../io');
const User=require('../models/user')

const Section = require('../models/section');
const cloudinary = cloudinaryConfig;

// Controller function to add an item
const addCategory = async (req, res) => {
  try {
    const { file, body: { name, sectionId, userId } } = req;

    if (!file) {
      return res.status(400).json({ message: 'No image file provided!' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists!' });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: 'your_desired_public_id', // Set your desired public ID
    });

    // Fetch user details based on userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Determine approval status based on user role
    const isApproved = user.role !== 'magazineOwner';

    // Create a new instance of the Category model with data from the request body
    const newCategory = new Category({
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      name,
      sectionId,
      approved: isApproved,
      userId: user._id, // Store the user's ID
    });

    // Save the new category to the database
    const savedCategory = await newCategory.save();

    // Emit the 'newCategory' event after saving the category
    // io.emit('newCategory', savedCategory);

    // Respond with the saved category
    res.status(201).json({ message: 'Category added successfully', category: savedCategory });
  } catch (error) {
    console.error('Error adding category:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { file, body: { name } } = req;

    // Find the sectio by ID
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    // Check if a new name is provided and if it's not taken by another section
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with this name already exists!' });
      }
      category.name = name;
    }

    // Update the image if a new file is provided
    if (file) {
      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(category.imagePublicId);

      // Upload the new image
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        public_id: 'your_updated_public_id', // Set your desired public ID
      });

      // Update the section with the new image URL and public ID
      category.imageUrl = uploadResult.secure_url;
      category.imagePublicId = uploadResult.public_id;
    }

    // Save the updated section
    const updatedCategory = await category.save();

    // Emit the 'updateSection' event after updating the section
    // io.emit('updateCategory', updatedCategory);

    // Respond with the updated section
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory});
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
//approve coategory
const approveCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { approved: true },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category approved successfully', Category: updatedCategory });
  } catch (error) {
    console.error('Error approving category:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//get category by sectionId

// Get categories by sectionId
const getCategoryBySectionId = async (req, res) => {
  const { sectionId } = req.params;

  try {
    // Corrected the population field to match the model field name
    const categories = await Category.find({ sectionId })
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found for this section",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categories found",
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories by sectionId:', error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = {
  addCategory,getCategories,updateCategory,approveCategory,getCategoryBySectionId
};
