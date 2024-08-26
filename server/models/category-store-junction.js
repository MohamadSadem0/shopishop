const mongoose = require('mongoose');
const CategoryStoreJunctionSchema = new mongoose.Schema({
    categoryId: {
    type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
  },
  storeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
  }


  });

  const CategoryStoreJunction =  mongoose.model('CategoryStoreJunction', CategoryStoreJunctionSchema);

  module.exports = CategoryStoreJunction;