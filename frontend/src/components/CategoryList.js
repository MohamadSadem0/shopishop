// src/components/CategoryList.js
import React from 'react';
import { useFetch } from '../hooks/useFetch';

const CategoryList = () => {
  const { data: categories, loading, error } = useFetch('/api/categories');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Category List</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
