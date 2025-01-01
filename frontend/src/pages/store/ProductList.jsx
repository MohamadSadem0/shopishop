import ProductCard from '../../components/cards/ProductCard';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products available for this store.</p>;
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
