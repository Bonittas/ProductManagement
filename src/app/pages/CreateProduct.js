import { useState } from 'react';
import { createProduct } from '../services/productService';

const CreateProduct = ({ onClose, onProductCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    if (!title || !description || !price || !rating || !tags) {
      setError('All fields are required');
      return false;
    }
    if (isNaN(price) || price <= 0) {
      setError('Price must be a positive number');
      return false;
    }
    if (isNaN(rating) || rating < 0 || rating > 5) {
      setError('Rating must be a number between 0 and 5');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const newProduct = await createProduct({ title, description, price, rating, tags });
        onProductCreated(newProduct);
        onClose();
        setSuccess('Product created successfully!');
      } catch (err) {
        setError('Error creating product: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setRating('');
    setTags('');
    setError(null);
  };

  return (
    <div className="max-w-lg text-black mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 px-4 py-2 text-white font-semibold bg-red-600 hover:bg-red-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-4 py-2 text-white font-semibold rounded-md shadow-sm ${loading ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
