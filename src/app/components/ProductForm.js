import { useState, useEffect } from 'react';

const ProductForm = ({ initialProduct = {}, onSave }) => {
  const [title, setTitle] = useState(initialProduct.title || '');
  const [description, setDescription] = useState(initialProduct.description || '');
  const [price, setPrice] = useState(initialProduct.price || '');
  const [rating, setRating] = useState(initialProduct.rating || '');
  const [tags, setTags] = useState(initialProduct.tags ? initialProduct.tags.join(', ') : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      price: parseFloat(price),
      rating: parseFloat(rating),
      tags: tags.split(',').map(tag => tag.trim()),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2 px-4 py-2 border border-gray-300 rounded w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-2 px-4 py-2 border border-gray-300 rounded w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-2 px-4 py-2 border border-gray-300 rounded w-full"
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="mb-2 px-4 py-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="mb-2 px-4 py-2 border border-gray-300 rounded w-full"
      />
      <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Save</button>
    </form>
  );
};

export default ProductForm;
