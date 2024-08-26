const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: { type: String, required: false,default:"category" },
    imageUrl: { type: String, required: false },
    imagePublicId: { type: String, required: false },
    approved:{
      type:Boolean,
      default:true
    },
    sectionId: {
    type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }


  });

  const Category =  mongoose.model('Category', categorySchema);

  module.exports = Category;