import React from 'react';

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 font-serif gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-yellow-50 p-4 rounded-lg shadow-md flex flex-col">
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => onEdit(product.id)}
              className="px-4 py-1 relative left-32 bg-yellow-700 text-white rounded-l-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-150"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="px-4 py-1 bg-red-500 text-white rounded-r-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;