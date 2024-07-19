import React from 'react';

const ProductList = ({ products, onDelete, onEdit }) => {
  console.log('Products:', products); // Log the products array

  return (
    <ul className="space-y-4">
      {products.map(product => {
        console.log('Product:', product); // Log each product
        const tags = Array.isArray(product.tags) ? product.tags : [];

        return (
          <li key={product.id} className="flex justify-between items-start p-4 bg-white border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <div className="flex-1 pr-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{product.title}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-800 font-medium">Price: <span className="text-green-600">${Number(product.price).toFixed(2)}</span></p>
              <p className="text-gray-800 font-medium">Rating: <span className="text-yellow-500">{Number(product.rating).toFixed(1)}</span></p>
              <p className="text-gray-800 font-medium">Tags: <span className="text-gray-600">
                {tags.length > 0 ? tags.join(', ') : 'No tags'}
              </span></p>
            </div>

            <div className="flex-shrink-0 flex gap-2">
              <button
                onClick={() => onEdit(product.id)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-150"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductList;
