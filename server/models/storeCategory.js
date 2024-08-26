const mongoose = require('mongoose');
const StoreCategorySchema = new mongoose.Schema({
    name: { type: String}
  });

  const StoreCategory=  mongoose.model('StoreCategorySchema', StoreCategorySchema);

  module.exports = StoreCategory;