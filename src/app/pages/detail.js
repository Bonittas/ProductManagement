// pages/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/productService';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id)
        .then(setProduct)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="text-gray-800">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h1>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-gray-700">Price: ${product.price}</p>
        <p className="text-gray-700">Rating: {product.rating}</p>
        <p className="text-gray-700">Tags: {product.tags.join(', ')}</p>
      </div>
    </main>
  );
};

export default ProductDetail;
