const mongoose = require('mongoose')
const storeStoreCategoryJunctionSchema = new mongoose.Schema({
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    stroreCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'storeCategory' },
});
const StoreStoreCategoryJunction = mongoose.model('StoreStoreCategoryJunction', storeStoreCategoryJunctionSchema);
module.exports = StoreStoreCategoryJunction ; 