// src/data/mockData.js

export const merchants = [
    { id: 1, name: 'Restaurant', categories: ['Burgers', 'Pasta', 'Plates'] },
    { id: 2, name: 'Market', categories: ['Vegetables', 'Fruits', 'Drinks'] },
  ];
  
  export const products = [
    { id: 1, name: 'Cheeseburger', category: 'Burgers', merchant: 'Restaurant', price: 10, imageUrl: '/images/burger.jpg' },
    { id: 2, name: 'Pasta Alfredo', category: 'Pasta', merchant: 'Restaurant', price: 12, imageUrl: '/images/pasta.jpg' },
    { id: 3, name: 'Fresh Tomatoes', category: 'Vegetables', merchant: 'Market', price: 5, imageUrl: '/images/tomatoes.jpg' },
    // Add more products...
  ];
  