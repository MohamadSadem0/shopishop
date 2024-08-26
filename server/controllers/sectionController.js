const Section = require('../models/section');
const { cloudinaryConfig, upload } = require('../cluodinaryMulter');
const { io } = require('../io');




const cloudinary = cloudinaryConfig;

// Controller function to add an item
const addSection = async (req, res) => {
  try {
    const { file, body: { name } } = req;

    if (!file) {
      return res.status(400).json({ message: 'No image file provided!' });
    }

    // Check if a section with the same name already exists
    const existingSection = await Section.findOne({ name });
    if (existingSection) {
      return res.status(400).json({ message: 'Section with this name already exists!' });
    }

    const uploadResult = await cloudinary.uploader.upload(file.path, {
      public_id: 'your_desired_public_id', // Set your desired public ID
    });

    // Create a new instance of the Section model with data from the request body
    const newSection = new Section({
      imageUrl: uploadResult.secure_url, // Add image URL to the post
      imagePublicId: uploadResult.public_id, // Add image public ID to the post
      name: name, // Use the name from the request body
    });

    // Save the new section to the database
    const savedSection = await newSection.save();

    // Emit the 'newSection' event after saving the section
    // io.emit('newSection', savedSection);

    // Respond with the saved section
    res.status(201).json({ message: 'Section added successfully', section: savedSection });
  } catch (error) {
    console.error('Error adding section:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { file, body: { name } } = req;

    // Find the section by ID
    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found!' });
    }

    // Check if a new name is provided and if it's not taken by another section
    if (name && name !== section.name) {
      const existingSection = await Section.findOne({ name });
      if (existingSection) {
        return res.status(400).json({ message: 'Section with this name already exists!' });
      }
      section.name = name;
    }

    // Update the image if a new file is provided
    if (file) {
      // Delete the old image from Cloudinary
      await cloudinary.uploader.destroy(section.imagePublicId);

      // Upload the new image
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        public_id: 'your_updated_public_id', // Set your desired public ID
      });

      // Update the section with the new image URL and public ID
      section.imageUrl = uploadResult.secure_url;
      section.imagePublicId = uploadResult.public_id;
    }

    // Save the updated section
    const updatedSection = await section.save();

    // Emit the 'updateSection' event after updating the section
    // io.emit('updateSection', updatedSection);

    // Respond with the updated section
    res.status(200).json({ message: 'Section updated successfully', section: updatedSection });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addSection,getSections,updateSection
};
