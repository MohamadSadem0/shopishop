const mongoose = require('mongoose');
const storeSchema = new mongoose.Schema({
  imageUrl: { type: String, required: false },
  imagePublicId: { type: String, required: false },
  name: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
default:'lbp'
  },
  address: {
    type: String,
   required: true,
  },
  deliveryTime: {
    type: String, // in minutes
   required: true,
  },
 
  
  rating: {
    type: Number,
    min: 1,
    max: 5,
   default:1
  },
  reviews: [
    {
      type: String,
      default:['']
    },
  ],
  openUntil: {
    type: String, // format: HH:MM
   required: true,
  },
  exchangeRate: {
    type: Number,
   required: true,
  },
  whatTheySell: {
    type: String,
   required: true,
  },

  approved:{
    type:Boolean,
    default:false
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
requestedCategories : {
type : [String],
required:true
},
},

{timeStamp:true}
);

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;