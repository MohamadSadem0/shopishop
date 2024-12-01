import React from 'react';
import ProductCard from '../../components/cards/ProductCard';

const ProductGrid = ({ products, addToCart, setQuickViewProduct }) => {
  return (
    <div className="pr-10 flex flex-wrap gap-8 py-6 bg-bg">
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
