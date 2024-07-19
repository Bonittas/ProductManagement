"use client";

import { useState, useEffect } from 'react';
import { fetchProductById, updateProduct } from '../services/productService';

export default function EditProduct({ productId, onClose, onProductUpdated }) {
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(productId);
        setProduct(fetchedProduct);
        setTitle(fetchedProduct.title);
        setDescription(fetchedProduct.description);
        setPrice(fetchedProduct.price);
        setRating(fetchedProduct.rating);
        setTags(fetchedProduct.tags ? fetchedProduct.tags.join(', ') : '');
      } catch (error) {
        setError('Failed to load product details');
      }
    };
    loadProduct();
  }, [productId]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProduct = await updateProduct(productId, {
        title,
        description,
        price,
        rating,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : []
      });
      onProductUpdated(updatedProduct);
      onClose();
    } catch (error) {
      setError('Failed to update product');
    }
  };
  

  return (
    <div className="p-4 text-black ">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {product ? (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full mt-1 border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full mt-1 border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full mt-1 border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-2">
            Rating
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="block w-full mt-1 border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-2">
          Tags (comma separated)
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full mt-1 border border-gray-300 rounded p-2"
          />
        </label>
          <button type="submit" className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600">
            Update Product
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Close
      </button>
    </div>
  );
}
