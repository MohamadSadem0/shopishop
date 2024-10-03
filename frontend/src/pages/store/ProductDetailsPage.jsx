
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/fetchingService';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetchProductById(productId);
        setProduct(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-details-page">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-xl font-semibold">Price: {product.price}</p>
      <p className="text-lg">{product.description}</p>
    </div>
  );
};

export default ProductDetailsPage;
