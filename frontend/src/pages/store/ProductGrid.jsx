import React from 'react';
import ProductCard from '../../components/cards/ProductCard'; // Importing the ProductCard component

const ProductGrid = ({ products, addToCart, setQuickViewProduct }) => {
  return (
    <div className="flex flex-wrap justify-between gap-1 px-4 py-6 bg-[#fff8c0]">
      {products.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No products available.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            setQuickViewProduct={setQuickViewProduct}
          />
        ))
      )}
    </div>
  );
};

export default ProductGrid;
