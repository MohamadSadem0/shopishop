// src/styles/globalStyles.js

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .app-container {
    padding: 20px;
    text-align: center;
  }

  .merchant-list button, .category-filter button {
    margin: 5px;
    padding: 10px 15px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .merchant-list button:hover, .category-filter button:hover {
    background-color: #0056b3;
  }

  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .product-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
  }

  .product-card img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;
