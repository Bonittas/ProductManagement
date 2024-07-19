"use client";

import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/productService';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(searchTerm);
        console.log('Fetched products:', data); // Debugging
        setProducts(data);
      } catch (err) {
        setError('Error loading products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product.');
    }
  };

  const handleDropdownToggle = (productId = null) => {
    setEditingProductId(productId);
  };

  const handleProductCreated = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowCreateDropdown(false);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    setEditingProductId(null);
  };

  const filteredProducts = products.filter(product =>
    product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered products:', filteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <main className="relative bg-gray-200 text-black min-h-screen p-6">
      {/* Background content */}
      <div className={`container mx-auto max-w-5xl ${showCreateDropdown ? 'blur-sm' : ''}`}>
        <h1 className="text-4xl font-semibold mb-6 text-gray-800">Product Management</h1>
        
        <div className="flex text-black items-center mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-150"
          />
          <button
            onClick={() => setShowCreateDropdown(!showCreateDropdown)}
            className="ml-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-150"
          >
            Create Product
          </button>
        </div>
        
        {error && <p className="text-red-600 mb-4">{error}</p>}
        
        {loading ? (
          <p className="text-gray-800">Loading...</p>
        ) : (
          <>
            {filteredProducts.length === 0 && searchTerm && (
              <p className="text-gray-600">No results found for "{searchTerm}".</p>
            )}
            
            <ProductList
              products={currentProducts}
              onDelete={handleDelete}
              onEdit={handleDropdownToggle}
            />
            
            {editingProductId !== null && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-20">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <EditProduct
                    productId={editingProductId}
                    onClose={() => setEditingProductId(null)}
                    onProductUpdated={handleProductUpdated}
                  />
                </div>
              </div>
            )}
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </>
        )}
      </div>

      {/* Blurred Background */}
      {showCreateDropdown && (
        <>
          <div className="fixed inset-0 bg-gray-800 bg-opacity-30 z-10" />
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
            <CreateProduct
              onClose={() => setShowCreateDropdown(false)}
              onProductCreated={handleProductCreated}
            />
          </div>
        </>
      )}
    </main>
  );
}
