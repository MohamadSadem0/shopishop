const ProductList = ({ className, products, status }) => {
  if (status === 'loading') return <p>Loading products...</p>;
  if (status === 'failed') return <p>Failed to load products. Please try again later.</p>;

  return (
    <div className={`bg-opacity-50 backdrop-blur-md bg-white min-h-screen p-8 lg:p-6 ${className}`}>
      <h2 className="font-bold text-2xl lg:text-3xl mb-6 text-left">Products</h2>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <li key={product.id} className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md bg-white">
              <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/150?text=No+Image'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">
                {product.isAvailable ? 'Available' : 'Out of Stock'}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available for this store.</p>
      )}
    </div>
  );
};

export default ProductList;
